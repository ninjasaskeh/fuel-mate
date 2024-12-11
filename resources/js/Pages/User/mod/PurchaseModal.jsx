import React, { useState, useEffect } from "react";
import Modal from "@/Components/Modal"; // Ensure you have the Modal component
import axios from "axios";
import { toast } from "react-toastify";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";

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
                        className="w-full mt-4 rounded-md object-fit"
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
                            className="font-black text-white bg-green-500 rounded-full size-8"
                        >
                            +
                        </button>
                    </div>
                    <p className="mt-4 text-lg font-bold">
                        Total Harga: Rp {totalPrice}
                    </p>
                    <div className="flex justify-end mt-4">
                        <PrimaryButton onClick={handlePurchase}>
                            Bayar
                        </PrimaryButton>
                        <SecondaryButton onClick={onClose} className="ml-2">
                            Batal
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>

            {/* Confirmation Modal */}
            {showConfirmation && (
                <Modal
                    show={showConfirmation}
                    onClose={handleConfirmationClose}
                >
                    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
                        <div className="flex flex-col items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="green"
                                className="size-12"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                                    clipRule="evenodd"
                                />
                            </svg>

                            <h2 className="text-lg font-semibold text-gray-800">
                                Pembelian Berhasil!
                            </h2>
                            <p className="mt-2">
                                Anda telah membeli {quantity} {barang.name}.
                            </p>
                            <p className="mt-2">Total Harga: Rp {totalPrice}</p>
                        </div>
                        <div className="flex justify-end mt-4">
                            <PrimaryButton onClick={handleConfirmationClose}>
                                Tutup
                            </PrimaryButton>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default PurchaseModal;
