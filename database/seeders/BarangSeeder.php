<?php

namespace Database\Seeders;

use App\Models\Barang;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BarangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Barang::create([
            'name' => 'Bensin Premium',
            'price' => 10000,
            'description' => 'Bensin berkualitas tinggi untuk kendaraan Anda.',
            'image_url' => 'https://example.com/images/bensin-premium.jpg'
        ]);

        Barang::create([
            'name' => 'Bensin Pertamax',
            'price' => 12500,
            'description' => 'Bensin dengan oktan tinggi untuk performa maksimal.',
            'image_url' => 'https://example.com/images/bensin-pertamax.jpg'
        ]);

        // Tambahkan lebih banyak data jika diperlukan
    }
}
