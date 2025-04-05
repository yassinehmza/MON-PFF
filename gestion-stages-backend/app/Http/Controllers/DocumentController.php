<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Stage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    /**
     * Afficher la liste des documents
     */
    public function index()
    {
        $documents = Document::with('stage')->get();
        return response()->json(['documents' => $documents]);
    }

    /**
     * Afficher un document spécifique
     */
    public function show($id)
    {
        $document = Document::with('stage')->findOrFail($id);
        return response()->json(['document' => $document]);
    }

    /**
     * Créer un nouveau document
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'stage_id' => 'required|exists:stages,id',
            'type' => 'required|string|max:255',
            'file' => 'required|file|max:10240', // 10MB max
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $file = $request->file('file');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $file->storeAs('documents', $fileName);

        $document = Document::create([
            'stage_id' => $request->stage_id,
            'type' => $request->type,
            'nom_fichier' => $fileName,
            'date_depot' => now(),
            'status' => 'en_attente',
        ]);

        return response()->json(['message' => 'Document créé avec succès', 'document' => $document], 201);
    }

    /**
     * Mettre à jour un document
     */
    public function update(Request $request, $id)
    {
        $document = Document::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'type' => 'string|max:255',
            'status' => 'string|in:en_attente,valide,refuse',
            'commentaire' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $document->update($request->all());

        return response()->json(['message' => 'Document mis à jour avec succès', 'document' => $document]);
    }

    /**
     * Supprimer un document
     */
    public function destroy($id)
    {
        $document = Document::findOrFail($id);
        
        // Supprimer le fichier physique
        if (Storage::exists('documents/' . $document->nom_fichier)) {
            Storage::delete('documents/' . $document->nom_fichier);
        }
        
        $document->delete();

        return response()->json(['message' => 'Document supprimé avec succès']);
    }

    /**
     * Télécharger un document
     */
    public function download($id)
    {
        $document = Document::findOrFail($id);
        
        if (!Storage::exists('documents/' . $document->nom_fichier)) {
            return response()->json(['message' => 'Fichier non trouvé'], 404);
        }
        
        return Storage::download('documents/' . $document->nom_fichier);
    }

    /**
     * Valider un document
     */
    public function validateDocument(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|string|in:valide,refuse',
            'commentaire' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $document = Document::findOrFail($id);
        $document->validateFile($request->status, $request->commentaire);

        return response()->json(['message' => 'Document validé avec succès', 'document' => $document]);
    }