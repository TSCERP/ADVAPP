<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sales extends Model
{
    use HasFactory;
    protected $table = 'Sales';
    protected $fillable = [
        'ApprID','StartDate','EndDate','Summary','Note','VATAmt',
        'Total','GrandTotal','ObjType'
    ];
}
