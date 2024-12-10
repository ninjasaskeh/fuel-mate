<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaksi extends Model
{
    use HasFactory;

    protected $fillable = [
        'barang_id',   // ID barang yang dibeli
        'quantity',    // Jumlah barang yang dibeli
        'total_price', // Total harga dari transaksi (integer)
        'user_id',     // ID pengguna yang melakukan transaksi
    ];

    // Relasi dengan model Barang
    public function barang()
    {
        return $this->belongsTo(Barang::class);
    }
}
