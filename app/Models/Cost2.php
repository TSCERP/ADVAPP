<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cost2 extends Model
{
    use HasFactory;
    protected $table = 'COST2';
    protected $fillable = [
        'RefID', 'CardCode', 'CardName',
        'Site', 'SubItem', 'Descrpt',
        'Descrpt2', 'Unit', 'UnitPrice',
        'LCurrency', 'Currency', 'Exchange',
        'FPrice', 'LineNum', 'LineStatus'
    ];
}
