<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class POR1 extends Model
{
    use HasFactory;
    protected $table = 'POR1';
    protected $fillable = [
        'RefID', 'LineNum', 'CardCode',
        'CardName', 'Site', 'SubItem',
        'Descrpt', 'Descrpt2', 'Term',
        'Unit', 'Quantity', 'OpenQty',
        'UnitPrice', 'LCurrency', 'Currency',
        'Exchange', 'FPrice', 'VATGroup',
        'VATRate', 'BeforeVAT', 'FBeforeVAT',
        'VATAmt', 'FVATAmt', 'AfterVAT',
        'FAfterVAT', 'BeforeVAT2', 'VATAmt2',
        'AfterVAT2', 'Allocation', 'LineStatus'
    ];
}
