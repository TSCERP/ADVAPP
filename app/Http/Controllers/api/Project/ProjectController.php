<?php

namespace App\Http\Controllers\api\Project;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    /**
     * Retrieve a list of projects with additional information about the creators and updaters.
     *
     * @return \Illuminate\Http\Response
     */
    function index()
    {
        // Retrieve active projects with specific columns and relationships
        $projects = Project::active()
            ->select('id', 'Code', 'Name', 'CreatedBy', 'UpdatedBy', 'Active', 'created_at', 'updated_at')
            ->with(['createdBy' => function ($query) {
                $query->select('id', 'FirstName', 'LastName');
            }])
            ->with(['updatedBy' => function ($query) {
                $query->select('id', 'FirstName', 'LastName');
            }])
            ->get();

        // Transform the projects by modifying the 'CreatedBy' and 'UpdatedBy' properties
        $projects->transform(function ($project) {
            $project->CreatedBy = $project->CreatedBy ? $project->createdBy->LastName . ' ' . $project->createdBy->FirstName : null;
            $project->UpdatedBy = $project->UpdatedBy ? $project->updatedBy->LastName . ' ' . $project->updatedBy->FirstName : null;
            unset($project->createdBy);
            unset($project->updatedBy);
            return $project;
        });

        // Return the list of projects
        return $projects;
    }

    /**
     * Create a new project.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    function create(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'Code' => 'required',
            'Name' => 'required',
        ]);

        // If validation fails, return the validation errors with a 422 Unprocessable Entity status code
        if ($validator->fails()) {
            return response()->json(['error' => implode(' ', $validator->errors()->all())], 422);
        }

        // Extract the required data from the request
        $data = $request->only(['Code', 'Name']);
        $data['CreatedBy'] = Auth::user()->id;

        // Create a new project
        $Project = Project::create($data);

        // Return the created project with a 201 Created status code
        return response()->json($Project, 201);
    }

    /**
     * Update an existing project.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    function update(Request $request, $id)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'Code' => [
                'required',
                'unique:Projects,Code,' . $id,
                function ($attribute, $value, $fail) use ($id) {
                    // Check if the record exists and is not deleted
                    $project = Project::where('id', $id)->where('IsDeleted', 0)->first();
                    if (!$project) {
                        $fail('Không tìm thấy hoặc bản ghi đã bị xóa.');
                    }
                },
            ],
            'Name' => 'required',
        ]);

        // If validation fails, return the validation errors with a 422 Unprocessable Entity status code
        if ($validator->fails()) {
            return response()->json(['error' => implode(' ', $validator->errors()->all())], 422);
        }

        // Check if the project with the given id exists
        $Project = Project::find($id);
        if (!$Project) {
            return response()->json(['message' => 'Project id not found'], 404);
        }

        // Update the project data
        $data = $request->only(['Code', 'Name']);
        $data['Active'] = $request->Active ?? 1;
        $data['UpdatedBy'] = Auth::user()->id;
        $Project = Project::where('id', $id)->update($data);

        // Return a success message with a 200 OK status code
        return response()->json('updated success', 200);
    }

    /**
     * Retrieve a specific project by its id.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    function show($id)
    {
        // Validate the id parameter
        $validator = Validator::make(['id' => $id], [
            'id' => [
                'required',
                function ($attribute, $value, $fail) {
                    $project = Project::where('id', $value)->where('IsDeleted', 0)->exists();
                    if (!$project) {
                        $fail('Không tìm thấy hoặc bản ghi đã bị xóa.');
                    }
                },
            ],
        ]);

        // If validation fails, return the validation errors with a 422 Unprocessable Entity status code
        if ($validator->fails()) {
            return response()->json(['error' => implode(' ', $validator->errors()->all())], 422);
        }

        // Retrieve the specific project by its id
        $Project = Project::select('Code', 'Name', 'Active')->find($id);

        // Return the project with a 200 OK status code
        return response()->json($Project, 200);
    }

    /**
     * Delete a project by setting its 'Active' and 'IsDeleted' properties.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    function delete($id)
    {
        // Check if the project with the given id exists
        $Project = Project::find($id);
        if (!$Project) {
            return response()->json(['message' => 'Project id not found'], 404);
        }

        // Update the project properties to mark it as deleted
        $Project = Project::where('id', $id)->update(
            [
                'Active' => 0,
                'IsDeleted' => 1,
                'UpdatedBy' => Auth::user()->id,
                'DeletedAt' => date('Y-m-d H:i:s'),
            ]
        );

        // Return a success message with a 200 OK status code
        return response()->json('deleted success', 200);
    }

    /**
     * Retrieve a list of active projects with specific columns.
     *
     * @return \Illuminate\Http\Response
     */
    function list()
    {
        // Retrieve active projects with specific columns
        $projects = Project::active()
            ->select('id', 'Code', 'Name')
            ->where('Active', 1)->get();

        // Return the list of projects
        return $projects;
    }
}
