<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Por1 extends Model
{
    use HasFactory;
    protected $table = 'por1';
    protected $fillable = [
        'RefID','LineNum','CardCode',
        'CardName','Site','SubItem',
        'Descrpt','Descrpt2','Term',
        'Unit','Quantity','OpenQty',
        'UnitPrice','Lcurrency','currency',
        'exchange','FPrice','VATGroup',
        'VATRate','BeforeVAT','FBeforeVAT',
        'VATAmt','FVATAmt','AfterVAT',
        'FAfterVAT','BeforeVAT2','VATAmt2',
        'AfterVAT2','Allocation','LineStatus'
    ];
}
