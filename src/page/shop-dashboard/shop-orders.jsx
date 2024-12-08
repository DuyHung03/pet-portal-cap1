import React, { useState, useEffect, useMemo, useRef } from 'react';
import useFetchData from '@hooks/useFetchData';
import { vietnameseDate } from '../../util/getDateInVietnamese';
import logo from '../../assets/logo-transparent.png';
import { Pagination } from '@mantine/core';
import axiosInstance from '@network/httpRequest';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import Modal from 'react-modal';

function Orders() {
    const [statusDropdown, setStatusDropdown] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [orders, setOrders] = useState([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);
    const [notification, setNotification] = useState(''); // Thông báo sau khi xóa
    const productSectionRef = useRef(null);
    const pageSize = 5;

    const params = useMemo(
        () => ({
            limit: pageSize,
            page: page,
        }),
        [page],
    );

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axiosInstance.get('/orders/paniagated', {
                    params: params,
                });
                setOrders(response.data.data);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Lỗi khi tải đơn hàng:', error);
            }
        };

        fetchOrders();
    }, [params]);

    useEffect(() => {
        if (orders && orders.length > 0 && productSectionRef.current) {
            productSectionRef.current.scrollIntoView({
                behavior: 'smooth',
            });
        }
    }, [orders, page]);

    const toggleStatusDropdown = (id) => {
        setStatusDropdown(statusDropdown === id ? null : id);
    };

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            const response = await axiosInstance.put(`/orders/${orderId}`, {
                status: newStatus,
            });
            return response.data;
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái:', error);
            throw error;
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const updatedOrder = await updateOrderStatus(id, newStatus);

            if (updatedOrder) {
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order.id === id
                            ? { ...order, status: newStatus }
                            : order,
                    ),
                );
                console.log(
                    `Cập nhật đơn hàng ${id} trạng thái thành ${newStatus}`,
                );
            }

            setStatusDropdown(null);
        } catch (error) {
            alert('Cập nhật trạng thái thất bại. Vui lòng thử lại!');
        }
    };

    const deleteOrder = async (orderId) => {
        if (!orderId) {
            alert('Không có đơn hàng nào để xóa.');
            return;
        }

        try {
            await axiosInstance.delete(`/orders/${orderId}`);
            setOrders((prevOrders) =>
                prevOrders.filter((order) => order.id !== orderId),
            );
            setNotification('Đơn hàng đã được xóa thành công!');
            setTimeout(() => setNotification(''), 3000);
            setDeleteModalOpen(false);
            setOrderToDelete(null);
        } catch (error) {
            console.error('Lỗi khi xóa đơn hàng:', error);
            alert('Xóa đơn hàng thất bại. Vui lòng thử lại!');
        }
    };

    const openDeleteModal = (orderId) => {
        setOrderToDelete(orderId);
        setDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setOrderToDelete(null);
    };

    return (
        <div className="px-8 pt-2 pb-1 bg-white w-full h-[100vh] min-h-screen flex flex-col">
            {notification && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
                    {notification}
                </div>
            )}
            <div className="flex justify-between items-center mb-8 bg-[#FAFAFC] p-6 rounded-xl shadow-md">
                <div className="flex items-center space-x-4">
                    <img src={logo} alt="Logo" className="w-16" />
                    <h1 className="text-2xl font-bold text-[#5789cf]">
                        Quản Lý Đơn Hàng
                    </h1>
                </div>
                <p className="text-gray-600 text-lg">{vietnameseDate}</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex-1">
                <div className="overflow-x-auto">
                    <table className="w-full z-1 table-fixed">
                        <thead>
                            <tr className="bg-gray-100 text-left border-b-2">
                                <th className="p-4 text-sm text-gray-600 font-medium">
                                    Mã Đơn Hàng
                                </th>
                                <th className="p-4 text-sm text-gray-600 font-medium">
                                    Tổng Tiền
                                </th>
                                <th className="p-4 text-sm text-gray-600 font-medium">
                                    Ngày
                                </th>
                                <th className="p-4 text-sm text-gray-600 font-medium">
                                    Trạng Thái
                                </th>
                                <th className="p-4 text-sm text-gray-600 font-medium">
                                    Sản Phẩm Đã Đặt
                                </th>
                                <th className="p-4 text-sm text-gray-600 font-medium">
                                    <SettingsIcon />
                                </th>
                            </tr>
                        </thead>
                    </table>

                    <div className="max-h-[400px] overflow-y-auto">
                        <table className="w-full table-fixed">
                            <tbody>
                                {orders?.map((order, index) => (
                                    <tr
                                        key={order.id}
                                        className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-all duration-300`}
                                    >
                                        <td className="p-4">{order.id}</td>
                                        <td className="p-4">
                                            {parseInt(
                                                order.total_amount,
                                            ).toLocaleString()}{' '}
                                            đ
                                        </td>
                                        <td className="p-4">
                                            {new Date(
                                                order.createdAt,
                                            ).toLocaleDateString('vi-VN')}
                                        </td>
                                        <td className="p-4 relative">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleStatusDropdown(
                                                        order.id,
                                                    );
                                                }}
                                                className={`px-2 py-1 rounded-full text-white text-sm ${
                                                    order.status ===
                                                    'Đang xử lý'
                                                        ? 'bg-blue-500'
                                                        : order.status ===
                                                            'Chờ thanh toán'
                                                          ? 'bg-yellow-500'
                                                          : order.status ===
                                                              'Hoàn thành'
                                                            ? 'bg-green-500'
                                                            : order.status ===
                                                                'Hủy'
                                                              ? 'bg-red-500'
                                                              : 'bg-gray-500'
                                                }`}
                                            >
                                                {order.status}
                                            </button>

                                            {statusDropdown === order.id && (
                                                <div className="absolute top-full mt-2 left-0 bg-white shadow-lg rounded-md z-10">
                                                    <button
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                order.id,
                                                                'Đang xử lý',
                                                            )
                                                        }
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Đang xử lý
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                order.id,
                                                                'Chờ thanh toán',
                                                            )
                                                        }
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Chờ thanh toán
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                order.id,
                                                                'Hoàn thành',
                                                            )
                                                        }
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Hoàn thành
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                order.id,
                                                                'Hủy',
                                                            )
                                                        }
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Hủy
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4 flex flex-col space-y-2">
                                            {order.OrderItems.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center"
                                                >
                                                    {/* <img
                                                        src={
                                                            item.Product
                                                                .image ||
                                                            'placeholder_image_url'
                                                        }
                                                        alt={item.Product.name}
                                                        className="w-12 h-12 mr-3 rounded"
                                                    /> */}
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
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() =>
                                                    openDeleteModal(order.id)
                                                }
                                                className="text-red-500 hover:text-red-700 flex items-center group relative"
                                            >
                                                <CloseIcon />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={deleteModalOpen}
                onRequestClose={closeDeleteModal}
                contentLabel="Xác nhận xóa"
                ariaHideApp={false}
                className="fixed inset-0 flex items-center justify-center"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50"
            >
                <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                    <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">
                        Xác nhận xóa đơn hàng
                    </h2>
                    <p className="text-sm text-center text-gray-600">
                        Bạn có chắc chắn muốn xóa đơn hàng{' '}
                        <span className="font-medium text-red-600">
                            #{orderToDelete}
                        </span>
                        ?
                    </p>
                    <div className="mt-6 flex justify-center space-x-4">
                        <button
                            onClick={() => deleteOrder(orderToDelete)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        >
                            Xóa
                        </button>
                        <button
                            onClick={closeDeleteModal}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                        >
                            Hủy
                        </button>
                    </div>
                </div>
            </Modal>

            <div className="flex justify-center mt-4">
                <Pagination
                    total={totalPages}
                    value={page}
                    onChange={setPage}
                />
            </div>
        </div>
    );
}

export default Orders;
