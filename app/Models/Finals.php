<?php

namespace App\Models;

use FFI;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Finals extends Model
{
    use HasFactory;
    protected $table = 'Finals';
    protected $fillable = ['ApprID', 'userID', 'Status', 'oldUserID', 'ObjType'];
}
