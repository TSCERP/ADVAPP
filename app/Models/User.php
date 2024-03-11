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
        'FullName',
        'Title',
        'Avatar',
        'Email',
        'Phone',
        'EmailVerifiedAt',
        'Password',
        'IsSupperadm',
        'IsPermitter',
        'IsNego',
        'IsFinal',
        'IsActive',
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
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'EmailVerifiedAt' => 'datetime',
        'Password' => 'hashed',
        'IsSupperadm' => 'boolean',
        'IsPermitter' => 'boolean',
        'IsNego' => 'boolean',
        'IsFinal' => 'boolean',
        'IsActive' => 'boolean',
    ];
}
