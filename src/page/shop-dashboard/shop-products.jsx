import useFetchData from '@hooks/useFetchData';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FiSettings, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

function Products() {
    const [currentPage, setCurrentPage] = useState(1);
    const [skip, setSkip] = useState(1);
    const [showActionMenu, setShowActionMenu] = useState(null);
    const actionMenuRef = useRef(null);

    const params = useMemo(() => ({ limit: 10, skip }), [skip]);

    const { data, loading, error } = useFetchData(
        `/products/panigated`,
        params,
    );
    console.log(data);
    const totalPages = Math.ceil((data?.pagination?.totalItems || 0) / 10);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        setSkip((pageNumber - 1) * 10);
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
        <div className="p-6 bg-gray-100 w-full min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Products</h1>
                <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600">
                    <FiPlus className="mr-2" />
                    Add Product
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-4">ID</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Quantity</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data.map((product, index) => (
                            <tr
                                key={product.id}
                                className={`border-b ${
                                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                } hover:bg-gray-100`}
                            >
                                <td className="p-4">{product.id}</td>
                                <td className="p-4">{product.name}</td>
                                <td className="p-4">
                                    {product.Category?.name}
                                </td>
                                <td className="p-4">{product.price}</td>
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
                                        <div className="absolute right-0 mt-2 w-24 bg-white shadow-lg rounded z-10">
                                            <button
                                                onClick={() =>
                                                    alert(
                                                        `Edit ${product.name}`,
                                                    )
                                                }
                                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                <FiEdit className="mr-2" /> Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    alert(
                                                        `Delete ${product.name}`,
                                                    )
                                                }
                                                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                <FiTrash2 className="mr-2" />{' '}
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

            <div className="flex justify-between items-center mt-4">
                <p className="text-gray-600">
                    Showing {(currentPage - 1) * 10 + 1} -{' '}
                    {Math.min(currentPage * 10, data?.pagination?.totalItems)}{' '}
                    of {data?.pagination?.totalItems}
                </p>
                <div className="flex space-x-2">
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`w-8 h-8 flex items-center justify-center ${
                                currentPage === index + 1
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 hover:bg-blue-500 hover:text-white'
                            } rounded`}
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
