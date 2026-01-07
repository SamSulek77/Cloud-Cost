<?php

use Illuminate\Contracts\Console\Kernel;

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';

$app->make(Kernel::class)->bootstrap();

// Debug Logic
$latestUpload = \App\Models\CostUpload::latest()->first();

echo "\n--- LATEST UPLOAD ---\n";
if ($latestUpload) {
    dump($latestUpload->toArray());

    $recordsCount = \App\Models\CostRecord::where('upload_id', $latestUpload->id)->count();
    $uniqueMonths = \App\Models\CostRecord::where('upload_id', $latestUpload->id)
        ->distinct()
        ->pluck('month_year')
        ->toArray();

    echo "Records Count: $recordsCount\n";
    echo "Unique Months found in Records: " . implode(', ', $uniqueMonths) . "\n";
} else {
    echo "No uploads found.\n";
}

echo "\n--- S3 LOGS ---\n";
// Quick check of recent logs if possible, or just rely on DB for now
