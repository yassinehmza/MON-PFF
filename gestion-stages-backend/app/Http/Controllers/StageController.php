<?php

namespace App\Http\Controllers;

use App\Models\Stage;
use App\Models\Stagiaire;
use App\Models\Formateur;
use App\Models\Entreprise;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StageController extends Controller
{
    /**
     * Afficher la liste des stages
     */
    public function index()
    {
        $stages = Stage::with(['stagiaire', 'formateur', 'entreprise'])->get();
        return response()->json(['stages' => $stages]);
    }

    /**
     * Afficher un stage spécifique
     */
    public function show($id)
    {
        $stage = Stage::with(['stagiaire', 'formateur', 'entreprise', 'documents'])->findOrFail($id);
        return response()->json(['stage' => $stage]);
    }

    /**
     * Créer un nouveau stage
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_stagiaire' => 'required|exists:stagiaires,id',
            'id_formateur' => 'nullable|exists:formateurs,id',
            'id_entreprise' => 'required|exists:entreprises,id',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
            'description' => 'required|string',
            'encadrant_entreprise' => 'required|string|max:255',
            'contact_encadrant' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $stage = Stage::create($request->all());

        return response()->json(['message' => 'Stage créé avec succès', 'stage' => $stage], 201);
    }

    /**
     * Mettre à jour un stage
     */
    public function update(Request $request, $id)
    {
        $stage = Stage::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'id_stagiaire' => 'exists:stagiaires,id',
            'id_formateur' => 'nullable|exists:formateurs,id',
            'id_entreprise' => 'exists:entreprises,id',
            'date_debut' => 'date',
            'date_fin' => 'date|after:date_debut',
            'description' => 'string',
            'evaluation' => 'nullable|string',
            'encadrant_entreprise' => 'string|max:255',
            'contact_encadrant' => 'string|max:255',
            'status' => 'string|in:en_attente,en_cours,termine,valide,refuse',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $stage->update($request->all());

        return response()->json(['message' => 'Stage mis à jour avec succès', 'stage' => $stage]);
    }

    /**
     * Supprimer un stage
     */
    public function destroy($id)
    {
        $stage = Stage::findOrFail($id);
        $stage->delete();

        return response()->json(['message' => 'Stage supprimé avec succès']);
    }

    /**
     * Assigner un formateur à un stage
     */
    public function assignFormateur(Request $request, $id)
    {
        $stage = Stage::findOrFail($id);
        $formateur = Formateur::findOrFail($request->id_formateur);

        $stage->assignFormateur($formateur);

        return response()->json(['message' => 'Formateur assigné avec succès', 'stage' => $stage]);
    }

    /**
     * Mettre à jour le statut d'un stage
     */
    public function updateStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|string|in:en_attente,en_cours,termine,valide,refuse',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $stage = Stage::findOrFail($id);
        $stage->updateStatus($request->status);

        return response()->json(['message' => 'Statut mis à jour avec succès', 'stage' => $stage]);
    }

    /**
     * Évaluer un stage
     */
    public function evaluateStage(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'evaluation' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $stage = Stage::findOrFail($id);
        $stage->update(['evaluation' => $request->evaluation]);

        return response()->json(['message' => 'Stage évalué avec succès', 'stage' => $stage]);
    }
}
