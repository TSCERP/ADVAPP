<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class OCHO extends Model
{
    use HasFactory;
    protected $table = 'OCHO';
    protected $fillable = [
        'RefID', 'BaseID', 'BaseType',
        'CardCode', 'CardName', 'StartDate',
        'EndDate', 'Summary', 'Note', 'VATAmt',
        'Total', 'GrandTotal', 'ObjType'
    ];
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            DB::transaction(function () use ($model) {
                $current_year = now()->year;
                $current_month = now()->month;
                // Count the number of records for the current year and week
                $recordCount = static::whereYear('created_at', $current_year)
                    ->whereMonth('created_at', [$current_month])
                    ->count() + 1;
                if ($model->BaseRef) {
                    $count = static::where('BaseRef', $model->BaseRef)->count() + 1;
                } else {
                    $count = 0;
                }
                // Set the Code field
                $model->DocNum = substr($current_year, -2) . str_pad($current_month, 2, '0', STR_PAD_LEFT)
                    . '-' . str_pad($recordCount, 4, '0', STR_PAD_LEFT)
                    . '-' . str_pad($count, 2, '0', STR_PAD_LEFT);
            });
        });
    }
}
