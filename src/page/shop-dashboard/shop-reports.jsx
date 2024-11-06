import React from 'react';

const Reports = () => {
    const salesData = [
        { id: 1, category: 'Food', revenue: 200 },
        { id: 2, category: 'Toys', revenue: 150 },
        { id: 3, category: 'Accessories', revenue: 100 },
    ];

    const totalRevenue = salesData.reduce((sum, item) => sum + item.revenue, 0);

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Reports</h2>

            <div className="mb-4">
                <p className="text-gray-700">Total Revenue: ${totalRevenue}</p>
            </div>

            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border p-2">Category</th>
                        <th className="border p-2">Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {salesData.map((data) => (
                        <tr key={data.id}>
                            <td className="border p-2">{data.category}</td>
                            <td className="border p-2">${data.revenue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reports;
