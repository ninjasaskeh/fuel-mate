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
            'name' => 'BP Ultimate	',
            'price' => 13340,
            'description' => 'BP Ultimate adalah bahan bakar premium dari BP yang dirancang untuk meningkatkan kinerja dan efisiensi mesin.',
            'image_url' => 'https://raw.githubusercontent.com/ninjasaskeh/fuel-mate/refs/heads/main/public/icons/bp_ultimate.png'
        ]);

        Barang::create([
            'name' => 'BP 92',
            'price' => 12290,
            'description' => 'BP 92 adalah jenis bahan bakar bensin yang ditawarkan oleh BP dengan angka oktan 92.',
            'image_url' => 'https://raw.githubusercontent.com/ninjasaskeh/fuel-mate/refs/heads/main/public/icons/bp_92.png'
        ]);
        Barang::create([
            'name' => 'BP Ultimate Diesel',
            'price' => 13900,
            'description' => 'BP Ultimate Diesel adalah bahan bakar diesel premium, dirancang untuk memberikan kinerja optimal pada mesin diesel.',
            'image_url' => 'https://github.com/ninjasaskeh/fuel-mate/blob/main/public/icons/bp_ultimate_diesel.png?raw=true'
        ]);
        Barang::create([
            'name' => 'BP Diesel',
            'price' => 13610,
            'description' => 'BP Diesel menjadi pilihan bagi pengemudi yang menginginkan performa dan efisiensi dalam kendaraan diesel mereka.',
            'image_url' => 'https://github.com/ninjasaskeh/fuel-mate/blob/main/public/icons/bp_diesel.png?raw=true'
        ]);

        // Tambahkan lebih banyak data jika diperlukan
    }
}
