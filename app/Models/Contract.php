<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    use HasFactory;
    protected $table = 'Contracts';
    protected $fillable = [
        'PostingDate', 'ContractNo',
        'ContractDate', 'PicName',
        'picTitle', 'BPPICName',
        'BPPICTitle', 'Period',
        'AddressVn', 'AddressEn',
        'BPAddressVn', 'BPAddressEn',
        'BPPhone', 'BPFax',
        'BPTaxcode', 'Amount',
        'paymentTerm', 'PrePay',
        'CardName', 'ContractTerm',
        'FromDate', 'ToDate',
        'UserCreated'
    ];
}
