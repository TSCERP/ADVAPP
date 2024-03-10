<?php

namespace App\Models\MasterData;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employees extends Model
{
    use HasFactory;
    protected $primaryKey = 'EmployeeID';
    protected $table = 'service_ns_employee';
}
