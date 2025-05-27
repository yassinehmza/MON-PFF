<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\Stage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

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
            'stage_id' => 'nullable|integer|exists:stages,id', // nullable for admin
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
            'stage_id' => $request->filled('stage_id') ? $request->stage_id : null,
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
        $document = Document::findOrFail($id);
        
        $validated = $request->validate([
            'status' => 'required|in:valide,refuse',
            'commentaire' => 'nullable|string'
        ]);

        $document->update([
            'status' => $validated['status'],
            'commentaire' => $validated['commentaire'] ?? null
        ]);

        return response()->json([
            'message' => 'Document ' . ($validated['status'] === 'valide' ? 'validé' : 'refusé') . ' avec succès',
            'document' => $document
        ]);
    }
    
    /**
     * Get documents for the authenticated student
     */
    public function stagiaireDocuments(Request $request)
    {
        try {
            // Get the authenticated student
            $stagiaire = $request->user();
            
            // Log the authenticated user
            Log::info('Authenticated user', ['user' => $stagiaire]);
            
            // Get the student's stage
            $stage = $stagiaire->stage;
            
            if (!$stage) {
                Log::info('No stage found for student', ['student_id' => $stagiaire->id]);
                return response()->json(['documents' => [], 'message' => 'Aucun stage trouvé']);
            }
            
            Log::info('Stage found', ['stage_id' => $stage->id]);
            
            // Get documents related to the student's stage
            $documents = Document::where('stage_id', $stage->id)->get();
            
            return response()->json(['documents' => $documents]);
        } catch (\Exception $e) {
            Log::error('Error fetching student documents', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Erreur lors de la récupération des documents: ' . $e->getMessage()], 500);
        }
    }
    
    /**
     * Upload a document for the authenticated student
     */
    public function stagiaireUpload(Request $request)
    {
        // Log the request data for debugging
        Log::info('Document upload request', [
            'all' => $request->all(),
            'files' => $request->allFiles(),
            'has_file' => $request->hasFile('file'),
            'content_type' => $request->header('Content-Type')
        ]);
        
        $validator = Validator::make($request->all(), [
            'type' => 'required|string|max:255',
            'file' => 'required|file|max:10240', // 10MB max
        ]);

        if ($validator->fails()) {
            Log::error('Document upload validation failed', ['errors' => $validator->errors()]);
            return response()->json(['errors' => $validator->errors()], 422);
        }
        
        // Get the authenticated student
        $stagiaire = $request->user();
        
        // Get the student's stage
        $stage = $stagiaire->stage;
        
        if (!$stage) {
            return response()->json(['error' => 'Vous devez d\'abord créer un stage'], 422);
        }
        
        try {
            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('documents', $fileName);
            
            Log::info('File stored', ['path' => $path, 'fileName' => $fileName]);
            
            $document = Document::create([
                'stage_id' => $stage->id,
                'type' => $request->type,
                'nom_fichier' => $fileName,
                'date_depot' => now(),
                'status' => 'en_attente',
            ]);
            
            return response()->json(['message' => 'Document créé avec succès', 'document' => $document], 201);
        } catch (\Exception $e) {
            Log::error('Error creating document', ['error' => $e->getMessage()]);
            return response()->json(['error' => 'Erreur lors de la création du document: ' . $e->getMessage()], 500);
        }
    }
    
    /**
     * Delete a document for the authenticated student
     */
    public function stagiaireDeleteDocument(Request $request, $id)
    {
        // Get the authenticated student
        $stagiaire = $request->user();
        
        // Get the student's stage
        $stage = $stagiaire->stage;
        
        if (!$stage) {
            return response()->json(['error' => 'Stage non trouvé'], 404);
        }
        
        // Find the document and ensure it belongs to the student's stage
        $document = Document::where('id', $id)
            ->where('stage_id', $stage->id)
            ->firstOrFail();
        
        // Delete the physical file
        if (Storage::exists('documents/' . $document->nom_fichier)) {
            Storage::delete('documents/' . $document->nom_fichier);
        }
        
        $document->delete();
        
        return response()->json(['message' => 'Document supprimé avec succès']);
    }
}
