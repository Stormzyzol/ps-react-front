<?php

namespace Database\Seeders;

use App\Models\Jogador;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JogadorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Jogador::factory()->count(10)->create();
    }
}
