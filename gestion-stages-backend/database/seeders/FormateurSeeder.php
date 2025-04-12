<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class FormateurSeeder extends Seeder
{
    public function run()
    {
        DB::table('formateurs')->insert([
            'nom' => 'Smith',
            'prenom' => 'Anna',
            'email' => 'anna.formateur@example.com',
            'password' => Hash::make('formateur123'),
            'specialite' => 'Développement Web',
        ]);
    }
}

