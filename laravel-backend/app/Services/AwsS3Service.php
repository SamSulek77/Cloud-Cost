<?php

namespace App\Services;

use Aws\S3\S3Client;
use Aws\Exception\AwsException;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class AwsS3Service
{
    private S3Client $s3Client;
    private string $bucket;

    public function __construct()
    {
        $this->bucket = config('filesystems.disks.s3.bucket');
        
        $this->s3Client = new S3Client([
            'version' => 'latest',
            'region' => config('filesystems.disks.s3.region'),
            'credentials' => [
                'key' => config('filesystems.disks.s3.key'),
                'secret' => config('filesystems.disks.s3.secret'),
            ],
        ]);
    }

    /**
     * List all CSV files in a specific S3 path
     */
    public function listCsvFiles(string $prefix = 'cost-reports/'): array
    {
        try {
            $results = $this->s3Client->getPaginator('ListObjectsV2', [
                'Bucket' => $this->bucket,
                'Prefix' => $prefix,
            ]);

            $files = [];

            foreach ($results as $result) {
                if (isset($result['Contents'])) {
                    foreach ($result['Contents'] as $object) {
                        $key = $object['Key'];
                        
                        // Only include CSV files (case-insensitive)
                        if (strtolower(pathinfo($key, PATHINFO_EXTENSION)) === 'csv') {
                            $files[] = [
                                'key' => $key,
                                'size' => $object['Size'],
                                'last_modified' => $object['LastModified'],
                                'filename' => basename($key),
                            ];
                        }
                    }
                }
            }

            return $files;

        } catch (AwsException $e) {
            Log::error('S3 list files error: ' . $e->getMessage());
            throw new \Exception('Failed to list S3 files: ' . $e->getMessage());
        }
    }

    /**
     * Download a file from S3 and return its content
     */
    public function downloadFile(string $key): string
    {
        try {
            $result = $this->s3Client->getObject([
                'Bucket' => $this->bucket,
                'Key' => $key,
            ]);

            return $result['Body']->getContents();

        } catch (AwsException $e) {
            Log::error('S3 download error: ' . $e->getMessage());
            throw new \Exception('Failed to download file from S3: ' . $e->getMessage());
        }
    }

    /**
     * Check if a file exists in S3
     */
    public function fileExists(string $key): bool
    {
        try {
            $this->s3Client->headObject([
                'Bucket' => $this->bucket,
                'Key' => $key,
            ]);
            return true;
        } catch (AwsException $e) {
            return false;
        }
    }

    /**
     * Get file metadata
     */
    public function getFileMetadata(string $key): ?array
    {
        try {
            $result = $this->s3Client->headObject([
                'Bucket' => $this->bucket,
                'Key' => $key,
            ]);

            return [
                'content_length' => $result['ContentLength'],
                'content_type' => $result['ContentType'],
                'last_modified' => $result['LastModified'],
                'etag' => $result['ETag'],
            ];

        } catch (AwsException $e) {
            Log::error('S3 metadata error: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * List files in a specific month folder
     * Example: cost-reports/2025/2/
     */
    public function listFilesByMonth(int $year, int $month): array
    {
        $prefix = sprintf('cost-reports/%d/%d/', $year, $month);
        return $this->listCsvFiles($prefix);
    }

    /**
     * Get the latest file from S3
     */
    public function getLatestFile(string $prefix = 'cost-reports/'): ?array
    {
        $files = $this->listCsvFiles($prefix);
        
        if (empty($files)) {
            return null;
        }

        // Sort by last modified date (descending)
        usort($files, function($a, $b) {
            return $b['last_modified'] <=> $a['last_modified'];
        });

        return $files[0];
    }
}