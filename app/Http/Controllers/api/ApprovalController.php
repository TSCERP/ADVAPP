<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Approvals;

class ApprovalController extends Controller
{
    // định nghĩa ở đây

    // Danh sách tất cả các bản ghi approvals
    function list(Request $request)
    {
        $data = Approvals::all();
        return response()->json($data, 200);
    }
}
