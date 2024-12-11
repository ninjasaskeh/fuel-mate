import React, { useState, useEffect } from "react";
import Modal from "@/Components/Modal"; // Pastikan Anda memiliki komponen Modal
import PrimaryButton from "@/Components/PrimaryButton"; // Pastikan Anda memiliki komponen PrimaryButton
import axios from "axios";
import { toast } from "react-toastify";

// Utility function to format number to IDR
const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

export default function UploadData({
    show,
    onClose,
    reloadTable,
    formData,
    setFormData,
    isEditing,
}) {
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!show) {
            setErrors({});
        }
    }, [show]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Handle price input separately to format it
        if (name === "price") {
            // Remove non-numeric characters and set the value as a number
            const numericValue = value.replace(/[^0-9]/g, "");
            setFormData({
                ...formData,
                [name]: numericValue ? parseInt(numericValue, 10) : "",
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({}); // Reset errors

        try {
            let response;

            if (isEditing) {
                response = await axios.put(
                    `/admin/barang/${formData.id}`,
                    formData
                );
                toast.success("Barang berhasil diperbarui!");
            } else {
                response = await axios.post("/admin/barang", formData);
                toast.success("Barang berhasil ditambahkan!");
            }

            reloadTable(); // Panggil reloadTable setelah berhasil menyimpan atau memperbarui
            onClose(); // Tutup modal
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data.errors || {});
            }
            toast.error("Terjadi kesalahan. Silakan coba lagi.", {
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800">
                    {isEditing ? "Edit Barang" : "Tambah Barang"}
                </h2>
                <hr className="my-4 border border-gray-300" />
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Nama Barang
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name || ""}
                            onChange={handleInputChange}
                            required
                            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.name && (
                            <div className="mt-1 text-sm text-red-500">
                                {errors.name[0]}
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Harga
                        </label>
                        <input
                            type="text" // Change to text to allow formatting
                            name="price"
                            value={
                                formData.price
                                    ? formatCurrency(formData.price)
                                    : ""
                            }
                            onChange={handleInputChange}
                            required
                            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.price && (
                            <div className="mt-1 text-sm text-red-500">
                                {errors.price[0]}
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Deskripsi
                        </label>
                        <textarea
                            name="description"
                            value={formData.description || ""}
                            onChange={handleInputChange}
                            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.description && (
                            <div className="mt-1 text-sm text-red-500">
                                {errors.description[0]}
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            URL Gambar
                        </label>
                        <input
                            type="text"
                            name="image_url"
                            value={formData.image_url || ""}
                            onChange={handleInputChange}
                            className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {errors.image_url && (
                            <div className="mt-1 text-sm text-red-500">
                                {errors.image_url[0]}
                            </div>
                        )}
                    </div>

                    <PrimaryButton
                        type="submit"
                        className="w-ful"
                        isLoading={isLoading}
                    >
                        {isEditing ? "Update" : "Simpan"}
                    </PrimaryButton>
                </form>
            </div>
        </Modal>
    );
}
