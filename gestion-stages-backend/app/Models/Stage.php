<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stage extends Model
{
    use HasFactory;

    protected $table = 'stages';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id_stagiaire',
        'id_formateur',
        'id_entreprise',
        'date_debut',
        'date_fin',
        'description',
        'evaluation',
        'encadrant_entreprise',
        'contact_encadrant'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date_debut' => 'date',
        'date_fin' => 'date',
    ];

    /**
     * Get the stagiaire that owns the stage.
     */
    public function stagiaire()
    {
        return $this->belongsTo(Stagiaire::class, 'id_stagiaire');
    }

    /**
     * Get the formateur that supervises the stage.
     */
    public function formateur()
    {
        return $this->belongsTo(Formateur::class, 'id_formateur');
    }

    /**
     * Get the entreprise where the stage takes place.
     */
    public function entreprise()
    {
        return $this->belongsTo(Entreprise::class, 'id_entreprise');
    }

    /**
     * Get the documents for the stage.
     */
    public function documents()
    {
        return $this->hasMany(Document::class, 'stage_id');
    }

    /**
     * Update the status of the stage.
     */
    public function updateStatus(string $status)
    {
        // Logic to update status
        return $this->update(['status' => $status]);
    }

    /**
     * Assign a formateur to the stage.
     */
    public function assignFormateur(Formateur $formateur)
    {
        return $this->update(['id_formateur' => $formateur->id]);
    }
}