<?php

namespace App\Http\Controllers;

use App\Models\Entreprise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EntrepriseController extends Controller
{
    /**
     * Afficher la liste des entreprises
     */
    public function index()
    {
        $entreprises = Entreprise::all();
        return response()->json(['entreprises' => $entreprises]);
    }

    /**
     * Afficher une entreprise spécifique
     */
    public function show($id)
    {
        $entreprise = Entreprise::with('stages')->findOrFail($id);
        return response()->json(['entreprise' => $entreprise]);
    }

    /**
     * Créer une nouvelle entreprise
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
            'ville' => 'required|string|max:255',
            'pays' => 'required|string|max:255',
            'secteur' => 'required|string|max:255',
            'telephone' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'contact_nom' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $entreprise = Entreprise::create($request->all());

        return response()->json(['message' => 'Entreprise créée avec succès', 'entreprise' => $entreprise], 201);
    }

    /**
     * Mettre à jour une entreprise
     */
    public function update(Request $request, $id)
    {
        $entreprise = Entreprise::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'nom' => 'string|max:255',
            'adresse' => 'string|max:255',
            'ville' => 'string|max:255',
            'pays' => 'string|max:255',
            'secteur' => 'string|max:255',
            'telephone' => 'string|max:255',
            'email' => 'email|max:255',
            'contact_nom' => 'string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $entreprise->update($request->all());

        return response()->json(['message' => 'Entreprise mise à jour avec succès', 'entreprise' => $entreprise]);
    }

    /**
     * Supprimer une entreprise
     */
    public function destroy($id)
    {
        $entreprise = Entreprise::findOrFail($id);
        $entreprise->delete();

        return response()->json(['message' => 'Entreprise supprimée avec succès']);
    }

    /**
     * Obtenir les stages associés à une entreprise
     */
    public function stages($id)
    {
        $entreprise = Entreprise::findOrFail($id);
        $stages = $entreprise->stages()->with(['stagiaire', 'formateur'])->get();

        return response()->json(['stages' => $stages]);
    }
}