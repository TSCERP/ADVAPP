<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Nego extends Model
{
    use HasFactory;
    protected $table = 'negos';
    protected $fillable = [
        'ApprID','userID','Status','oldUserID','ObjType'
    ];
}
