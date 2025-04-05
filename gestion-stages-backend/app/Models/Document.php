<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;

    protected $table = 'documents';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'stage_id',
        'type',
        'nom_fichier',
        'date_depot',
        'status',
        'commentaire'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date_depot' => 'datetime',
    ];

    /**
     * Get the stage that owns the document.
     */
    public function stage()
    {
        return $this->belongsTo(Stage::class, 'stage_id');
    }

    /**
     * Upload a file.
     */
    public function uploadFile($file)
    {
        // Logic to upload file
        $fileName = time() . '_' . $file->getClientOriginalName();
        $file->storeAs('documents', $fileName);
        
        return $this->update(['nom_fichier' => $fileName]);
    }

    /**
     * Download a file.
     */
    public function downloadFile()
    {
        // Logic to download file
        return storage_path('app/documents/' . $this->nom_fichier);
    }

    /**
     * Validate a file.
     */
    public function validateFile(string $status, string $commentaire = null)
    {
        return $this->update([
            'status' => $status,
            'commentaire' => $commentaire
        ]);
    }
}