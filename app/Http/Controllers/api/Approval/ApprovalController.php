<?php

namespace App\Http\Controllers\api\Approval;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Approvals;
use Illuminate\Support\Facades\Auth;

class ApprovalController extends Controller
{
    // định nghĩa ở đây

    // Danh sách tất cả các bản ghi approvals
    function index(Request $request)
    {
        $fromDate = $request->fromDate;
        $toDate = $request->toDate;
        $Division = $request->Division;
        $newTranding = $request->newTrading;
        $Department = $request->Department;
        $Selection = $request->Selection;
        $Status = $request->Status;

        $query = Approvals::query();

        $query->when($fromDate, function ($q) use ($fromDate) {
            return $q->where('createDate', $fromDate);
        });

        $query->when($toDate, function ($q) use ($toDate) {
            return $q->where('createDate', $toDate);
        });

        $query->when($Division, function ($q) use ($Division) {
            return $q->where('division', $Division);
        });

        $query->when($newTranding, function ($q) use ($newTranding) {
            return $q->where('new_trading', $newTranding);
        });

        $query->when($Department, function ($q) use ($Department) {
            return $q->where('department', $Department);
        });

        $query->when($Selection, function ($q) use ($Selection) {
            return $q->where('selection', $Selection);
        });

        $query->when($Status, function ($q) use ($Status) {
            return $q->where('status', $Status);
        });

        $data = $query->get();

        return response()->json($data, 200);
        $data = Approvals::all();
        return response()->json($data, 200);
    }
    function add(Request $request)
    {
        $data = null;
        switch ($request->DocType) {
            case ('SPOT'):
                $data = $this->storeSpot($request);
                break;
            case ('FMS'):
                $data = $this->storeFMS($request);
                break;
            case ('YEARLY'):
                $data = $this->storeYearly($request);
                break;
            case ('SG&A'):
                $data = $this->storeOther($request);
                break;
            case ('OTHER'):
                $data = $this->storeOther($request);
                break;
            default:
                break;
        }
        return response()->json(
            [
                'message' => 'add success',
                'data' => $data
            ],
            200
        );
    }
    function storeSpot($data)
    {
        try {
            $header = $data->only(
                "DocType",
                "StartDate",
                "EndDate",
                "NewTrading",
                "CategoryCode",
                "CategoryName",
                "CategoryVI",
                "DocDate",
                "Subject",
                "WinRate",
                "Revised",
                "Related"
            );
            $header['PIC'] = Auth::user()->id;
            $header['Department'] = Auth::user()->id;
            $header['Section'] = date('Y-m-d H:i:s');
            if ($data->Revised == true) {
                $header['RevisedBy'] = Auth::user()->id;
                $header['RevisedDate'] = now();
            }
            $header['PIC'] = Auth::user()->id;

            dd($header);
            //todo something
            //header
            // detail
            //summary data 
            // save to db
        } catch (\Exception $e) {
            return $e;
        }
    }
    function storeFMS($data)
    {
        try {
            //todo something
            // check data
            // check budget
            //header
            // detail
            //summary data 
            //buget
            // save to db


        } catch (\Exception $e) {
            return $e;
        }
    }
    function storeYearly($data)
    {
        try {

            //todo something
            //header
            // detail
            //summary data 
            // save to db
        } catch (\Exception $e) {
            return $e;
        }
    }
    function storeOther($data)
    {
        try {

            //todo something
            //header
            // detail
            //summary data 
            // save to db
        } catch (\Exception $e) {
            return $e;
        }
    }
}
