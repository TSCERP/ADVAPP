<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;
    protected $table = 'Projects';
    protected $fillable = [
        'Code', 'Name', 'ObjType',
        'Active', 'IsDeleted', 'CreatedBy',
        'UpdatedBy', 'DeletedBy', 'DeletedAt'
    ];
}
