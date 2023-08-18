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
            $path = $request->file('imagem')->store('imagem', 'public');
            $data['imagem'] = url('storage/' . $path);
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
    public function update(Request $request, int $id)
    {
        $data = $request->all();
        $jogador = $this->jogador->findOrFail($id);
        dd($jogador);
        if($request->hasFile('imagem')){
            Storage::disk('public')->delete($jogador->imagem);
            $path = $request->file('imagem')->store('imagem', 'public');
            $data['imagem'] = url('storage/' . $path);
        }
        $jogador->update($data);
        return response()->json($jogador);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $jogador = $this->jogador->newQuery()->findOrFail($id);
        Storage::disk('public')->delete($jogador->imagem);
        $jogador->delete();
        return 'jogador deletado';
    }
}