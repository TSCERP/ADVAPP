<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    use HasFactory;
    protected $table = 'contracts';
    protected $fillable = [
        'posting_date','contract_no',
        'contract_date','pic_name',
        'pic_title','BPPIC_Name',
        'BPPIC_title','Period',
        'address_vn','address_en',
        'BP_address_vn','BP_address_en',
        'BP_phone','BP_fax',
        'BP_taxcode','amount',
        'payment_term','prepay',
        'CardName','contract_term',
        'fromdate','todate',
        'user_created'];
}
