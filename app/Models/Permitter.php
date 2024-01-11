<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Permitter extends Model
{
    use HasFactory;
    protected $table = 'Permitters';
    protected $fillable = ['ApprID', 'userID', 'Status', 'oldUserID', 'ObjType'];
    
}
