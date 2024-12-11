// utils/formatCurrency.js

export const formatCurrency = (amount) => {
    // Ensure the amount is a number
    if (isNaN(amount)) return "Rp 0";

    // Convert the amount to a number, round it, and format it as IDR without decimals
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0, // No decimal places
        maximumFractionDigits: 0, // No decimal places
    }).format(Math.round(amount)); // Round the amount to the nearest integer
};
