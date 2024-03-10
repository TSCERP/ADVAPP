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
                'Users_list',
                'Users_create',
                'Users_edit',
                'role_create',
                'role_edit',
                'approval_create',
                'approval_edit',
                'approval_delete',
                'approval_list',
                'approval_view',
                'approval_approve',
                'approval_changeApprover',
                'approval_department_view',
                'approval_department_list',
                'approval_department_edit',
                'approval_department_cancelled',
                'approval_revised',
                'approval_cancelled',
                'SQ_create',
                'SQ_edit',
                'SQ_delete',
                'SQ_list',
                'SQ_view',
                'SQ_approve',
                'SQ_changeApprover',
                'SQ_department_view',
                'SQ_department_list',
                'SQ_department_edit',
                'SQ_department_cancelled',
                'SQ_confirm',
                'SQ_revised',
                'SQ_cancelled',
                'PO_create',
                'PO_edit',
                'PO_delete',
                'PO_list',
                'PO_view',
                'PO_approve',
                'PO_changeApprover',
                'PO_department_view',
                'PO_department_list',
                'PO_department_edit',
                'PO_department_cancelled',
                'PO_confirm',
                'PO_revised',
                'PO_cancelled',
                'Report',
                'CHO_create',
                'CHO_edit',
                'CHO_delete',
                'CHO_list',
                'CHO_view',
                'CHO_approve',
                'CHO_changeApprover',
                'CHO_department_view',
                'CHO_department_list',
                'CHO_department_edit',
                'CHO_department_cancelled',
                'CHO_confirm',
                'CHO_revised',
                'CHO_cancelled',
                'SHO_create',
                'SHO_edit',
                'SHO_delete',
                'SHO_list',
                'SHO_view',
                'SHO_approve',
                'SHO_changeApprover',
                'SHO_department_view',
                'SHO_department_list',
                'SHO_department_edit',
                'SHO_department_cancelled',
                'SHO_confirm',
                'SHO_revised',
                'SHO_cancelled',
                'Contract_create',
                'Contract_edit',
                'Contract_delete',
                'Contract_list',
                'Contract_view',
                'Contract_approve',
                'Contract_changeApprover',
                'Contract_department_view',
                'Contract_department_list',
                'Contract_department_edit',
                'Contract_department_cancelled',
                'Contract_confirm',
                'Contract_changeStatus',
                'Contract_revised',
                'Contract_cancelled',
                'payment_create',
                'payment_edit',
                'payment_delete',
                'payment_list',
                'payment_view',
                'payment_approve',
                'payment_changeApprover',
                'payment_department_view',
                'payment_department_list',
                'payment_department_edit',
                'payment_department_cancelled',
                'payment_confirm',
                'payment_changeStatus',
                'payment_revised',
                'payment_cancelled',
                'QR_create',
                'QR_edit',
                'QR_delete',
                'QR_list',
                'QR_view',
                'QR_approve',
                'QR_Confirm',
                'QR_canclled'
            ];

        $messageMapping = [
            // Add your modifications here
            'Users_list' => 'Danh sách người dùng',
            'Users_create' => 'Tạo người dùng',
            'Users_edit' => 'Chỉnh sửa người dùng',
            'role_create' => 'Tạo vai trò',
            'role_edit' => 'Chỉnh sửa vai trò',
            'approval_create' => 'Tạo approval',
            'approval_edit' => 'Chỉnh sửa approval',
            'approval_delete' => 'Xóa approval',
            'approval_list' => 'Danh sách approval',
            'approval_view' => 'Xem approval',
            'approval_approve' => 'Phê duyệt approval',
            'approval_changeApprover' => 'Thay đổi người phê duyệt',
            'approval_department_view' => 'Xem approval theo phòng ban',
            'approval_department_list' => 'Danh sách approval theo phòng ban',
            'approval_department_edit' => 'Chỉnh sửa approval theo phòng ban',
            'approval_department_cancelled' => 'Hủy bỏ approval theo phòng ban',
            'approval_revised' => 'Revised approval',
            'approval_cancelled' => 'Hủy bỏ approval',
            'SQ_create' => 'Tạo Sales Quotation',
            'SQ_edit' => 'Chỉnh sửa Sales Quotation',
            'SQ_delete' => 'Xóa Sales Quotation',
            'SQ_list' => 'Danh sách Sales Quotation',
            'SQ_view' => 'Xem Sales Quotation',
            'SQ_approve' => 'Phê duyệt Sales Quotation',
            'SQ_changeApprover' => 'Thay đổi người phê duyệt Sales Quotation',
            'SQ_department_view' => 'Xem Sales Quotation theo phòng ban',
            'SQ_department_list' => 'Danh sách Sales Quotation theo phòng ban',
            'SQ_department_edit' => 'Chỉnh sửa Sales Quotation theo phòng ban',
            'SQ_department_cancelled' => 'Hủy bỏ Sales Quotation theo phòng ban',
            'SQ_confirm' => 'Xác nhận Sales Quotation',
            'SQ_Revised' => 'Revised Sales Quotation',
            'SQ_cancelled' => 'Hủy bỏ Sales Quotation',
            'PO_create' => 'Tạo Purchase Order',
            'PO_edit' => 'Chỉnh sửa Purchase Order',
            'PO_delete' => 'Xóa Purchase Order',
            'PO_list' => 'Danh sách Purchase Order',
            'PO_view' => 'Xem Purchase Order',
            'PO_approve' => 'Phê duyệt Purchase Order',
            'PO_changeApprover' => 'Thay đổi người phê duyệt Purchase Order',
            'PO_department_view' => 'Xem Purchase Order theo phòng ban',
            'PO_department_list' => 'Danh sách Purchase Order theo phòng ban',
            'PO_department_edit' => 'Chỉnh sửa Purchase Order theo phòng ban',
            'PO_department_cancelled' => 'Hủy bỏ Purchase Order theo phòng ban',
            'PO_confirm' => 'Xác nhận Purchase Order',
            'PO_Revised' => 'Revised Purchase Order',
            'PO_cancelled' => 'Hủy bỏ Purchase Order',
            'Report' => 'Báo cáo',
            'CHO_create' => 'Tạo CHO',
            'CHO_edit' => 'Chỉnh sửa CHO',
            'CHO_delete' => 'Xóa CHO',
            'CHO_list' => 'Danh sách CHO',
            'CHO_view' => 'Xem CHO',
            'CHO_approve' => 'Phê duyệt CHO',
            'CHO_changeApprover' => 'Thay đổi người phê duyệt CHO',
            'CHO_department_view' => 'Xem CHO theo phòng ban',
            'CHO_department_list' => 'Danh sách CHO theo phòng ban',
            'CHO_department_edit' => 'Chỉnh sửa CHO theo phòng ban',
            'CHO_department_cancelled' => 'Hủy bỏ CHO theo phòng ban',
            'CHO_confirm' => 'Xác nhận CHO',
            'CHO_Revised' => 'Revised CHO',
            'CHO_cancelled' => 'Hủy bỏ CHO',
            'SHO_create' => 'Tạo SHO',
            'SHO_edit' => 'Chỉnh sửa SHO',
            'SHO_delete' => 'Xóa SHO',
            'SHO_list' => 'Danh sách SHO',
            'SHO_view' => 'Xem SHO',
            'SHO_approve' => 'Phê duyệt SHO',
            'SHO_changeApprover' => 'Thay đổi người phê duyệt SHO',
            'SHO_department_view' => 'Xem SHO theo phòng ban',
            'SHO_department_list' => 'Danh sách SHO theo phòng ban',
            'SHO_department_edit' => 'Chỉnh sửa SHO theo phòng ban',
            'SHO_department_cancelled' => 'Hủy bỏ SHO theo phòng ban',
            'SHO_confirm' => 'Xác nhận SHO',
            'SHO_Revised' => 'Revised SHO',
            'SHO_cancelled' => 'Hủy bỏ SHO',
            'Contract_create' => 'Tạo hợp đồng',
            'Contract_edit' => 'Chỉnh sửa hợp đồng',
            'Contract_delete' => 'Xóa hợp đồng',
            'Contract_list' => 'Danh sách hợp đồng',
            'Contract_view' => 'Xem hợp đồng',
            'Contract_approve' => 'Phê duyệt hợp đồng',
            'Contract_changeApprover' => 'Thay đổi người phê duyệt hợp đồng',
            'Contract_department_view' => 'Xem hợp đồng theo phòng ban',
            'Contract_department_list' => 'Danh sách hợp đồng theo phòng ban',
            'Contract_department_edit' => 'Chỉnh sửa hợp đồng theo phòng ban',
            'Contract_department_cancelled' => 'Hủy bỏ hợp đồng theo phòng ban',
            'Contract_confirm' => 'Xác nhận hợp đồng',
            'Contract_changeStatus' => 'Thay đổi trạng thái hợp đồng',
            'Contract_revised' => 'Revised hợp đồng',
            'Contract_cancelled' => 'Hủy bỏ hợp đồng',
            'payment_create' => 'Tạo thanh toán',
            'payment_edit' => 'Chỉnh sửa thanh toán',
            'payment_delete' => 'Xóa thanh toán',
            'payment_list' => 'Danh sách thanh toán',
            'payment_view' => 'Xem thanh toán',
            'payment_approve' => 'Phê duyệt thanh toán',
            'payment_changeApprover' => 'Thay đổi người phê duyệt thanh toán',
            'payment_department_view' => 'Xem thanh toán theo phòng ban',
            'payment_department_list' => 'Danh sách thanh toán theo phòng ban',
            'payment_department_edit' => 'Chỉnh sửa thanh toán theo phòng ban',
            'payment_department_cancelled' => 'Hủy bỏ thanh toán theo phòng ban',
            'payment_confirm' => 'Xác nhận yêu cầu thanh toán',
            'payment_changeStatus' => 'Thay đổi trạng thái thanh toán',
            'payment_revised' => 'Revised thanh toán',
            'payment_cancelled' => 'Hủy bỏ thanh toán',
            'QR_create' => 'Tạo QR',
            'QR_edit' => 'Chỉnh sửa QR',
            'QR_delete' => 'Xóa QR',
            'QR_list' => 'Danh sách QR',
            'QR_view' => 'Xem QR',
            'QR_approve' => 'Phê duyệt QR',
            'QR_Confirm' => 'Xác nhận QR',
            'QR_canclled' => 'Hủy bỏ QR',
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
        $clientRole = Role::firstOrCreate(['name' => 'advance']);

        $this->info('Admin and client roles created successfully.');

        // Gán quyền cho role admin
        $adminRole->givePermissionTo(Permission::all());

        // Gán quyền cho role client (chỉ quyền cụ thể)
        $clientPermissions = Permission::whereIn('name', [
            'Users_list',
            'Users_create',
            'approval_create',
            'approval_edit',
            'approval_delete',
            'approval_list',
            'approval_view',
            'approval_approve',
            'approval_department_view',
            'approval_department_list',
            'approval_department_edit',
            'approval_department_cancelled',
            'approval_revised',
            'approval_cancelled',
            'SQ_create',
            'SQ_edit',
            'SQ_delete',
            'SQ_list',
            'SQ_view',
            'SQ_approve',
            'SQ_department_view',
            'SQ_department_list',
            'SQ_department_edit',
            'SQ_department_cancelled',
            'SQ_confirm',
            'SQ_revised',
            'SQ_cancelled',
            'PO_create',
            'PO_edit',
            'PO_delete',
            'PO_list',
            'PO_view',
            'PO_approve',
            'PO_department_view',
            'PO_department_list',
            'PO_department_edit',
            'PO_department_cancelled',
            'PO_confirm',
            'PO_revised',
            'PO_cancelled',
            'Report',
            'CHO_create',
            'CHO_edit',
            'CHO_delete',
            'CHO_list',
            'CHO_view',
            'CHO_approve',
            'CHO_department_view',
            'CHO_department_list',
            'CHO_department_edit',
            'CHO_department_cancelled',
            'CHO_confirm',
            'CHO_revised',
            'CHO_cancelled',
            'SHO_create',
            'SHO_edit',
            'SHO_delete',
            'SHO_list',
            'SHO_view',
            'SHO_approve',
            'SHO_department_view',
            'SHO_department_list',
            'SHO_department_edit',
            'SHO_department_cancelled',
            'SHO_confirm',
            'SHO_revised',
            'SHO_cancelled',
            'Contract_create',
            'Contract_edit',
            'Contract_delete',
            'Contract_list',
            'Contract_view',
            'Contract_approve',
            'Contract_changeApprover',
            'Contract_department_view',
            'Contract_department_list',
            'Contract_department_edit',
            'Contract_department_cancelled',
            'Contract_confirm',
            'Contract_changeStatus',
            'Contract_revised',
            'Contract_cancelled',
            'payment_create',
            'payment_edit',
            'payment_delete',
            'payment_list',
            'payment_view',
            'payment_approve',
            'payment_changeApprover',
            'payment_department_view',
            'payment_department_list',
            'payment_department_edit',
            'payment_department_cancelled',
            'payment_confirm',
            'payment_changeStatus',
            'payment_revised',
            'payment_cancelled',
            'QR_create',
            'QR_edit',
            'QR_delete',
            'QR_list',
            'QR_view',
            'QR_approve',
            'QR_Confirm',
            'QR_canclled'
        ])->get();
        $clientRole->givePermissionTo($clientPermissions);

        $this->info('Permissions assigned to roles successfully.');
    }
}
