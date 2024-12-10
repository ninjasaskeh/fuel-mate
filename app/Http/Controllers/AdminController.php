<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{

    // Fungsi untuk mendapatkan semua data barang
    public function getAllBarangs()
    {
        $barangs = Barang::all(); // Ambil semua data barang
        return response()->json($barangs); // Kembalikan data dalam format JSON
    }
    public function index()
    {
        $barangs = Barang::all();
        return Inertia::render('Admin/Index', ['barangs' => $barangs]);
    }
    public function store(Request $request)
    {
        // Validasi data
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|integer', // Pastikan ini sesuai dengan tipe data di database
            'description' => 'nullable|string',
            'image_url' => 'nullable|url',
        ]);

        // Membuat barang baru
        $barang = Barang::create($request->all());

        return response()->json(['success' => true, 'barang' => $barang], 201);
    }

    public function update(Request $request, $id)
    {
        // Validasi data
        $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|integer', // Pastikan ini sesuai dengan tipe data di database
            'description' => 'nullable|string',
            'image_url' => 'nullable|url',
        ]);

        // Temukan barang berdasarkan ID
        $barang = Barang::findOrFail($id);

        // Update data barang
        $barang->update($request->all());

        return response()->json(['success' => true, 'barang' => $barang], 200);
    }

    public function destroy($id)
    {
        $barang = Barang::findOrFail($id);
        $barang->delete();
        return response()->json(['success' => true], 204);
    }
}
