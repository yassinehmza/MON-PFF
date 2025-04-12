<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
// No need to import these classes as they're in the same namespace

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        $this->call([
            StagiaireSeeder::class,
            AdministrateurSeeder::class,
        FormateurSeeder::class,
    ]);
}

}
