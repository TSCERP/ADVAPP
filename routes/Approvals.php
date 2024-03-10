<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\Approval\ApprovalController;

Route::middleware(['auth:sanctum'])->group(function () {
    //Route for Approvals
    Route::group(['prefix' => 'approvals'], function () {
        // Route::get('/', [ApprovalController::class, 'list'])->name('danh-sach-approvals');
        // Route::get('/{id}', [ApprovalController::class, 'show'])->name('chi-tiet-approvals');
        Route::post('/create', [ApprovalController::class, 'add'])->name('tao-approvals');
        // Route::patch('/update/{id}', [ApprovalController::class, 'update'])->name('cap-nhat-approvals');
        // Route::delete('/delete/{id}', [ApprovalController::class, 'delete'])->name('xoa-approvals');
    });
});
