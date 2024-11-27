import useFetchData from '@hooks/useFetchData';
import { Pagination } from '@mantine/core';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FiSettings, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { vietnameseDate } from '../../util/getDateInVietnamese';
import logo from '../../assets/logo-transparent.png';
import AddProduct from 'component/shop-dashboard/add-products/AddProducts';

function Products() {
    const [showActionMenu, setShowActionMenu] = useState(null);
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const actionMenuRef = useRef(null);
    const [page, setPage] = useState(1);
    const productSectionRef = useRef(null);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 5;
    const params = useMemo(
        () => ({
            limit: pageSize,
            page: page,
        }),
        [page],
    );

    const { data, loading, error } = useFetchData(
        '/products/paginated',
        params,
    );
    useEffect(() => {
        if (data && data.data) {
            setProducts(data.data);
            const totalItems = data.pagination.totalItems;
            const totalPages = data.pagination.totalPages;

            setTotalPages(totalPages);

            if (productSectionRef.current) {
                productSectionRef.current.scrollIntoView({
                    behavior: 'smooth',
                });
            }
        }
    }, [data, page, pageSize]);

    const toggleActionMenu = (id) => {
        setShowActionMenu(showActionMenu === id ? null : id);
    };

    const handleAddProduct = (productData) => {
        setProducts((prevProducts) => [productData, ...prevProducts]);
        setIsAddProductOpen(false);
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
        <div className="px-8 pt-5 pb-5 bg-white w-full h-[110vh] min-h-screen">
            <div className="flex justify-between items-center mb-8 bg-[#FAFAFC] p-6 rounded-xl shadow-md">
                <div className="flex items-center space-x-4">
                    <img src={logo} alt="Logo" className="w-16" />
                    <h1 className="text-2xl font-bold text-[#5789cf]">
                        Quản Lý Sản Phẩm
                    </h1>
                </div>
                <p className="text-gray-600 text-lg">{vietnameseDate}</p>
            </div>

            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => setIsAddProductOpen(true)}
                    className="flex items-center px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                    <FiPlus className="mr-2" />
                    Thêm Sản Phẩm
                </button>
            </div>

            {isAddProductOpen && (
                <AddProduct
                    onClose={() => setIsAddProductOpen(false)}
                    onAddProduct={handleAddProduct}
                />
            )}

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {loading ? (
                    <p className="p-4 text-center">Đang tải...</p>
                ) : error ? (
                    <p className="p-4 text-center text-red-500">
                        Lỗi: {error.message}
                    </p>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="p-4">ID</th>
                                <th className="p-4">Hình Ảnh</th>
                                <th className="p-4">Tên</th>
                                <th className="p-4">Danh Mục</th>
                                <th className="p-4">Giá</th>
                                <th className="p-4">Tồn Kho</th>
                                <th className="p-4">Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 ? (
                                products.map((product, index) => (
                                    <tr
                                        key={product.id}
                                        className={`border-b ${
                                            index % 2 === 0
                                                ? 'bg-gray-50'
                                                : 'bg-white'
                                        } hover:bg-gray-100 transition`}
                                    >
                                        <td className="p-4">{product.id}</td>
                                        <td className="p-4">
                                            <img
                                                src={
                                                    product.images ||
                                                    'https://via.placeholder.com/50'
                                                }
                                                alt={product.name}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                        </td>
                                        <td className="p-4">{product.name}</td>
                                        <td className="p-4">
                                            {product.Category?.name}
                                        </td>
                                        <td className="p-4">
                                            {parseInt(
                                                product.price,
                                            ).toLocaleString()}{' '}
                                            ₫
                                        </td>
                                        <td className="p-4">
                                            {product.stock_quantity}
                                        </td>
                                        <td
                                            className="p-4 relative"
                                            ref={actionMenuRef}
                                        >
                                            <button
                                                onClick={() =>
                                                    toggleActionMenu(product.id)
                                                }
                                                className="text-gray-500 hover:text-blue-500"
                                            >
                                                <FiSettings className="w-5 h-5" />
                                            </button>
                                            {showActionMenu === product.id && (
                                                <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg z-10">
                                                    <button
                                                        onClick={() =>
                                                            alert(
                                                                `Chỉnh sửa ${product.name}`,
                                                            )
                                                        }
                                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        <FiEdit className="mr-2" />
                                                        Chỉnh sửa
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            alert(
                                                                `Xóa ${product.name}`,
                                                            )
                                                        }
                                                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        <FiTrash2 className="mr-2" />
                                                        Xóa
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="p-4 text-center">
                                        Không có sản phẩm.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
                <Pagination
                    page={page}
                    onChange={setPage}
                    total={totalPages}
                    className="mt-2 flex justify-center"
                />
            </div>
        </div>
    );
}

export default Products;
