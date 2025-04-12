<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Administrateur;
use App\Models\Stagiaire;
use App\Models\Formateur;

class AuthController extends Controller
{
    /**
     * Login for administrators
     */
    public function loginAdministrateur(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $administrateur = Administrateur::where('email', $request->email)->first();

        if (!$administrateur || !Hash::check($request->password, $administrateur->password)) {
            return response()->json([
                'message' => 'Les informations d\'identification fournies sont incorrectes.'
            ], 401);
        }

        $token = $administrateur->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $administrateur
        ]);
    }

    /**
     * Login for students
     */
    public function loginStagiaire(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $stagiaire = Stagiaire::where('email', $request->email)->first();

        if (!$stagiaire || !Hash::check($request->password, $stagiaire->password)) {
            return response()->json([
                'message' => 'Les informations d\'identification fournies sont incorrectes.'
            ], 401);
        }

        $token = $stagiaire->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $stagiaire
        ]);
    }

    /**
     * Login for instructors
     */
    public function loginFormateur(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $formateur = Formateur::where('email', $request->email)->first();

        if (!$formateur || !Hash::check($request->password, $formateur->password)) {
            return response()->json([
                'message' => 'Les informations d\'identification fournies sont incorrectes.'
            ], 401);
        }

        $token = $formateur->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $formateur
        ]);
    }

    /**
     * Logout user (revoke token)
     */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Déconnexion réussie'
        ]);
    }

    /**
     * Get the authenticated user
     */
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
