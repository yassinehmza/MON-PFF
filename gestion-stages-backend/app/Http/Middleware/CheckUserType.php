<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserType
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $userType): Response
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Non authentifié'], 401);
        }

        // Check if the user is of the correct type based on the model class
        $modelMap = [
            'administrateur' => 'App\Models\Administrateur',
            'stagiaire' => 'App\Models\Stagiaire',
            'formateur' => 'App\Models\Formateur',
        ];

        if (!isset($modelMap[$userType]) || !($user instanceof $modelMap[$userType])) {
            return response()->json(['message' => 'Accès non autorisé'], 403);
        }

        return $next($request);
    }
}
