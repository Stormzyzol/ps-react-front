<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jogador extends Model
{
    use HasFactory;

    protected $table = 'jogadores';
    protected $fillable = [
        'nome',
        'imagem',
        'time',
        'idade',
        'nacionalidade_id'
    ];

    public function nacionalidades(){
        return $this->belongsTo(Nacionalidade::class, 'nacionalidade_id');
    }
}
