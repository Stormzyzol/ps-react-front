<?php

namespace App\Http\Controllers;

use App\Models\Jogador;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJogadorRequest;
use App\Http\Requests\UpdateJogadorRequest;
use App\Models\Nacionalidade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class JogadorController extends Controller
{
    private Jogador $jogador;

    public function __construct(Jogador $jogador){
        $this->jogador = $jogador;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $jogador = $this->jogador->with('nacionalidades')->when($request->search, function ($query) use ($request){
            $query->where('nome','like','%'.$request->search.'%')->orWhere('idade',$request->search);
        })
        ->paginate(10);

        return response()->json($jogador);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJogadorRequest $request)
    {
      
        $data = $request->validated();
        if($request->hasFile('imagem')){
            $data['imagem'] = $request->file('imagem')->store('imagem', 'public');
        }
        $jogador = $this->jogador->create($data);
        return response()->json($jogador);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $jogador = $this->jogador->with('nacionalidades')->find($id);
        return response()->json($jogador);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJogadorRequest $request, Jogador $jogador)
    {
        $data = $request->validated();
        if($request->hasFile('imagem')){
            Storage::disk('public')->delete($jogador->imagem);
            $data['imagem'] = $request->file('imagem')->store('imagem', 'public');
        }
        $jogador->update($data);
        return response()->json($jogador);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jogador $jogador)
    {
        Storage::disk('public')->delete($jogador->imagem);
        $jogador->delete();
        return 'jogador deletado';
    }
}