<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class VHOController extends Controller
{
    function index()
    {
        return response()->json([
            'status_code' => 200,
            'message' => 'Welcome to VHO API',
        ], 200);
    }
}
