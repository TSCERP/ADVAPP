<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Appr1 extends Model
{
    use HasFactory;
    protected $table = 'Appr1';
    protected $fillable = ['ApprID', 'StartDate', 'EndDate', 'Location', 'Content'];
    protected $casts = [
        'StartDate' => 'datetime',
        'EndDate' => 'datetime',
    ];
}
