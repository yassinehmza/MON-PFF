<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class StagiaireSeeder extends Seeder
{
    public function run()
    {
        DB::table('stagiaires')->insert([
            'nom' => 'Doe',
            'prenom' => 'John',
            'email' => 'john.stagiaire@example.com',
            'password' => Hash::make('password123'),
            'filiere' => 'Informatique',
            'niveau' => 'Bac+2',
            'promotion' => '2023',
        ]);
    }
}
