<?php

namespace App\Http\Controllers;

use App\Models\User;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request) {
        $data = $request->all();

        $v = Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        if ($v->fails()) {
            return response()->json([
                'statusCode' => 400,
                'message' => 'Bad Request',
            ], 400);
        }

        // check if email already exits
        $user = User::where('email', $data['email'])->first();
        if ($user) {
            return response()->json([
                'statusCode' => 409,
                'message' => 'Email already exists',
            ], 409);
        }

        $user = new User();
        $user->fill($data);

        try {
            $user->save();

            return response()->json([
                'statusCode' => 201,
                'message' => 'Successfully created user',
            ], 201);


        } catch (\Exception $e) {
            return response()->json([
                'statusCode' => 500,
                'message' => 'Internal Server Error',
            ], 500);
        }
    }

    public function login(Request $request) {
        $data = $request->all();

        $v = Validator::make($data, [
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if ($v->fails()) {
            return response()->json([
                'statusCode' => 400,
                'message' => 'Bad Request',
            ], 400);
        }

        $user = User::where('email', $data['email'])->first();
        if (!$user) {
            return response()->json([
                'statusCode' => 404,
                'message' => 'User not found',
            ], 404);
        }

        if (!password_verify($data['password'], $user->password)) {
            return response()->json([
                'statusCode' => 401,
                'message' => 'Unauthorized',
            ], 401);
        }

        $payload = [
            'id' => $user->id,
            'name' => $user->name,
            'role' => $user->role,
            'exp' => time() + 60 * 60 * 24,
            'iat' => time(),
        ];

        $jwt = JWT::encode($payload, env('JWT_SECRET'), 'HS256');

        return response()->json([
            'statusCode' => 200,
            'message' => 'OK',
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'role' => $user->role,
                'token' => $jwt,
            ],
        ]);
    }
}