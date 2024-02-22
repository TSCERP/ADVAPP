<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cost1 extends Model
{
    use HasFactory;
    protected $table = 'cost1';
    protected $fillable = [
        'RefID', 'LineNum', 'CardCode',
        'CardName', 'Site', 'SubItem',
        'Descrpt', 'Descrpt2', 'term',
        'Unit', 'Quantity', 'UnitPrice',
        'Lcurrency', 'currency', 'exchange',
        'FPrice', 'VATGroup', 'VATRate',
        'BeforeVAT', 'FBeforeVAT', 'VATAmt',
        'FVATAmt', 'AfterVAT', 'FAfterVAT',
        'BeforeVAT2', 'VATAmt2', 'AfterVAT2',
        'Allocation', 'LineStatus'];
}
