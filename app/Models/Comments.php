<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    use HasFactory;
    protected $table = 'Comments';
    protected $fillable = [
        'ApprID', 'Context', 'File',
        'Parent_id', 'BaseID', 'BaseType',
        'IsDelete', 'UserID'
    ];
}
