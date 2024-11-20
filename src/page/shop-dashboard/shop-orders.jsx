import React, { useState, useEffect, useMemo } from 'react';
import useFetchData from '@hooks/useFetchData';
import { vietnameseDate } from '../../util/getDateInVietnamese';
import logo from '../../assets/logo-transparent.png';

function Orders() {
    const [currentPage, setCurrentPage] = useState(1);
    const [skip, setSkip] = useState(0);
    const [statusDropdown, setStatusDropdown] = useState(null);

    const ROWS_PER_PAGE = 10;
    const params = useMemo(() => ({ limit: ROWS_PER_PAGE, skip }), [skip]);
    const { data, loading, error } = useFetchData(`/orders`, params);

    const totalPages = useMemo(() => {
        return Math.ceil((data?.pagination?.totalItems || 0) / ROWS_PER_PAGE);
    }, [data]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setSkip((pageNumber - 1) * ROWS_PER_PAGE);
    };

    const toggleStatusDropdown = (id) => {
        setStatusDropdown(statusDropdown === id ? null : id);
    };

    const handleStatusChange = (id, newStatus) => {
        console.log(`Cập nhật đơn hàng ${id} trạng thái thành ${newStatus}`);
        setStatusDropdown(null);
    };

    return (
        <div className="px-8 pt-8 pb-5 bg-gray-100 w-full h-[100vh]  max-h-screen flex flex-col">
            <div className="flex justify-between items-center mb-8 bg-[#FAFAFC] p-6 rounded-xl shadow-md">
                <div className="flex items-center space-x-4">
                    <img src={logo} alt="Logo" className="w-16" />
                    <h1 className="text-2xl font-bold text-[#5789cf]">
                        Quản Lý Đơn Hàng
                    </h1>
                </div>
                <p className="text-gray-600 text-lg">{vietnameseDate}</p>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden flex-1">
                <div className="overflow-x-auto">
                    <table className="w-full table-fixed">
                        <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="p-4">Mã Đơn Hàng</th>
                                <th className="p-4">Tổng Tiền</th>
                                <th className="p-4">Ngày</th>
                                <th className="p-4">Trạng Thái</th>
                                <th className="p-4">Sản Phẩm Đã Đặt</th>
                            </tr>
                        </thead>
                    </table>

                    <div className="max-h-[400px] overflow-y-auto">
                        <table className="w-full table-fixed">
                            <tbody>
                                {data?.data.map((order, index) => (
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
                                        <td className="p-4 relative">
                                            <button
                                                onClick={() =>
                                                    toggleStatusDropdown(
                                                        order.id,
                                                    )
                                                }
                                                className={`px-2 py-1 rounded-full text-white text-sm ${
                                                    order.status === 'Pending'
                                                        ? 'bg-red-500'
                                                        : order.status ===
                                                            'Processing'
                                                          ? 'bg-blue-500'
                                                          : 'bg-green-500'
                                                }`}
                                            >
                                                {order.status === 'Pending'
                                                    ? 'Chờ Xử Lý'
                                                    : order.status ===
                                                        'Processing'
                                                      ? 'Đang Xử Lý'
                                                      : 'Hoàn Thành'}
                                            </button>
                                            {statusDropdown === order.id && (
                                                <div className="absolute mt-2 w-32 bg-white shadow-lg rounded-lg z-10">
                                                    {[
                                                        'Chờ Xử Lý',
                                                        'Đang Xử Lý',
                                                        'Hoàn Thành',
                                                    ].map((status) => (
                                                        <button
                                                            key={status}
                                                            onClick={() =>
                                                                handleStatusChange(
                                                                    order.id,
                                                                    status,
                                                                )
                                                            }
                                                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                        >
                                                            {status}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4 flex flex-col space-y-2">
                                            {order.OrderItems.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center"
                                                >
                                                    <img
                                                        src={
                                                            item.Product
                                                                .image ||
                                                            'placeholder_image_url'
                                                        }
                                                        alt={item.Product.name}
                                                        className="w-12 h-12 mr-3 rounded"
                                                    />
                                                    <div>
                                                        <p className="font-medium">
                                                            {item.Product.name}
                                                        </p>
                                                        <p>
                                                            {item.quantity} x{' '}
                                                            {parseInt(
                                                                item.unit_price,
                                                            ).toLocaleString()}{' '}
                                                            đ
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center mt-5">
                <p className="text-gray-600">
                    Hiển thị {(currentPage - 1) * ROWS_PER_PAGE + 1} -{' '}
                    {Math.min(
                        currentPage * ROWS_PER_PAGE,
                        data?.pagination?.totalItems,
                    )}{' '}
                    trong số {data?.pagination?.totalItems} đơn hàng
                </p>
                <div className="flex space-x-2">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                                currentPage === index + 1
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 hover:bg-blue-500 hover:text-white'
                            } transition`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Orders;
