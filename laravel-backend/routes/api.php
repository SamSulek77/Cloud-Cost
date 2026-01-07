<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Http\Controllers\CostReportController;
use App\Http\Controllers\CostBreakdown;
use App\Http\Controllers\CostByService;
use App\Http\Controllers\S3CostReportController;

Route::post('/register', function (Request $request) {
    $request->validate([
        'name' => 'required',
        'email' => 'required|email|unique:users',
        'password' => 'required|min:6',
    ]);

    User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    return response()->json(['message' => 'Registered successfully']);
});

Route::post('/login', function (Request $request) {
    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    $user = Auth::user();
    $token = $user->createToken('auth_token')->plainTextToken;

    return response()->json([
        'message' => 'Login successful',
        'access_token' => $token,
        'token_type' => 'Bearer',
    ]);
});

Route::middleware('auth:sanctum')->get('/user', fn(Request $request) => $request->user());

Route::get('/costs', [CostReportController::class, 'index']);

// Original Manual Upload (keep this for backwards compatibility)
Route::middleware(['auth:sanctum', 'role:admin'])
    ->post('/aws/cost-report/upload', [CostReportController::class, 'uploadReport']);

// NEW: S3 Import Routes
Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    // List files in S3
    Route::get('/aws/s3/cost-reports/list', [S3CostReportController::class, 'listS3Files']);
    
    // Import specific file from S3
    Route::post('/aws/s3/cost-reports/import', [S3CostReportController::class, 'importFromS3']);
    
    // Import latest file from S3
    Route::post('/aws/s3/cost-reports/import-latest', [S3CostReportController::class, 'importLatest']);
    
    // Import all files from a specific month
    Route::post('/aws/s3/cost-reports/import-month', [S3CostReportController::class, 'importMonth']);
});

Route::middleware('auth:sanctum')
    ->get('/aws/cost-report/all', [CostReportController::class, 'getAllReports']);

Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();
    return response()->json(['message' => 'Logged out successfully']);
});

Route::middleware('auth:sanctum')
    ->get('/aws/cost-report/monthly-trend', [CostReportController::class, 'monthlyTrend']);

Route::middleware('auth:sanctum')
    ->get('/aws/cost-report/account-breakdown', [CostBreakdown::class, 'accountBreakdown']); 

Route::middleware('auth:sanctum')->group(function () {
    // Service cost endpoints
    Route::get('/cost/services/by-account', [CostByService::class, 'serviceByAccount']);
    Route::get('/cost/services/top', [CostByService::class, 'topServices']);
    Route::get('/cost/services/account/{accountName}', [CostByService::class, 'servicesByAccount']);
    Route::get('/cost/services/trends', [CostByService::class, 'serviceTrends']);
    Route::get('/cost/services/months', [CostByService::class, 'availableMonths']);
});

// S3 Webhook (no auth required - AWS will call this)
Route::post('/aws/s3/webhook', [App\Http\Controllers\S3WebhookController::class, 'handleS3Event']);