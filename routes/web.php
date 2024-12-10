<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\TransactionController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/products', [ProductController::class, 'index']);

    // Rute untuk transaksi
    Route::post('/transaksi', [TransactionController::class, 'store']);
    Route::get('/transaksi', [TransactionController::class, 'index']);
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.index');
    Route::get('/admin/barangs', [AdminController::class, 'getAllBarangs']);
    Route::post('/admin/barang', [AdminController::class, 'store'])->name('admin.barang.store');
    Route::put('/admin/barang/{id}', [AdminController::class, 'update'])->name('admin.barang.update');
    Route::delete('/admin/barang/{id}', [AdminController::class, 'destroy'])->name('admin.barang.destroy');
});

require __DIR__ . '/auth.php';
