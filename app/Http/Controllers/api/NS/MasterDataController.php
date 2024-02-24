<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MasterData\Permitter;
use App\Models\MasterData\NegoApproval;
use App\Models\MasterData\FinalApproval;
use Illuminate\Support\Facades\Auth;

class MasterDataController extends Controller
{
    function getListApprover(Request $request)
    {
        $EmployeeID = Auth::user()->EmployeeID;
        $permitter = Permitter::where('EmployeeID', $EmployeeID)->get();
        $approver = NegoApproval::where('EmployeeID', $EmployeeID)->get();
        $final = FinalApproval::where('EmployeeID', $EmployeeID)->get();
        return response()->json(
            [
                'permitter' => $permitter,
                'approver' => $approver,
                'final' => $final
            ],
            200
        );
    }
    function getAllEmployee()
    {
    }
    function getItemCode()
    {
    }
}
