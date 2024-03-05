<?php

namespace App\Http\Controllers\api\NS;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MasterData\Permitter;
use App\Models\MasterData\NegoApproval;
use App\Models\MasterData\Customer;
use App\Models\MasterData\Vendors;
use App\Models\MasterData\Items;
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
    function getCustomer()
    {
        try {
            $data = Customer::all();
            return response()->json($data, 200);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }
    function getVendor()
    {
        try {
            $data = Vendors::all();
            return response()->json($data, 200);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }
    function getListItems()
    {
        try {
            $data = Items::all();
            return response()->json($data, 200);
        } catch (\Exception $e) {
            return response()->json($e->getMessage(), 500);
        }
    }
}
