<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Models\MasterData\Permitter;
use App\Models\MasterData\NegoApproval;
use App\Models\MasterData\FinalApproval;
use App\Models\MasterData\Employees as Employee;

class UserController extends Controller
{

    function index(Request $request)
    {
        $users = User::orderBy('id', 'DESC')->get();

        return response()->json($users, 200);
    }
    // xem chi tiết thông tin user theo id
    function UserById($id)
    {
        try {
            $user = User::findOrFail($id);
            $roles = Role::pluck('name', 'name')->all();
            $userRole = $user->getRoleNames();

            if ($user->avatar) {
                $user->avatar = asset('storage/' . $user->avatar);
            }

            if ($user->imagesign) {
                $user->imagesign = asset('storage/' . $user->imagesign);
            }

            return response()->json(['user' => $user, 'UserRole' => $userRole, 'role' => $roles], 200);
        } catch (\Exception $e) {
            // Trả về một response lỗi khi không tìm thấy user
            return response()->json(['error' => 'User not found'], 404);
        }
    }

    function blockUser($id)
    {
        $user = User::find($id);

        if ($user) {
            $user->IsActive = $user->IsActive == 1 ? 0 : 1;
            $user->save();

            return response()->json(['message' => 'block successfully'], 200);
        }

        return response()->json(['error' => 'User not found'], 404);
    }

    function create(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'FullName' => 'required',
            'Title' => 'required',
            'Avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'email' => 'required|email|unique:users,email',
            'Phone' => 'required|unique:users,phone',
            'password' => 'required',
            'Branch' => 'required',
            'Location' => 'required',
            'EmployeeCode' => 'required|unique:users,employeeCode',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => implode(' ', $validator->errors()->all())], 422); // Return validation errors with a 422 Unprocessable Entity status code
        }

        $input = $request->all();
        $parts = explode(' ', $request->FullName);
        $FirstName = $parts[0];
        $LastName = end($parts);
        $input['FirstName'] = $FirstName;
        $input['LastName'] = explode(' ', $input['FullName'])[1];
        $input['password'] = Hash::make($input['password']);

        $user = User::create($input);

        if ($request->hasFile('Avatar')) {
            $avatar = $request->file('Avatar');
            $avatarPath = $avatar->storeAs('public/avatars/' . $user->id, $avatar->getClientOriginalName());

            $avatarPathWithoutPublic = str_replace('public/', '', $avatarPath);
            $user->avatar = $avatarPathWithoutPublic;
            $user->save();
        }

        return response()->json(['message' => 'User created successfully', 'user' => $user], 200); // 200 OK status code
    }
    function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'FirstName' => 'required',
            'LastName' => 'required',
            'Title' => 'required',
            'Avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'Email' => 'required|email|unique:users,email,' . $id,
            'Phone' => 'required|unique:users,phone,' . $id,
            'Password' => 'nullable',
            'Branch' => 'required',
            'Location' => 'required',
            'EmployeeCode' => 'required|unique:users,employeeCode,' . $id,
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => implode(' ', $validator->errors()->all())], 422); // Return validation errors with a 422 Unprocessable Entity status code
        }

        $input = $request->all();

        if (!empty($input['Password'])) {
            $input['Password'] = Hash::make($input['password']);
        } else {
            $input = Arr::except($input, array('password'));
        }

        $user = User::find($id);

        if ($request->has('Avatar')) {
            $avatar = $request->file('Avatar');

            if ($request->avatar == '-1') {
                // Delete avatar file and set avatar field to null
                if ($user->avatar) {
                    Storage::delete('public/' . $user->avatar);
                    $input['Avatar'] = null;
                }
            } elseif ($avatar) {
                // Delete old avatar file
                if ($user->avatar) {
                    Storage::delete('public/' . $user->avatar);
                }

                // Upload new avatar file
                $avatar = $request->file('Avatar');
                $avatarPath = $avatar->storeAs('public/avatars/' . $user->id, $avatar->getClientOriginalName());

                $avatarPathWithoutPublic = str_replace('public/', '', $avatarPath);
                $input['Avatar'] = $avatarPathWithoutPublic;
            }
        }

        unset($input['_method']);

        $user->update($input);

        return response()->json(['message' => 'User updated successfully', 'user' => $user], 200);
    }
    public function updateProfile(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'FullName' => 'required',
            // 'avatar' => 'nullable|string|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => implode(' ', $validator->errors()->all())], 422);
        }

        $input = $request->only(['FullName']);

        $user = User::find($id);

        if ($request->has('avatar')) {
            $avatar = $request->file('avatar');

            if ($request->avatar == '-1') {
                // Delete avatar file and set avatar field to null
                if ($user->avatar) {
                    Storage::delete('public/' . $user->avatar);
                    $input['avatar'] = null;
                }
            } elseif ($avatar) {
                // Delete old avatar file
                if ($user->avatar) {
                    Storage::delete('public/' . $user->avatar);
                }

                // Upload new avatar file
                $avatarPath = $avatar->storeAs('public/avatars/' . $user->id, $avatar->getClientOriginalName());
                $avatarPathWithoutPublic = str_replace('public/', '', $avatarPath);
                $input['avatar'] = $avatarPathWithoutPublic;
            }
        }

        if ($request->has('imagesign')) {
            $signature = $request->file('imagesign');

            if ($request->imagesign == '-1') {
                // Delete signature file and set signature field to null
                if ($user->imagesign) {
                    Storage::delete('public/' . $user->imagesign);
                    $input['imagesign'] = null;
                }
            } elseif ($signature) {
                // Delete old signature file
                if ($user->imagesign) {
                    Storage::delete('public/' . $user->imagesign);
                }

                // Upload new signature file
                $signaturePath = $signature->storeAs('public/signatures/' . $user->id, $signature->getClientOriginalName());
                $signaturePathWithoutPublic = str_replace('public/', '', $signaturePath);
                $input['imagesign'] = $signaturePathWithoutPublic;
            }
        }

        $user->update($input);

        if ($user->avatar) {
            $user->avatar = asset('storage/' . $user->avatar);
        }

        return response()->json(['message' => 'Profile updated successfully', 'user' => $user], 200);
    }
    public function changePassword(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'oldPassword' => 'required',
            'newPassword' => 'required|min:8|max:15|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => implode(' ', $validator->errors()->all())], 422);
        }

        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'Không tìm thấy user, hoặc user bị block'], 404);
        }

        if (!Hash::check($request->input('oldPassword'), $user->password)) {
            return response()->json(['error' => 'Mật khẩu cũ không đúng'], 422);
        }

        $user->update([
            'password' => Hash::make($request->input('newPassword')),
        ]);

        return response()->json(['message' => 'Password updated successfully'], 200);
    }
    public function Approval(Request $request)
    {
        $EmpCode = Auth::user()->EmployeeCode;
        $Nego = NegoApproval::where('EmployeeID', $EmpCode)->get();
        $Permitter = Permitter::where('EmployeeID', $EmpCode)->get();
        $Final = FinalApproval::where('EmployeeID', $EmpCode)->get();
        $approval = [
            'Nego' => $Nego,
            'Permitter' => $Permitter,
            'Final' => $Final
        ];
        return response()->json($approval, 200);
    }
    function sync()
    {
        $employees = Employee::all();

        foreach ($employees as $employee) {
            $parts = explode(' ', $employee->EmployeeName);
            $FirstName = $parts[0];
            $LastName = end($parts);
            // Kiểm tra xem người dùng đã tồn tại chưa
            User::firstOrCreate(
                ['email' => $employee->Email], // Điều kiện để tìm kiếm người dùng
                [
                    'FullName' => $employee->EmployeeName,
                    'FirstName' => $FirstName,
                    'LastName' =>  $LastName,
                    'email' => $employee->Email,
                    'EmployeeCode' => $employee->EmployeeID,
                    'Title' => $employee->JobTiles,
                    'Branch' => $employee->BranchID,
                    'Location' => $employee->LocationID,
                    'Section' => $employee->SectionID,
                    'Department' => $employee->DepartmentID,
                    'Division' => $employee->DivisionID,
                    'password' => Hash::make('ADV@sbo1q2w3e'),
                ]
            );
        }
        return response()->json(['message' => 'Sync successfully'], 200);
    }
}
