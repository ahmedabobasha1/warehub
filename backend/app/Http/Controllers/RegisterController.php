<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\UserService;
use Illuminate\Validation\ValidationException;
use Request;

class RegisterController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function store()
    {
        try {

            $validated = request()->validate([
                'name' => 'required|max:255',
                'email' => 'required|email|max:255|unique:users,email',
                'password' => 'required|min:7|max:255',
                'phone_number' => 'required|max:255',
                'address' => 'required|max:255',
            ]);

            $user = $this->userService->createUser($validated);

            return response()->json($user, 201);

        } catch (ValidationException $e) {
            return response()->json(['error' => $e->errors()], 400);
        }
    }
}
