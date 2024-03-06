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
    protected $casts
    = [
        'Active' => 'boolean',
        'IsDeleted' => 'boolean',
        'created_at' => 'datetime:Y-m-d',
        'updated_at' => 'datetime:Y-m-d',
    ];
    public function scopeActive($query)
    {
        return $query->where('IsDeleted', 0);
    }
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'CreatedBy', 'id');
    }

    /**
     * Get the user who updated the project.
     */
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'UpdatedBy', 'id');
    }
}
