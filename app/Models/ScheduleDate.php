<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScheduleDate extends Model
{
    use HasFactory;
    protected $table = 'schedule_dates';
    protected $fillable = [
       'Type','Timmer'
    ];

}
