<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AccountController extends Controller
{
    // ...
    /**
     * Get all formateurs (for dropdowns, etc)
     */
    public function getFormateurs()
    {
        $formateurs = DB::table('formateurs')
            ->select('id', DB::raw("CONCAT(nom, ' ', prenom) AS name"))
            ->get();
        return response()->json(['formateurs' => $formateurs]);
    }

    public function getAllAccounts()
    {
        $stagiaires = DB::table('stagiaires')
            ->select('id', DB::raw("CONCAT(nom, ' ', prenom) AS name"), 'email', DB::raw("'stagiaire' as role"), 'created_at')
            ->get();

        $formateurs = DB::table('formateurs')
            ->select('id', DB::raw("CONCAT(nom, ' ', prenom) AS name"), 'email', DB::raw("'formateur' as role"), 'created_at')
            ->get();

        $admins = DB::table('administrateurs')
            ->select('id', DB::raw("CONCAT(nom, ' ', prenom) AS name"), 'email', DB::raw("'administrateur' as role"), 'created_at')
            ->get();

        $accounts = $stagiaires->merge($formateurs)->merge($admins);

        return response()->json($accounts);
    }

    public function createAccount(Request $request)
    {
        $request->validate([
            'role' => 'required|in:stagiaire,formateur,administrateur',
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'email' => 'required|email|unique:' . $request->role . 's,email',
            'password' => 'required|string|min:6',
        ]);

        $data = [
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'created_at' => now(),
            'updated_at' => now()
        ];

        if ($request->role === 'stagiaire') {
            $data['filiere'] = $request->filiere ?? '';
            $data['niveau'] = $request->niveau ?? '';
            $data['promotion'] = $request->promotion ?? '';
        } elseif ($request->role === 'formateur') {
            $data['specialite'] = $request->specialite ?? '';
        }

        DB::table($request->role . 's')->insert($data);

        return response()->json(['message' => ucfirst($request->role) . ' créé avec succès']);
    }

    public function updateAccount(Request $request, $role, $id)
    {
        $allowedRoles = ['stagiaire', 'formateur', 'administrateur'];
        if (!in_array($role, $allowedRoles)) {
            return response()->json(['error' => 'Rôle invalide'], 400);
        }

        $data = $request->only(['nom', 'prenom', 'email']);
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        if ($role === 'stagiaire') {
            $data['filiere'] = $request->filiere ?? '';
            $data['niveau'] = $request->niveau ?? '';
            $data['promotion'] = $request->promotion ?? '';
        } elseif ($role === 'formateur') {
            $data['specialite'] = $request->specialite ?? '';
        }

        $data['updated_at'] = now();

        DB::table($role . 's')->where('id', $id)->update($data);

        return response()->json(['message' => ucfirst($role) . ' mis à jour avec succès']);
    }

    public function deleteAccount($role, $id)
    {
        $allowedRoles = ['stagiaire', 'formateur', 'administrateur'];
        if (!in_array($role, $allowedRoles)) {
            return response()->json(['error' => 'Rôle invalide'], 400);
        }

        DB::table($role . 's')->where('id', $id)->delete();

        return response()->json(['message' => ucfirst($role) . ' supprimé avec succès']);
    }

    // Update authenticated stagiaire's profile
    public function updateStagiaireProfile(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate([
            'nom' => 'required|string',
            'prenom' => 'required|string',
            'email' => 'required|email',
        ]);

        DB::table('stagiaires')->where('id', $user->id)->update([
            'nom' => $validated['nom'],
            'prenom' => $validated['prenom'],
            'email' => $validated['email'],
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Profil mis à jour avec succès']);
    }

    // Update authenticated stagiaire's password
    public function updateStagiairePassword(Request $request)
    {
        $user = $request->user();
        $request->validate([
            'currentPassword' => 'required',
            'newPassword' => 'required|string|min:6',
            'confirmPassword' => 'required|same:newPassword',
        ]);

        if (!Hash::check($request->currentPassword, $user->password)) {
            return response()->json(['errors' => ['currentPassword' => ['Mot de passe actuel incorrect']]], 422);
        }

        DB::table('stagiaires')->where('id', $user->id)->update([
            'password' => Hash::make($request->newPassword),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'Mot de passe mis à jour avec succès']);
    }
}
