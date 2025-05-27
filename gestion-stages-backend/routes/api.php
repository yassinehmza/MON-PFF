<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\StageController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\FormateurController;
use App\Http\Controllers\EntrepriseController;

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
Route::post('/login/administrateur', [AuthController::class, 'loginAdministrateur'])->name('login.administrateur');
Route::post('/login/stagiaire', [AuthController::class, 'loginStagiaire'])->name('login.stagiaire');
Route::post('/login/formateur', [AuthController::class, 'loginFormateur'])->name('login.formateur');


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
        Route::put('/profile', [AccountController::class, 'updateStagiaireProfile']);
        Route::put('/password', [AccountController::class, 'updateStagiairePassword']);
        
        // Add routes for fetching formateurs and entreprises
        Route::get('/formateurs', [FormateurController::class, 'getActiveFormateurs']);
        Route::get('/entreprises', [EntrepriseController::class, 'getActiveEntreprises']);
        
        // Stage management routes
        Route::get('/stages', [StageController::class, 'stagiaireStages']);
        Route::post('/stages', [StageController::class, 'stagiaireStore']);
        Route::put('/stages/{id}', [StageController::class, 'stagiaireUpdate']);
        Route::delete('/stages/{id}', [StageController::class, 'stagiaireDestroy']);
        
        // Document routes for students
        Route::get('/documents', [DocumentController::class, 'stagiaireDocuments']);
        Route::post('/documents', [DocumentController::class, 'stagiaireUpload']);
        Route::delete('/documents/{id}', [DocumentController::class, 'stagiaireDeleteDocument']);
    });
    
    // Routes for instructors only
    Route::middleware('user.type:formateur')->prefix('formateur')->group(function () {
        // Instructor-specific routes go here
        Route::get('/dashboard', function () {
            return response()->json(['message' => 'Instructor dashboard data']);
        });
        Route::get('/dashboard-stats', [FormateurController::class, 'dashboardStats']);
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
