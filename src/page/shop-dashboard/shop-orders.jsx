import React, { useState, useEffect, useRef } from 'react';
import useFetchData from '@hooks/useFetchData';
import { FiSettings, FiEdit, FiTrash2 } from 'react-icons/fi';
import { vietnameseDate } from '../../util/getDateInVietnamese';
import logo from '../../assets/logo-transparent.png';

function Orders() {
    const [showActionMenu, setShowActionMenu] = useState(null);
    const actionMenuRef = useRef(null);
    const { data } = useFetchData(`/orders`);

    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;
    const totalPages = Math.ceil((data?.data.length || 0) / ordersPerPage);

    const toggleActionMenu = (id) => {
        setShowActionMenu(showActionMenu === id ? null : id);
    };

    const paginateData = () => {
        const startIndex = (currentPage - 1) * ordersPerPage;
        return data?.data.slice(startIndex, startIndex + ordersPerPage);
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                actionMenuRef.current &&
                !actionMenuRef.current.contains(event.target)
            ) {
                setShowActionMenu(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="px-8 pt-8 pb-5 bg-gray-100 w-full min-h-screen flex flex-col">
            <div className="flex justify-between items-center mb-8 bg-[#FAFAFC] rounded-xl shadow-md">
                <div className="flex items-center space-x-4">
                    <img src={logo} alt="Logo" className="w-16" />
                    <h1 className="text-2xl font-bold text-[#5789cf]">
                        Quản Lý Đặt Hàng
                    </h1>
                </div>
                <p className="text-gray-600 text-lg">{vietnameseDate}</p>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden flex-1">
                <div className="overflow-x-auto">
                    <table className="w-full table-fixed">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-4">ID</th>
                                <th className="p-4">Total Amount</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Order Items</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                    </table>

                    <div className="max-h-[400px] overflow-y-auto">
                        <table className="w-full table-fixed">
                            <tbody>
                                {paginateData()?.map((order, index) => (
                                    <tr
                                        key={order.id}
                                        className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
                                    >
                                        <td className="p-4">{order.id}</td>
                                        <td className="p-4">
                                            ${order.total_amount}
                                        </td>
                                        <td className="p-4">
                                            {new Date(
                                                order.createdAt,
                                            ).toLocaleDateString()}
                                        </td>
                                        <td className="p-4">
                                            <span
                                                className={`px-2 py-1 rounded-full text-white text-sm ${
                                                    order.status === 'Pending'
                                                        ? 'bg-red-500'
                                                        : order.status ===
                                                            'Dispatch'
                                                          ? 'bg-blue-500'
                                                          : 'bg-green-500'
                                                }`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {order.OrderItems.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center mb-2"
                                                >
                                                    <img
                                                        src={
                                                            item.Product
                                                                .image ||
                                                            'https://product.hstatic.net/200000263355/product/z4431095005129_5ae326bc61106bba8c85799a3e176128_f58eeb18c4fb45898b2283344b1c7cf5_master.jpg'
                                                        }
                                                        alt={item.Product.name}
                                                        className="w-8 h-8 mr-2 rounded"
                                                    />
                                                    <div>
                                                        <p className="font-semibold">
                                                            {item.Product.name}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            {item.quantity} x $
                                                            {item.unit_price} =
                                                            ${item.subtotal}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </td>

                                        <td
                                            className="p-4 relative"
                                            ref={actionMenuRef}
                                        >
                                            <button
                                                onClick={() =>
                                                    toggleActionMenu(order.id)
                                                }
                                                className="text-gray-500 hover:text-blue-500"
                                            >
                                                <FiSettings className="w-5 h-5" />
                                            </button>
                                            {showActionMenu === order.id && (
                                                <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg z-10">
                                                    <button
                                                        onClick={() =>
                                                            alert(
                                                                `Edit ${order.id}`,
                                                            )
                                                        }
                                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        <FiEdit className="mr-2" />
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            alert(
                                                                `Delete ${order.id}`,
                                                            )
                                                        }
                                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        <FiTrash2 className="mr-2" />
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 rounded-l hover:bg-gray-400 disabled:opacity-50"
                >
                    Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 ${
                            currentPage === index + 1
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded-r hover:bg-gray-400 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Orders;
