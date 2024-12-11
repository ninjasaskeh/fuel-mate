import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { ToastContainer } from "react-toastify";
import UploadData from "./mod/UploadData"; // Pastikan path ini benar
import DeleteData from "./mod/DeleteData"; // Pastikan path ini benar
import axios from "axios";

export default function Index({ barangs }) {
    const [barangList, setBarangList] = useState(barangs); // State untuk menyimpan daftar barang
    const [isModalOpen, setIsModalOpen] = useState(false); // State untuk modal tambah/edit
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State untuk modal hapus
    const [documentToDelete, setDocumentToDelete] = useState(null);
    const [documentNameToDelete, setDocumentNameToDelete] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        image_url: "",
    });
    const [isEditing, setIsEditing] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
        setIsEditing(false);
        setFormData({ name: "", price: "", description: "", image_url: "" }); // Reset form
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openDeleteModal = (id, name) => {
        setDocumentToDelete(id);
        setDocumentNameToDelete(name);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleEdit = (barang) => {
        setFormData(barang); // Set formData dengan data barang yang akan diedit
        setIsEditing(true); // Set isEditing ke true
        setIsModalOpen(true); // Buka modal
    };

    const reloadTable = async () => {
        try {
            const response = await axios.get("/admin/barangs"); // Ganti dengan endpoint yang sesuai
            setBarangList(response.data); // Update daftar barang
        } catch (error) {
            console.error("Error fetching barangs:", error);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin
                </h2>
            }
        >
            <Head title="Daftar Barang" />

            <div className="py-5">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 mb-4">
                        <PrimaryButton className="py-3" onClick={openModal}>
                            Tambah Barang
                        </PrimaryButton>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">
                                            Nama Barang
                                        </th>
                                        <th className="px-4 py-2 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">
                                            Harga
                                        </th>
                                        <th className="px-4 py-2 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">
                                            Deskripsi
                                        </th>
                                        <th className="px-4 py-2 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">
                                            Gambar
                                        </th>
                                        <th className="px-4 py-2 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {barangList.map((barang) => (
                                        <tr
                                            key={barang.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                                {barang.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {barang.price}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {barang.description}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                {barang.image_url ? (
                                                    <img
                                                        src={barang.image_url}
                                                        alt={barang.name}
                                                        className="object-cover w-16 h-16"
                                                    />
                                                ) : (
                                                    "Tidak ada gambar"
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm">
                                                <button
                                                    onClick={() =>
                                                        handleEdit(barang)
                                                    } // Panggil handleEdit dengan barang yang dipilih
                                                    className="mr-4 text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        openDeleteModal(
                                                            barang.id,
                                                            barang.name
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal untuk Menambah atau Mengedit Barang */}
            <UploadData
                show={isModalOpen}
                onClose={closeModal}
                reloadTable={reloadTable} // Pass reloadTable to UploadData
                formData={formData}
                setFormData={setFormData}
                isEditing={isEditing}
            />

            {/* Modal untuk Menghapus Barang */}
            {isDeleteModalOpen && (
                <DeleteData
                    show={isDeleteModalOpen}
                    onClose={closeDeleteModal}
                    documentName={documentNameToDelete}
                    deletingDocumentId={documentToDelete}
                    reloadTable={reloadTable} // Pass reloadTable to DeleteData if needed
                />
            )}

            <ToastContainer />
        </AuthenticatedLayout>
    );
}
