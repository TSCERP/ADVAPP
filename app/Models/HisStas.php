<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HisStas extends Model
{
    use HasFactory;
    protected $table = 'HisStastus';
    protected $fillable = ['Status', 'BaseID', 'BaseType', 'UserID'];
}
