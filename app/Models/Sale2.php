<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale2 extends Model
{
    use HasFactory;
    protected $table = 'sale2';
    protected $fillable = [
            'RefID', 'CardCode', 'CardName',
            'Site', 'SubItem', 'Descrpt',
            'Descrpt2', 'Unit', 'UnitPrice',
            'Lcurrency', 'Currency', 'Exchange',
            'FPrice', 'LineNum', 'LineStatus'
    ];
}
