// src/components/Overview.jsx
import React from 'react';

function Overview() {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                Overview
            </h1>
            <p className="text-gray-600">
                Welcome to the Overview section of your dashboard.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
                {/* Add widgets or cards with statistics and other overview details here */}
                <div className="p-4 bg-blue-100 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-blue-700">
                        Total Pets
                    </h2>
                    <p className="text-2xl">150</p>
                </div>
                <div className="p-4 bg-blue-100 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-blue-700">
                        Total Products
                    </h2>
                    <p className="text-2xl">545</p>
                </div>
                <div className="p-4 bg-blue-100 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-blue-700">
                        Total Vendors
                    </h2>
                    <p className="text-2xl">1,322</p>
                </div>
                <div className="p-4 bg-blue-100 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold text-blue-700">
                        Total Income
                    </h2>
                    <p className="text-2xl">$44,300</p>
                </div>
            </div>
        </div>
    );
}

export default Overview;
