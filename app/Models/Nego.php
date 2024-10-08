<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nego extends Model
{
    use HasFactory;
    protected $table = 'Negos';
    protected $fillable = [
        'ApprID', 'UserID', 'Status', 'OldUserID', 'ObjType'
    ];
}
