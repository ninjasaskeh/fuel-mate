import React, { useState, useEffect } from "react";
import Modal from "@/Components/Modal"; // Ensure you have the Modal component
import axios from "axios";
import { toast } from "react-toastify";

const PurchaseModal = ({ show, onClose, barang }) => {
    const [quantity, setQuantity] = useState(1); // Initialize quantity state
    const [totalPrice, setTotalPrice] = useState(barang.price); // Initialize total price based on item price
    const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation modal

    if (!barang) return null; // If no barang, don't render modal

    // Update total price whenever quantity changes
    useEffect(() => {
        setTotalPrice(barang.price * quantity);
    }, [quantity, barang.price]);

    const handlePurchase = async () => {
        console.log("Attempting to purchase..."); // Debug log
        try {
            const response = await axios.post("/transaksi", {
                barang_id: barang.id,
                quantity: quantity,
            });
            console.log("Response from API:", response.data); // Log the response

            // Check if the response contains total_price
            if (response.data.total_price !== undefined) {
                setTotalPrice(response.data.total_price); // Set total price for confirmation modal
                setShowConfirmation(true); // Show confirmation modal
                console.log("Confirmation modal should now show."); // Debug log
                // Do NOT call onClose() here to keep the purchase modal open
            } else {
                toast.error("Total harga tidak ditemukan dalam respons.");
            }
        } catch (error) {
            console.error("Error purchasing barang:", error);
            // Handle different error types
            if (error.response) {
                toast.error(
                    error.response.data.error ||
                        "Terjadi kesalahan saat melakukan transaksi."
                );
            } else if (error.request) {
                toast.error("Tidak ada respon dari server.");
            } else {
                toast.error("Terjadi kesalahan pada permintaan.");
            }
        }
    };

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleConfirmationClose = () => {
        setShowConfirmation(false); // Close confirmation modal
        toast.success("Transaksi berhasil dilakukan!"); // Show success toast
        onClose(); // Close purchase modal after confirmation
    };

    return (
        <>
            <Modal show={show} onClose={onClose}>
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Beli {barang.name}
                    </h2>
                    <img
                        src={barang.image_url}
                        alt={barang.name}
                        className="object-cover w-full h-32 mt-4 rounded-md"
                    />
                    <p className="mt-2">Harga per item: Rp {barang.price}</p>
                    <div className="flex items-center mt-4">
                        <button
                            onClick={decreaseQuantity}
                            className="px-2 py-1 text-white bg-red-500 rounded"
                        >
                            -
                        </button>
                        <span className="mx-4 text-lg">{quantity}</span>
                        <button
                            onClick={increaseQuantity}
                            className="px-2 py-1 text-white bg-green-500 rounded"
                        >
                            +
                        </button>
                    </div>
                    <p className="mt-4 text-lg font-bold">
                        Total Harga: Rp {totalPrice}
                    </p>
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={handlePurchase}
                            className="px-4 py-2 text-white bg-blue-500 rounded"
                        >
                            Bayar
                        </button>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 ml-2 text-gray-700 bg-gray-300 rounded"
                        >
                            Batal
                        </button>
                    </div>
                </div>
            </Modal>

            {/* Confirmation Modal */}
            {showConfirmation && (
                <Modal
                    show={showConfirmation}
                    onClose={handleConfirmationClose}
                >
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Pembelian Berhasil!
                        </h2>
                        <p className="mt-2">
                            Anda telah membeli {quantity} {barang.name}.
                        </p>
                        <p className="mt-2">Total Harga: Rp {totalPrice}</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={handleConfirmationClose}
                                className="px-4 py-2 text-white bg-blue-500 rounded"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default PurchaseModal;
