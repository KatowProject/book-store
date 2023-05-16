<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/', function() {
    return response()->json([
        'statusCode' => 200,
        'message' => 'Welcome to the API!'
    ], 200);
});

Route::post('/register', 'App\Http\Controllers\AuthController@register');
Route::post('/login', 'App\Http\Controllers\AuthController@login');

Route::middleware('api.user')->group(function() {
    Route::prefix('/user')->group(function() {
        Route::get('/', function(Request $request) {
            return response()->json([
                'statusCode' => 200,
                'message' => 'Welcome to the API!',
                'user' => $request->userauth
            ], 200);
        });

        Route::get('/', 'App\Http\Controllers\UserController@get');
        Route::put('/', 'App\Http\Controllers\UserController@update');
        Route::delete('/', 'App\Http\Controllers\UserController@delete');
    });
});