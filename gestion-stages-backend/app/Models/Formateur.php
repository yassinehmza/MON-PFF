<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Formateur extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'formateurs';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'prenom',
        'password',
        'specialite'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'password' => 'hashed',
    ];

    /**
     * Get the stages supervised by the formateur.
     */
    public function stages()
    {
        return $this->hasMany(Stage::class, 'id_formateur');
    }

    /**
     * Update the profile of the formateur.
     */
    public function updateProfile(array $data)
    {
        return $this->update($data);
    }

    /**
     * Change the password of the formateur.
     */
    public function changePassword(string $password)
    {
        return $this->update(['password' => bcrypt($password)]);
    }

    /**
     * Get the stagiaires supervised by the formateur.
     */
    public function stagiaires()
    {
        return $this->hasManyThrough(Stagiaire::class, Stage::class, 'id_formateur', 'id', 'id', 'id_stagiaire');
    }

    /**
     * Evaluate a stage.
     */
    public function evaluateStage(Stage $stage, string $evaluation)
    {
        return $stage->update(['evaluation' => $evaluation]);
    }

    /**
     * Validate a document.
     */
    public function validateDocument(Document $document, string $status, string $commentaire = null)
    {
        return $document->update([
            'status' => $status,
            'commentaire' => $commentaire
        ]);
    }
}