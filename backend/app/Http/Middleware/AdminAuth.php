<?php

namespace App\Http\Middleware;

use Closure;
use ErrorException;
use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\SignatureInvalidException;
use Firebase\JWT\ExpiredException;
use Firebase\JWT\Key;
use TypeError;

class AdminAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            $jwt = $request->bearerToken();
            $key = new Key(env('JWT_SECRET'), 'HS256');

            $decoded = JWT::decode($jwt, $key);
            if ($decoded->role !== 'admin') {
                return response()->json([
                    'message' => 'Invalid token',
                    'statusCode' => 401,
                ], 401);
            }

            $request->request->add([
                'userauth' => [
                    'id' => $decoded->id,
                    'name' => $decoded->name,
                    'role' => $decoded->role,
                ]
            ]);
            return $next($request);
        } catch (SignatureInvalidException $e) {
            return response()->json([
                'message' => 'Invalid token',
                'statusCode' => 401,
            ], 401);
        } catch (ExpiredException $e) {
            return response()->json([
                'message' => 'Expired token',
                'statusCode' => 401,
            ], 401);
        } catch (TypeError $e) {
            return response()->json([
                'message' => 'Invalid token',
                'statusCode' => 401,
            ], 401);
        } catch (ErrorException $e) {
            return response()->json([
                'message' => 'Invalid token',
                'statusCode' => 401,
            ], 401);
        }
    }
}