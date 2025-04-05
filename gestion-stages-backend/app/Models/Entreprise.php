<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entreprise extends Model
{
    use HasFactory;

    protected $table = 'entreprises';
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nom',
        'adresse',
        'ville',
        'pays',
        'secteur',
        'telephone',
        'email',
        'contact_nom'
    ];

    /**
     * Get the stages that take place in this entreprise.
     */
    public function stages()
    {
        return $this->hasMany(Stage::class, 'id_entreprise');
    }

    /**
     * Update the information of the entreprise.
     */
    public function updateInfo(array $data)
    {
        return $this->update($data);
    }
}