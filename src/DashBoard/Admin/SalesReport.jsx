import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import DataTable from "react-data-table-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { CSVLink } from "react-csv";
import * as XLSX from "xlsx";
import useAxiosSecure from "../../components/Hooks/useAxiosSecure ";
import useAuth from "../../components/Hooks/useAuth";
import { Helmet } from "react-helmet";


const SalesReport = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const {
        data: PaymentData = [],
        isLoading,
        error,

    } = useQuery({
        queryKey: ["payment", user?.email],
        enabled: !!user && !!user?.email,
        queryFn: async () => {
            try {
                const { data } = await axiosSecure.get(`/getAllBooking`);
                return data;
            } catch (error) {
                console.error("Error fetching category data:", error);
                throw error;
            }
        },
    });

    const filteredData = useMemo(() => {
        if (!startDate || !endDate) return PaymentData;
        return PaymentData.filter(booking => {
            const bookingDate = new Date(booking.date);
            return bookingDate >= startDate && bookingDate <= endDate;
        });
    }, [startDate, endDate, PaymentData]);

    const columns = [
        { name: 'Medicine Name', selector: row => row.cartData.map(item => item.name).join(", ") },
        {
            name: 'Seller Email',
            selector: row => {
                const uniqueEmails = [...new Set(row.cartData.map(item => item.sellerEmail || "Unavailable"))];
                return uniqueEmails.join(", ");
            }
        },
        { name: 'Buyer Email', selector: row => row.email },
        { name: 'Total Price', selector: row => `$${row.totalAmount.toFixed(2)}`, sortable: true },
        { name: 'Transaction ID', selector: row => row.transactionId },
        { name: 'Payment Status', selector: row => row.paymentStatus },
        { name: 'Date', selector: row => new Date(row.date).toLocaleDateString(), sortable: true },
    ];


    const exportExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredData.map(booking => ({
            'Medicine Name': booking.cartData.map(item => item.name).join(", "),
            'Seller Email': [...new Set(booking.cartData.map(item => item.sellerEmail || "Unavailable"))].join(", "),
            'Buyer Email': booking.email,
            'Total Price': `$${booking.totalAmount.toFixed(2)}`,
            'Transaction ID': booking.transactionId,
            'Payment Status': booking.paymentStatus,
            'Date': new Date(booking.date).toLocaleDateString()
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sales Report");
        XLSX.writeFile(wb, "sales_report.xlsx");
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

    return (
        <div>
            <Helmet>
                <title>Multi-Vendor||salesReport</title>
            </Helmet>
            <h1 className="text-center text-2xl font-bold mb-4">Sales Report</h1>
            <div className="flex justify-center mb-4">
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                    className="mr-2"
                />
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="End Date"
                />
            </div>
            <div className="flex justify-center mb-4">

                <CSVLink data={filteredData} filename={"sales_report.csv"} className="btn mr-2">Export CSV</CSVLink>
                <button onClick={exportExcel} className="btn">Export Excel</button>
            </div>
            <DataTable
                columns={columns}
                data={filteredData}
                pagination
                highlightOnHover
            />
        </div>
    );
};

export default SalesReport;
