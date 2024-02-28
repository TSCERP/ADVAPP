<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Route;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class CreateRoutePermissionsCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gt:create-permission-role';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a permission routes.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $permissionsToCreate =
            [
                'Users', 'approval',
                'VHO', 'CHO',
                'SO', 'PO',
                'SQ', 'Contract',
                'Report',
                'ConfirmVHO', 'ConfirmCHO',
                'ConfirmSO', 'ConfirmPO',
                'ConfirmSQ', 'ConfirmContract',
                'RejectVHO', 'RejectCHO',
                'RejectSO', 'RejectPO',

            ];

        $messageMapping = [
            'VHO' => 'VHO',
            'CHO' => 'CHO',
            'SO' => 'Sales Order',
            'PO' => 'Purchase Order',
            'SQ' => 'Sales Quotation',
            'Report' => 'báo cáo',
            'Contract' => 'hợp đồng',
            'users' => 'quản lý user',
            'approval' => 'approval',
            'ConfirmVHO' => 'Xác nhận VHO',
            'ConfirmCHO' => 'Xác nhận CHO',
            'ConfirmSO' => 'Xác nhận Sales Order',
            'ConfirmPO' => 'Xác nhận Purchase Order',
            'ConfirmSQ' => 'Xác nhận Sales Quotation',
            'ConfirmContract' => 'Xác nhận hợp đồng',
            'RejectVHO' => 'Từ chối VHO',
            'RejectCHO' => 'Từ chối CHO',
            'RejectSO' => 'Từ chối Sales Order',
            'RejectPO' => 'Từ chối Purchase Order',

        ];

        array_map(function ($permissionName) use ($messageMapping) {
            $permissionMessage = $messageMapping[$permissionName] ?? 'Unknown Permission';

            if (!Permission::where('name', $permissionName)->exists()) {
                Permission::create(['name' => $permissionName, 'message' => $permissionMessage]);
                $this->info("Permission for {$permissionName} ({$permissionMessage}) created.");
            } else {
                $this->info("Permission for {$permissionName} already exists.");
            }
        }, $permissionsToCreate);


        $this->info('Permission added successfully.');
        // Xóa role client và admin nếu tồn tại
        $existingAdminRole = Role::where('name', 'admin')->first();
        $existingClientRole = Role::where('name', 'client')->first();

        if ($existingAdminRole) {
            $existingAdminRole->delete();
        }

        if ($existingClientRole) {
            $existingClientRole->delete();
        }
        $this->info('Existing admin and client roles deleted successfully.');


        // Tạo role admin và client
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $clientRole = Role::firstOrCreate(['name' => 'client']);

        $this->info('Admin and client roles created successfully.');

        // Gán quyền cho role admin
        $adminRole->givePermissionTo(Permission::all());

        // Gán quyền cho role client (chỉ quyền cụ thể)
        $clientPermissions = Permission::whereIn('name', [
            'approval',
            'VHO', 'CHO',
            'SO', 'PO',
            'SQ', 'PQ',
            'Contract',
            'Report'
        ])->get();
        $clientRole->givePermissionTo($clientPermissions);

        $this->info('Permissions assigned to roles successfully.');
    }
}
