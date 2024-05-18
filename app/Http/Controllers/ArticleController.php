<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArticleCollection;
use App\Models\article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $article = new ArticleCollection(article::OrderByDesc('id')->paginate(8));
        return Inertia::render('Homepage', [
            'title' => 'Blog',
            'description' => 'Selamat datang di blog ini',
            'article' => $article,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $article = new article();
        $article->title = $request->title;
        $article->description = $request->description;
        $article->category = $request->category;
        $article->author = auth()->user()->email;
        $article->save();
        return redirect()->back()->with('message', 'berita berhasil dibuat');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\article  $article
     * @return \Illuminate\Http\Response
     */
    public function show(article $article)
    {
        $myArticle = $article::where('author', auth()->user()->email)->get();
        return Inertia::render('Dashboard', [
            'myArticle' => $myArticle,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\article  $article
     * @return \Illuminate\Http\Response
     */
    public function edit(article $article, Request $request)
    {
        return Inertia::render('EditArticle', [
            'myArticle' => $article->find($request->id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\article  $article
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        article::where('id', $request->id)->update([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
        ]);
        return to_route('dashboard');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\article  $article
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $article = article::find($request->id);
        $article->delete();
        return redirect()->back()->with('message', 'berita berhasil dihapus');
    }
}
