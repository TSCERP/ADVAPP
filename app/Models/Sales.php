<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SALES extends Model
{
    use HasFactory;
    protected $table = 'SALES';
    protected $fillable = [
        'ApprID', 'StartDate', 'EndDate', 'Summary', 'Note', 'VATAmt',
        'Total', 'GrandTotal', 'ObjType'
    ];
}
