<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Http\Controllers\CostReportController;
use App\Http\Controllers\CostBreakdown;
use App\Http\Controllers\CostByService;
use App\Http\Controllers\S3CostReportController;
use App\Http\Controllers\CostInvestigationController;


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
Route::middleware(['auth:sanctum', 'role:devops,super_admin,admin'])
    ->post('/aws/cost-report/upload', [CostReportController::class, 'uploadReport']);

// NEW: S3 Import Routes
Route::middleware(['auth:sanctum', 'role:devops,super_admin,admin'])->group(function () {
    // S3 Manual Sync Trigger
    Route::post('/aws/s3/sync', [App\Http\Controllers\S3SyncController::class, 'sync']);
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
    Route::get('/cost/services/by-month', [CostByService::class, 'serviceByMonth']);
    
    // Cost Investigation
    Route::get('/cost/investigation/compare', [CostInvestigationController::class, 'compare']);


});

// S3 Webhook (no auth required - AWS will call this)
Route::post('/aws/s3/webhook', [App\Http\Controllers\S3WebhookController::class, 'handleS3Event'])
    ->withoutMiddleware([\App\Http\Middleware\VerifyCsrfToken::class]);

//my prsctice here
Route::get('/quote', function () {
    return response()->json([
        "quote" => "stop saying 67 in this big 2026!!!",
        "author" => "Nor Kirk"
    ]);
});

//my second practice here
Route::get('/quote2', function () {
    return response()->json ([
        "quote"=>"in my mind,i am the best",
        "author"=>"kirkiy"
    ]);
});

Route::get('/quote3', function () {
    return response()->json([
        "quote"=>"bismillah fyp, dont kirkify yourself",
        "author"=>"nortzy"
    ]);
});