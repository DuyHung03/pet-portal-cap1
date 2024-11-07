import React, { useState } from 'react';
import { FiSettings } from 'react-icons/fi';

// Example data
const orders = [
    {
        id: '#2632',
        name: 'Brooklyn Zoe',
        address: '302 Snider Street, RUTLAND, VT, 05701',
        date: '31 Jul 2020',
        price: '$64.00',
        status: 'Pending',
        avatar: 'https://i.pravatar.cc/100?img=3',
    },
    {
        id: '#2633',
        name: 'Avery Harper',
        address: '57 Baker Avenue, MESA, AZ, 85202',
        date: '01 Aug 2020',
        price: '$72.50',
        status: 'Completed',
        avatar: 'https://i.pravatar.cc/100?img=4',
    },
    {
        id: '#2634',
        name: 'Riley Finn',
        address: '98 Elm Street, SEATTLE, WA, 98101',
        date: '02 Aug 2020',
        price: '$53.20',
        status: 'Pending',
        avatar: 'https://i.pravatar.cc/100?img=5',
    },
    {
        id: '#2635',
        name: 'Jordan Lee',
        address: '65 Main Street, MIAMI, FL, 33101',
        date: '03 Aug 2020',
        price: '$45.00',
        status: 'Shipped',
        avatar: 'https://i.pravatar.cc/100?img=6',
    },
    {
        id: '#2636',
        name: 'Skyler Avery',
        address: '145 Oak Street, DALLAS, TX, 75201',
        date: '04 Aug 2020',
        price: '$80.10',
        status: 'Pending',
        avatar: 'https://i.pravatar.cc/100?img=7',
    },
    {
        id: '#2637',
        name: 'Taylor Quinn',
        address: '21 Pine Avenue, DENVER, CO, 80201',
        date: '05 Aug 2020',
        price: '$67.40',
        status: 'Completed',
        avatar: 'https://i.pravatar.cc/100?img=8',
    },
    {
        id: '#2638',
        name: 'Casey Morgan',
        address: '32 Cedar Road, SAN FRANCISCO, CA, 94102',
        date: '06 Aug 2020',
        price: '$50.50',
        status: 'Pending',
        avatar: 'https://i.pravatar.cc/100?img=9',
    },
    {
        id: '#2639',
        name: 'Jamie Casey',
        address: '78 Birch Lane, PHOENIX, AZ, 85001',
        date: '07 Aug 2020',
        price: '$62.75',
        status: 'Shipped',
        avatar: 'https://i.pravatar.cc/100?img=10',
    },
    {
        id: '#2640',
        name: 'Emery Parker',
        address: '120 Maple Avenue, NEW YORK, NY, 10001',
        date: '08 Aug 2020',
        price: '$79.20',
        status: 'Completed',
        avatar: 'https://i.pravatar.cc/100?img=11',
    },
    {
        id: '#2641',
        name: 'Logan Sage',
        address: '49 Walnut Street, ATLANTA, GA, 30301',
        date: '09 Aug 2020',
        price: '$56.80',
        status: 'Pending',
        avatar: 'https://i.pravatar.cc/100?img=12',
    },
];

const ROWS_PER_PAGE = 7;

function Orders() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(orders.length / ROWS_PER_PAGE);

    const displayedOrders = orders.slice(
        (currentPage - 1) * ROWS_PER_PAGE,
        currentPage * ROWS_PER_PAGE,
    );

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Order</h1>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-4">ID</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Address</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedOrders.map((order, index) => (
                            <tr
                                key={order.id}
                                className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
                            >
                                <td className="p-4">{order.id}</td>
                                <td className="p-4 flex items-center space-x-3">
                                    <img
                                        src={order.avatar}
                                        alt="avatar"
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span>{order.name}</span>
                                </td>
                                <td className="p-4">{order.address}</td>
                                <td className="p-4">{order.date}</td>
                                <td className="p-4">{order.price}</td>
                                <td className="p-4">
                                    <span
                                        className={`px-2 py-1 rounded-full text-white text-sm ${
                                            order.status === 'Pending'
                                                ? 'bg-red-500'
                                                : order.status === 'Dispatch'
                                                  ? 'bg-blue-500'
                                                  : 'bg-green-500'
                                        }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <button className="text-gray-500 hover:text-blue-500">
                                        <FiSettings className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {displayedOrders.length < ROWS_PER_PAGE &&
                            Array.from({
                                length: ROWS_PER_PAGE - displayedOrders.length,
                            }).map((_, index) => (
                                <tr
                                    key={index}
                                    className="border-b bg-white h-12"
                                >
                                    <td className="p-4" colSpan="7"></td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <p className="text-gray-600">
                    Showing {(currentPage - 1) * ROWS_PER_PAGE + 1} -{' '}
                    {Math.min(currentPage * ROWS_PER_PAGE, orders.length)} of{' '}
                    {orders.length}
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

export default Orders;
