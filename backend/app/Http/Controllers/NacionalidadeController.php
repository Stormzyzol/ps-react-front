<?php

namespace App\Http\Controllers;

use App\Models\Nacionalidade;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNacionalidadeRequest;
use App\Http\Requests\UpdateNacionalidadeRequest;
use Illuminate\Http\Request;


class NacionalidadeController extends Controller
{
    private Nacionalidade $nacionalidade;

    public function __construct(Nacionalidade $nacionalidade){
        $this->nacionalidade = $nacionalidade;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $nacionalidade = $this->nacionalidade->with('jogadores')->when($request->search, function ($query) use ($request){
            $query->where('nome','like','%'.$request->search.'%');
        })
        ->paginate(10);
        return response()->json($nacionalidade);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNacionalidadeRequest $request)
    {
        $data = $request->validated();
        $nacionalidade = $this->nacionalidade->create($data);
        return response()->json($nacionalidade);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $nacionalidade = $this->nacionalidade->with('jogadores')->find($id);
        return response()->json($nacionalidade);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNacionalidadeRequest $request, int $id)
    {
      
        $data = $request->validated();
        $nacionalidade = $this->nacionalidade->findOrFail($id);
        $nacionalidade->update($data);
        return response()->json($nacionalidade);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $this->nacionalidade->newQuery()->findOrFail($id)->delete();
        return response()->json("deletado",200);
    }
}
