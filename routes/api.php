<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

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

Route::group(
    [
        'middleware' => 'api',
        'prefix' => 'auth',

    ], function ($router) {
        Route::put('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);
        Route::post('checkEmail', [AuthController::class, 'checkEmail']);
        Route::post('changePassword', [AuthController::class, 'changePassword']);
        Route::get('logout', [AuthController::class, 'logout']);

        //User Actions
        Route::get('users', [AuthController::class, 'getUsers']);
        Route::get('user/{userId}', [AuthController::class, 'getUser']);
        Route::post('user/{userId}', [AuthController::class, 'updateUser']);
        Route::delete('user/{userId}', [AuthController::class, 'deleteUser']);
});
