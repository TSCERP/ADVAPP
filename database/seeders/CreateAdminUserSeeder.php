<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;

class CreateAdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'firstName' => 'Admin',
            'LastName' => 'Admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('admin@123'),
            'employeeCode' => '01',
            'branch' =>'hcm',
            'location' => 'hcm',
            'is_supperadm' => true,
            'is_permitter' => true,
            'is_nego' => true,
            'is_final' => true,
           // 'role' => 'admin'
        ]);

        // $role = Role::create(['name' => 'admin']);

        //$permissions = Permission::pluck('id', 'id')->all();

        // $role->syncPermissions($permissions);

       $user->assignRole(["admin"]);
    }
}
