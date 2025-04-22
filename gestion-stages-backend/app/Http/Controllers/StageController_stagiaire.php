<?php

namespace App\Http\Controllers;

use App\Models\Stage;
use Illuminate\Http\Request;

class StageController extends Controller
{
    // ... existing methods ...

    // Get all stages for the authenticated stagiaire
    public function stagiaireStages(Request $request)
    {
        $user = $request->user();
        $stages = Stage::where('id_stagiaire', $user->id)->get();
        return response()->json(['stages' => $stages]);
    }

    // Create a new stage for the authenticated stagiaire
    public function stagiaireStore(Request $request)
    {
        $user = $request->user();
        $validated = $request->validate([
            'id_formateur' => 'required|exists:formateurs,id',
            'id_entreprise' => 'required|exists:entreprises,id',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date',
            'description' => 'required|string',
            'evaluation' => 'nullable|string',
            'encadrant_entreprise' => 'required|string',
            'contact_encadrant' => 'required|string',
        ]);
        $validated['id_stagiaire'] = $user->id;
        $stage = Stage::create($validated);
        return response()->json(['stage' => $stage], 201);
    }

    // Update a stage for the authenticated stagiaire
    public function stagiaireUpdate(Request $request, $id)
    {
        $user = $request->user();
        $stage = Stage::where('id', $id)->where('id_stagiaire', $user->id)->first();
        if (!$stage) {
            return response()->json(['message' => 'Stage not found'], 404);
        }
        $validated = $request->validate([
            'id_formateur' => 'required|exists:formateurs,id',
            'id_entreprise' => 'required|exists:entreprises,id',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date',
            'description' => 'required|string',
            'evaluation' => 'nullable|string',
            'encadrant_entreprise' => 'required|string',
            'contact_encadrant' => 'required|string',
        ]);
        $stage->update($validated);
        return response()->json(['stage' => $stage]);
    }

    // Delete a stage for the authenticated stagiaire
    public function stagiaireDestroy(Request $request, $id)
    {
        $user = $request->user();
        $stage = Stage::where('id', $id)->where('id_stagiaire', $user->id)->first();
        if (!$stage) {
            return response()->json(['message' => 'Stage not found'], 404);
        }
        $stage->delete();
        return response()->json(['message' => 'Stage deleted successfully']);
    }
}
