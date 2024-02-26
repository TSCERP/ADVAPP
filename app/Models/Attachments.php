<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attachments extends Model
{
    use HasFactory;
    protected $table = 'Attachments';
    protected $fillable = ['BaseKey', 'ObjType', 'Filename', 'Path', 'Type'];
}
