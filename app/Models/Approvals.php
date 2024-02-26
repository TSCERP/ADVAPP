<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class Approvals extends Model
{
    use HasFactory;
    protected $table = 'Approvals';
    protected $fillable = [
        'DocNum',
        'DocType',
        'NewTrading',
        'CategoryCode',
        'CategoryName',
        'CategoryVI',
        'DocDate',
        'Subject',
        'WinRate',
        'PIC',
        'Division',
        'Department',
        'Section',
        'DocStatus',
        'Revised',
        'RevisedBy',
        'RevisedDate',
        'Cancelled',
        'CancelledBy',
        'CancelledDate',
        'Deleted',
        'DeletedBy',
        'DeletedDate',
        'CreateBy',
        'UpdateBy',
        'UpdateDate',
        'IsClose',
        'BaseRef',
    ];
    protected $casts = [
        'DocNum' => 'string',
        'DocType' => 'string',
        'NewTrading' => 'boolean',
        'CategoryCode' => 'string',
        'CategoryName' => 'string',
        'CategoryVI' => 'string',
        'DocDate' => 'datetime:Y-m-d H:i:s',
        'Subject' => 'string',
        'WinRate' => 'float',
        'PIC' => 'string',
        'Division' => 'string',
        'Department' => 'string',
        'Section' => 'string',
        'DocStatus' => 'string',
        'Revised' => 'boolean',
        'RevisedBy' => 'string',
        'RevisedDate' => 'datetime:Y-m-d H:i:s',
        'Cancelled' => 'boolean',
        'CancelledBy' => 'string',
        'CancelledDate' => 'datetime:Y-m-d H:i:s',
        'Deleted' => 'boolean',
        'DeletedBy' => 'string',
        'DeletedDate' => 'datetime:Y-m-d H:i:s',
        'UpdateBy' => 'string',
        'UpdateDate' => 'datetime:Y-m-d H:i:s',
        'IsClose' => 'boolean',
        'BaseRef' => 'string',
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];
    // Sự kiện trước khi tạo mới record
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
