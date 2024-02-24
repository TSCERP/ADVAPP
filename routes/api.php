<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\UserController;
use App\Http\Controllers\api\RolesController;
use App\Http\Controllers\api\PermissionsController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/handle-auth', function (Request $request) {
    return response()->json([
        'status_code' => 500,
        'message' => 'invalid session',
    ], 405);
})->name('handleAuth');


Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::middleware(['auth:sanctum',])->group(function () {
    Route::get('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::group(['prefix' => 'permissions'], function () {
        Route::get('/', [PermissionsController::class, 'index'])->name('danh-sach-quyen');
        // Route::post('/create', [RolesController::class, 'create'])->name('roles.create');
        // Route::patch('/update/{roleId}', [RolesController::class, 'update'])->name('roles.update');
    });
    /**
     * Role Routes
     */
    Route::group(['prefix' => 'roles'], function () {
        Route::get('/', [RolesController::class, 'index'])->name('danh-sach-role');
        Route::post('/create', [RolesController::class, 'create'])->name('tao-role');
        Route::patch('/update/{roleId}', [RolesController::class, 'update'])->name('cap-nhat-roles');
    });
    Route::group(['prefix' => 'users'], function () {
        Route::get('/', [UserController::class, 'index']);
        Route::post('/create', [UserController::class, 'create']);
        Route::get('/find/{UserId}', [UserController::class, 'UserById']);
        Route::patch('/update/{UserId}', [UserController::class, 'update']);
        Route::patch('/update-profile/{UserId}', [UserController::class, 'updateProfile']);
        Route::patch('/change-password/{UserId}', [UserController::class, 'changePassword']);
        Route::patch('/disable/{UserId}', [UserController::class, 'blockUser']);
        Route::delete('/delete/{UserId}', [UserController::class, 'delete']);
    });
    //Route for Approvals
    Route::group(['prefix' => 'approvals'], function () {
        Route::get('/', [App\Http\Controllers\api\ApprovalController::class, 'list'])->name('danh-sach-approvals');
        Route::get('/{id}', [App\Http\Controllers\api\ApprovalController::class, 'show'])->name('chi-tiet-approvals');
        Route::post('/create', [App\Http\Controllers\api\ApprovalController::class, 'create'])->name('tao-approvals');
        Route::patch('/update/{id}', [App\Http\Controllers\api\ApprovalController::class, 'update'])->name('cap-nhat-approvals');
        Route::delete('/delete/{id}', [App\Http\Controllers\api\ApprovalController::class, 'delete'])->name('xoa-approvals');
    });
});
