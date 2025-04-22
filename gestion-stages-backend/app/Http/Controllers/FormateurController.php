<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
}
