<?php

namespace App\Http\Controllers;

use App\Models\Barang; // Ganti dengan nama model yang sesuai
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Barang::all(); // Ambil semua produk
        return Inertia::render('User/Index', ['barangs' => $products]);

    }
}
