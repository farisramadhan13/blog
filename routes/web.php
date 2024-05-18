<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ProfileController;
use Illuminate\Console\Events\ArtisanStarting;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function() {
//     return Inertia::render('Homepage', [
//         'title' => 'Blog',
//         'description' => 'Selamat datang di blog ini'
//     ]);
// });

// Route::get('/welcome', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [ArticleController::class, 'index']);
Route::post('/article', [ArticleController::class, 'store'])->middleware(['auth', 'verified'])->name('create.article');
Route::get('/article', [ArticleController::class, 'show'])->middleware(['auth', 'verified'])->name('my.article');
Route::get('/article/edit', [ArticleController::class, 'edit'])->middleware(['auth', 'verified'])->name('edit.article');
Route::post('/article/update', [ArticleController::class, 'update'])->middleware(['auth', 'verified'])->name('update.article');
Route::post('/article/delete', [ArticleController::class, 'destroy'])->middleware(['auth', 'verified'])->name('delete.article');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
