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
    Route::prefix('/products')->group(function() {
        Route::get('/', 'App\Http\Controllers\UserController@get_all_products');
        Route::get('/{id}', 'App\Http\Controllers\UserController@get_product');
    });

    Route::prefix('/users')->group(function() {
        Route::get('/me', 'App\Http\Controllers\UserController@get_me');
        Route::put('/me', 'App\Http\Controllers\UserController@update_me');
    });

    Route::get('/get-cart', 'App\Http\Controllers\UserController@get_cart');
    Route::post('/add-to-cart', 'App\Http\Controllers\UserController@add_to_cart');
    Route::delete('/remove-from-cart/{id}', 'App\Http\Controllers\UserController@remove_from_cart');
});

Route::middleware('api.admin')->group(function() {
    Route::prefix('/admin')->group(function() {
        Route::get('/', function(Request $request) {
            return response()->json([
                'statusCode' => 200,
                'message' => 'Welcome to the API!'
            ], 200);
        });

        Route::prefix('/products')->group(function() {
            Route::get('/', 'App\Http\Controllers\AdminController@get_all_products');
            Route::post('/', 'App\Http\Controllers\AdminController@create_product');
            Route::get('/{id}', 'App\Http\Controllers\AdminController@get_product');
            Route::post('/{id}', 'App\Http\Controllers\AdminController@update_product');
            Route::delete('/{id}', 'App\Http\Controllers\AdminController@delete_product');
        });

        Route::prefix('/users')->group(function() {
            Route::get('/', 'App\Http\Controllers\AdminController@get_all_users');
            Route::get('/{id}', 'App\Http\Controllers\AdminController@get_user');
            Route::post('/', 'App\Http\Controllers\AdminController@create_user');
            Route::put('/{id}', 'App\Http\Controllers\AdminController@update_user');
            Route::delete('/{id}', 'App\Http\Controllers\AdminController@delete_user');
        });

        Route::prefix('/categories')->group(function() {
            Route::get('/', 'App\Http\Controllers\AdminController@get_all_categories');
            Route::get('/{id}', 'App\Http\Controllers\AdminController@get_category');
            Route::post('/', 'App\Http\Controllers\AdminController@create_category');
            Route::put('/{id}', 'App\Http\Controllers\AdminController@update_category');
            Route::delete('/{id}', 'App\Http\Controllers\AdminController@delete_category');
        });
    });
});