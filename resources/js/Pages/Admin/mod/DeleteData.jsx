import React from "react";
import Modal from "@/Components/Modal"; // Pastikan Anda memiliki komponen Modal
import PrimaryButton from "@/Components/PrimaryButton"; // Pastikan Anda memiliki komponen PrimaryButton
import axios from "axios";
import { toast } from "react-toastify";

const DeleteData = ({
    show,
    onClose,
    documentName,
    deletingDocumentId,
    reloadTable,
}) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`/admin/barang/${deletingDocumentId}`); // Hapus barang dari server
            toast.success("Barang berhasil dihapus!"); // Tampilkan notifikasi
            reloadTable(); // Panggil reloadTable setelah berhasil menghapus
            onClose(); // Tutup modal
        } catch (error) {
            toast.error("Terjadi kesalahan saat menghapus barang.", {
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800">
                    Hapus Barang
                </h2>
                <p className="mt-2 text-gray-600">
                    Apakah Anda yakin ingin menghapus <b>"{documentName}"</b>?
                </p>
                <div className="flex justify-end mt-4">
                    <PrimaryButton onClick={onClose} className="mr-2">
                        Batal
                    </PrimaryButton>
                    <PrimaryButton
                        onClick={handleDelete}
                        className="bg-red-600"
                    >
                        Hapus
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteData;
