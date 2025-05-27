<?php

namespace App\Http\Controllers;

use App\Models\Formateur;
use App\Models\Stage;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FormateurController extends Controller
{
    /**
     * Return dashboard stats for the formateur.
     */
    public function dashboardStats(Request $request)
    {
        $formateur = $request->user();
        
        // Get stages supervised by this formateur
        $stages = Stage::where('id_formateur', $formateur->id)->get();
        $stagesCount = $stages->count();
        
        // Get documents from these stages
        $stageIds = $stages->pluck('id');
        $documents = Document::whereIn('stage_id', $stageIds)->get();
        
        // Calculate document statistics
        $pendingDocs = $documents->where('statut', 'en_attente')->count();
        $validatedDocs = $documents->where('statut', 'valide')->count();
        $rejectedDocs = $documents->where('statut', 'rejete')->count();
        
        // Get count of unique students
        $studentsCount = $stages->unique('id_stagiaire')->count();
        
        // Get evaluations distribution
        $evaluationsDistribution = $stages->whereNotNull('evaluation')
            ->groupBy('evaluation')
            ->map(function ($items) {
                return count($items);
            });

        return response()->json([
            'total_stages' => $stagesCount,
            'total_students' => $studentsCount,
            'pending_documents' => $pendingDocs,
            'validated_documents' => $validatedDocs,
            'rejected_documents' => $rejectedDocs,
            'evaluations_distribution' => $evaluationsDistribution,
            'documents_per_day' => $this->getDocumentsPerDay($documents),
            'recent_activities' => $this->getRecentActivities($documents)
        ]);
    }

    /**
     * Get document submissions per day for the last 7 days
     */
    private function getDocumentsPerDay($documents)
    {
        $last7Days = collect(range(0, 6))->map(function ($day) {
            return now()->subDays($day)->format('Y-m-d');
        });

        $docsPerDay = $documents
            ->groupBy(function ($doc) {
                return $doc->created_at->format('Y-m-d');
            })
            ->map(function ($docs) {
                return $docs->count();
            });

        return $last7Days->mapWithKeys(function ($date) use ($docsPerDay) {
            return [$date => $docsPerDay[$date] ?? 0];
        })->toArray();
    }

    /**
     * Get recent activities (last 10)
     */
    private function getRecentActivities($documents)
    {
        return $documents
            ->sortByDesc('updated_at')
            ->take(10)
            ->map(function ($doc) {
                return [
                    'id' => $doc->id,
                    'type' => $doc->type,
                    'status' => $doc->statut,
                    'date' => $doc->updated_at->format('Y-m-d'),
                    'stage_id' => $doc->stage_id
                ];
            })
            ->values()
            ->toArray();
    }

    /**
     * Get all active formateurs for stage assignments.
     */
    public function getActiveFormateurs()
    {
        $formateurs = DB::table('formateurs')
            ->select('id', DB::raw("CONCAT(nom, ' ', prenom) AS name"))
            ->orderBy('nom')
            ->get();

        return response()->json(['formateurs' => $formateurs]);
    }

    /**
     * Get stagiaires and their documents for the authenticated formateur
     */
    public function getStagiaires(Request $request)
    {
        $formateur = $request->user();
        
        // Get stages supervised by this formateur with related stagiaires and documents
        $stages = Stage::where('id_formateur', $formateur->id)
            ->with(['stagiaire', 'documents'])
            ->get();
            
        // Transform the data to include all necessary information
        $stagiaires = $stages->map(function ($stage) {
            $stagiaire = $stage->stagiaire;
            return [
                'id' => $stagiaire->id,
                'nom' => $stagiaire->nom,
                'prenom' => $stagiaire->prenom,
                'email' => $stagiaire->email,
                'filiere' => $stagiaire->filiere,
                'niveau' => $stagiaire->niveau,
                'promotion' => $stagiaire->promotion,
                'stage' => [
                    'id' => $stage->id,
                    'date_debut' => $stage->date_debut,
                    'date_fin' => $stage->date_fin,
                    'status' => $stage->status,
                    'description' => $stage->description,
                    'evaluation' => $stage->evaluation,
                ],
                'documents' => $stage->documents->map(function ($doc) {
                    return [
                        'id' => $doc->id,
                        'type' => $doc->type,
                        'nom_fichier' => $doc->nom_fichier,
                        'date_depot' => $doc->date_depot,
                        'status' => $doc->status,
                        'commentaire' => $doc->commentaire
                    ];
                })
            ];
        });

        return response()->json(['stagiaires' => $stagiaires]);
    }
}
