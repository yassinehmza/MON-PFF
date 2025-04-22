<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AccountController;

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
// In routes/api.php or routes/web.php
Route::post('/login/administrateur', [AuthController::class, 'loginAdministrateur'])->name('login.administrateur');
Route::post('/login/stagiaire', [AuthController::class, 'loginStagiaire'])->name('login.stagiaire');
Route::post('/login/formateur', [AuthController::class, 'loginFormateur'])->name('login.formateur');



use App\Http\Controllers\StageController;
use App\Http\Controllers\DocumentController;

// Add these routes inside your protected routes middleware for authenticated users
Route::get('/formateurs', [App\Http\Controllers\AccountController::class, 'getFormateurs']);
Route::middleware('auth:sanctum')->group(function () {
    // Documents resource
    Route::apiResource('documents', DocumentController::class);
    Route::get('documents/{id}/download', [DocumentController::class, 'download']);


    // Routes for stages management (only for administrators or those with the appropriate role)
    Route::prefix('stages')->group(function () {
        // Create a new stage
        Route::post('/', [StageController::class, 'store']);
        // Update an existing stage
        Route::put('{id}', [StageController::class, 'update']);

        // Get all stages
        Route::get('/', [StageController::class, 'index']);

        // Get a specific stage
        Route::get('{id}', [StageController::class, 'show']);

        // Delete a stage
        Route::delete('{id}', [StageController::class, 'destroy']);
    });
});


// Protected Routes for all authenticated users
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Routes for administrators only
    Route::prefix('admin')->middleware('user.type:administrateur')->group(function () {
        // Lire tous les comptes
        Route::get('/accounts', [AccountController::class, 'getAllAccounts']);
    
        // Créer un compte
        Route::post('/accounts', [AccountController::class, 'createAccount']);
    
        // Modifier un compte
        Route::put('/accounts/{role}/{id}', [AccountController::class, 'updateAccount']);
    
        // Supprimer un compte
        Route::delete('/accounts/{role}/{id}', [AccountController::class, 'deleteAccount']);
    });
    
    
    // Routes for students only
    Route::middleware('user.type:stagiaire')->prefix('etudiant')->group(function () {
        // Student-specific routes go here
        Route::get('/dashboard', function () {
            return response()->json(['message' => 'Student dashboard data']);
        });
        Route::put('/profile', [\App\Http\Controllers\AccountController::class, 'updateStagiaireProfile']);
        Route::put('/password', [\App\Http\Controllers\AccountController::class, 'updateStagiairePassword']);
        Route::get('/stages', [\App\Http\Controllers\StageController::class, 'stagiaireStages']);
        Route::post('/stages', [\App\Http\Controllers\StageController::class, 'stagiaireStore']);
        Route::put('/stages/{id}', [\App\Http\Controllers\StageController::class, 'stagiaireUpdate']);
        Route::delete('/stages/{id}', [\App\Http\Controllers\StageController::class, 'stagiaireDestroy']);
    });
    
    // Routes for instructors only
    Route::middleware('user.type:formateur')->prefix('formateur')->group(function () {
        // Instructor-specific routes go here
        Route::get('/dashboard', function () {
            return response()->json(['message' => 'Instructor dashboard data']);
        });
        Route::get('/dashboard-stats', [\App\Http\Controllers\FormateurController::class, 'dashboardStats']);
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
