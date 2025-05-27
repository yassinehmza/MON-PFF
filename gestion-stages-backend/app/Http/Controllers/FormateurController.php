<?php

namespace App\Http\Controllers;

use App\Models\Formateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FormateurController extends Controller
{
    /**
     * Return dashboard stats for the formateur.
     */
    public function dashboardStats(Request $request)
    {
        // Example static stats (replace with real queries as needed)
        return response()->json([
            'total_stages' => 10,
            'pending_documents' => 5,
            'validated_documents' => 3,
            'rejected_documents' => 2,
        ]);
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
}
