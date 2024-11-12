import useFetchData from '@hooks/useFetchData';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FiSettings, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';
import { vietnameseDate } from '../../util/getDateInVietnamese';
import logo from '../../assets/logo-transparent.png';

function Products() {
    const [currentPage, setCurrentPage] = useState(1);
    const [skip, setSkip] = useState(1);
    const [showActionMenu, setShowActionMenu] = useState(null);
    const actionMenuRef = useRef(null);

    const params = useMemo(() => ({ limit: 6, skip }), [skip]);

    const { data, loading, error } = useFetchData(
        `/products/panigated`,
        params,
    );

    const totalPages = Math.ceil((data?.pagination?.totalItems || 0) / 6);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setSkip((pageNumber - 1) * 6);
    };

    const toggleActionMenu = (id) => {
        setShowActionMenu(showActionMenu === id ? null : id);
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
        <div className="px-8 pt-8 pb-5 bg-gray-100 w-full min-h-screen">
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
                <button className="flex items-center px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                    <FiPlus className="mr-2" />
                    Thêm Sản Phẩm
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="p-4">ID</th>
                            <th className="p-4">Tên</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Stock</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data.map((product, index) => (
                            <tr
                                key={product.id}
                                className={`border-b ${
                                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                } hover:bg-gray-100 transition`}
                            >
                                <td className="p-4">{product.id}</td>
                                <td className="p-4">{product.name}</td>
                                <td className="p-4">
                                    {product.Category?.name}
                                </td>
                                <td className="p-4">${product.price}</td>
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
                                                        `Edit ${product.name}`,
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
                                                        `Delete ${product.name}`,
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

            <div className="flex justify-between items-center mt-5">
                <p className="text-gray-600">
                    Showing {(currentPage - 1) * 6 + 1} -{' '}
                    {Math.min(currentPage * 6, data?.pagination?.totalItems)} of{' '}
                    {data?.pagination?.totalItems}
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

export default Products;
