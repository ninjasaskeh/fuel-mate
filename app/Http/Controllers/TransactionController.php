<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use App\Models\Transaksi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function store(Request $request)
    {
        // Validasi input
        $request->validate([
            'barang_id' => 'required|exists:barangs,id',
            'quantity' => 'required|integer|min:1',
        ]);

        // Log request data for debugging
        Log::info('Request data:', $request->all());

        // Ambil barang berdasarkan ID
        $barang = Barang::find($request->barang_id);

        if (!$barang) {
            return response()->json(['error' => 'Barang not found'], 404);
        }

        // Ensure the quantity is an integer
        $quantity = intval($request->quantity);

        // Calculate total price as integer
        $totalPrice = intval($barang->price * $quantity); // Use intval() to force integer

        // Log barang and totalPrice for debugging
        Log::info('Barang:', $barang->toArray()); // Convert to array
        Log::info('Total price:', ['total_price' => $totalPrice]); // Log total price as an array

        // Ensure the user is authenticated
        if (!auth()->check()) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        // Buat transaksi baru
        $transaksi = Transaksi::create([
            'user_id' => auth()->id(),
            'barang_id' => $request->barang_id,
            'quantity' => $quantity,
            'total_price' => $totalPrice,
        ]);

        // Return response with message and total_price
        return response()->json(
            [
                'message' => 'Transaksi berhasil dilakukan!',
                'total_price' => $totalPrice, // Include total_price in the response
            ],
            201,
        );

    }
    public function index()
{
    // Fetch all transactions, including the related user and barang
    $transactions = Transaksi::with(['barang', 'user'])
        // ->where('user_id', auth()->id())// Include user relationship
        ->orderBy('created_at', 'desc')
        ->get();

    return Inertia::render('Admin/Transaction', ['transactions' => $transactions]);
}

}
