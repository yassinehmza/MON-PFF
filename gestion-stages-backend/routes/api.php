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
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Authentication Routes
Route::post('/login/administrateur', [AuthController::class, 'loginAdministrateur']);
Route::post('/login/stagiaire', [AuthController::class, 'loginStagiaire']);
Route::post('/login/formateur', [AuthController::class, 'loginFormateur']);

// Protected Routes for all authenticated users
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Routes for administrators only
    Route::middleware('user.type:administrateur')->prefix('admin')->group(function () {
        // Admin-specific routes go here
        Route::get('/dashboard', function () {
            return response()->json(['message' => 'Admin dashboard data']);
        });
    });
    
    // Routes for students only
    Route::middleware('user.type:stagiaire')->prefix('etudiant')->group(function () {
        // Student-specific routes go here
        Route::get('/dashboard', function () {
            return response()->json(['message' => 'Student dashboard data']);
        });
    });
    
    // Routes for instructors only
    Route::middleware('user.type:formateur')->prefix('formateur')->group(function () {
        // Instructor-specific routes go here
        Route::get('/dashboard', function () {
            return response()->json(['message' => 'Instructor dashboard data']);
        });
        Route::get('/profile', function (Request $request) {
            return response()->json([
                'nom' => 'Nom du formateur',
                'prenom' => 'Prénom du formateur',
                'email' => 'email@example.com',
                'specialite' => 'Spécialité du formateur'
            ]);
        });
    });
});
