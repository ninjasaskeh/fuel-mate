import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { ToastContainer } from "react-toastify";
import { formatCurrency } from "@/utils/formatCurrency";

export default function TransactionHistory({ transactions }) {
    // Log the transactions to see what is being passed
    console.log("Transactions:", transactions);

    // Ensure transactions is an array
    const transactionList = Array.isArray(transactions) ? transactions : [];

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items to display per page

    // Calculate the index of the first and last transaction on the current page
    const indexOfLastTransaction = currentPage * itemsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
    const currentTransactions = transactionList.slice(
        indexOfFirstTransaction,
        indexOfLastTransaction
    );

    // Log the current transactions to see what is being rendered
    console.log("Current Transactions:", currentTransactions);

    // Calculate total pages
    const totalPages = Math.ceil(transactionList.length / itemsPerPage);

    // Handle page change
    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Riwayat Transaksi
                </h2>
            }
        >
            <Head title="Riwayat Transaksi" />

            <div className="py-5">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">
                                            Tanggal
                                        </th>
                                        <th className="px-4 py-2 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">
                                            Nama Barang
                                        </th>
                                        <th className="px-4 py-2 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">
                                            Jumlah
                                        </th>
                                        <th className="px-4 py-2 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">
                                            Total Harga
                                        </th>
                                        <th className="px-4 py-2 text-xs font-bold tracking-wider text-left text-gray-500 uppercase">
                                            Pembeli
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {currentTransactions.length > 0 ? (
                                        currentTransactions.map(
                                            (transaction) => {
                                                // Log each transaction to see its structure
                                                console.log(
                                                    "Transaction:",
                                                    transaction
                                                );
                                                return (
                                                    <tr
                                                        key={transaction.id}
                                                        className="hover:bg-gray-50"
                                                    >
                                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                            {new Date(
                                                                transaction.created_at
                                                            ).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                                                            {transaction.barang
                                                                ?.name || "N/A"}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                            {
                                                                transaction.quantity
                                                            }
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                            {formatCurrency(
                                                                transaction.total_price
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                                            {transaction.user
                                                                ?.name || "N/A"}
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="5"
                                                className="px-6 py-4 text-sm text-center text-gray-500"
                                            >
                                                Tidak ada transaksi ditemukan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Pagination Controls */}
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Sebelumnya
                        </button>
                        <span>{`Page ${currentPage} of ${totalPages}`}</span>
                        <button
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Selanjutnya
                        </button>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </AuthenticatedLayout>
    );
}
