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
        'firstName',
        'LastName',
        'title',
        'avatar',
        'email',
        'phone',
        'email_verified_at',
        'password',
        'is_supperadm',
        'is_permitter',
        'is_nego',
        'is_final',
        'is_active',
        'integrationKey',
        'branch',
        'location',
        'employeeCode'
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
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'is_supperadm'=>'boolean',
        'is_permitter'=>'boolean',
        'is_nego'=>'boolean',
        'is_final'=>'boolean',
        'is_active'=>'boolean',
    ];

}
