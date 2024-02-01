<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Permmiter;
use App\Models\Nego;
use App\Models\Finals;

class MasterDataController extends Controller
{
    function getListApprover(Request $request)
    {
        $permitter =Permmiter::get();
        $approver = Nego::get();
        $final = Finals::get();
        return response()->json(
            [
            'permitter' => $permitter, 
            'approver' => $approver, 
            'final' => $final
        ], 200);
    }
}
