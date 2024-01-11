<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'FirstName',
        'LastName',
        'Title',
        'Avatar',
        'Email',
        'Phone',
        'Email_verified_at',
        'Password',
        'is_supperadm',
        'is_permitter',
        'is_nego',
        'is_final',
        'is_active',
        'IntegrationKey',
        'Division',
        'Department',
        'Section',
        'Team',
        'Branch',
        'Location',
        'EmployeeCode'
    ];
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'Password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'Email_verified_at' => 'datetime',
        'Password' => 'hashed',
        'is_supperadm'=>'boolean',
        'is_permitter'=>'boolean',
        'is_nego'=>'boolean',
        'is_final'=>'boolean',
        'is_active'=>'boolean',
    ];

}
