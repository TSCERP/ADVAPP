<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\NS\MasterDataController;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/vendors', [MasterDataController::class, 'getVendor'])->name('vendors');
    Route::get('/customers', [MasterDataController::class, 'getCustomer'])->name('customer');
    Route::get('/Items', [MasterDataController::class, 'getListItems'])->name('Item-master-data');
});
