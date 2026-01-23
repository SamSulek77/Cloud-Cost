<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;

class S3SyncController extends Controller
{
    public function sync()
    {
        try {
            // Run the artisan command
            $exitCode = Artisan::call('app:import-s3-reports');
            $output = Artisan::output();

            Log::info("Manual S3 Sync triggered by user.", ['output' => $output]);

            if ($exitCode === 0) {
                // Parse output to find how many files were imported if possible, or just return success
                // The command outputs "Import process completed. Imported X new files." or "No new files to import."
                
                return response()->json([
                    'message' => 'Sync process completed successfully.',
                    'details' => trim($output)
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Sync process failed.',
                    'details' => trim($output)
                ], 500);
            }

        } catch (\Exception $e) {
            Log::error('Manual S3 Sync failed', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'An error occurred during synchronization.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
