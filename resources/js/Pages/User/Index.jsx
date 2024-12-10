import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import PurchaseModal from "./mod/PurchaseModal"; // Modal untuk beli barang

export default function Index({ barangs }) {
    const [barangList, setBarangList] = useState(barangs); // State untuk menyimpan daftar barang
    const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false); // State untuk modal beli
    const [selectedBarang, setSelectedBarang] = useState(null); // Barang yang dipilih untuk dibeli

    const openPurchaseModal = (barang) => {
        setSelectedBarang(barang); // Set barang yang dipilih untuk dibeli
        setIsPurchaseModalOpen(true); // Buka modal beli
    };

    const closePurchaseModal = () => {
        setIsPurchaseModalOpen(false);
        setSelectedBarang(null); // Reset barang yang dipilih
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Daftar Barang
                </h2>
            }
        >
            <Head title="Daftar Barang" />

            <div className="py-5">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {barangList.map((barang) => (
                            <div
                                key={barang.id}
                                className="max-w-md mx-auto overflow-hidden rounded-md shadow-md hover:shadow-lg"
                            >
                                <div className="relative">
                                    <img
                                        className="w-full"
                                        src={barang.image_url}
                                        alt={barang.name}
                                    />
                                    <div className="absolute top-0 right-0 px-2 py-1 m-2 text-sm font-medium text-white bg-red-500 rounded-md">
                                        SALE
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="mb-2 text-lg font-medium">
                                        {barang.name}
                                    </h3>
                                    <p className="mb-4 text-sm text-gray-600">
                                        {barang.description}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold">
                                            Rp {barang.price}
                                        </span>
                                        <button
                                            onClick={() =>
                                                openPurchaseModal(barang)
                                            }
                                            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
                                        >
                                            Beli
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal untuk Pembelian Barang */}
            {isPurchaseModalOpen && (
                <PurchaseModal
                    show={isPurchaseModalOpen}
                    onClose={closePurchaseModal}
                    barang={selectedBarang}
                />
            )}

            <ToastContainer />
        </AuthenticatedLayout>
    );
}