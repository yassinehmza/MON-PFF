<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Stagiaire extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'stagiaires';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password',
        'filiere',
        'niveau',
        'promotion'
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
     * Get the stages for the stagiaire.
     */
    public function stages()
    {
        return $this->hasMany(Stage::class, 'id_stagiaire');
    }

    /**
     * Update the profile of the stagiaire.
     */
    public function updateProfile(array $data)
    {
        return $this->update($data);
    }

    /**
     * Change the password of the stagiaire.
     */
    public function changePassword(string $password)
    {
        return $this->update(['password' => bcrypt($password)]);
    }

    /**
     * Submit a document.
     */
    public function submitDocument(array $data)
    {
        return $this->stages()->first()->documents()->create($data);
    }

    /**
     * Download a template.
     */
    public function downloadTemplate(string $type)
    {
        // Logic to download template
        return "Template downloaded: {$type}";
    }
}