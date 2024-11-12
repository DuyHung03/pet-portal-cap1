import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import useFetchData from '@hooks/useFetchData';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Oval } from 'react-loader-spinner';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

const Reports = () => {
    const [reportsData, setReportsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { data: revenueData, error: revenueError } = useFetchData(
        '/orders/status/Shipped',
    );
    const { data: totalOrdersData, error: ordersError } = useFetchData(
        '/orders/total-orders',
    );

    useEffect(() => {
        if (revenueData && totalOrdersData) {
            try {
                const revenue = Array.isArray(revenueData)
                    ? revenueData.map(
                          (order) => parseFloat(order.total_amount) || 0,
                      )
                    : [];
                const totalOrders = totalOrdersData?.totalOrders || 0;
                setReportsData({ revenue, orders: totalOrders });
            } catch (err) {
                setError('Invalid data structure');
            } finally {
                setLoading(false);
            }
        }
    }, [revenueData, totalOrdersData]); // Re-run effect if data changes

    // Error handling
    if (revenueError || ordersError) {
        return <div>Error fetching data. Please try again later.</div>;
    }

    // Loading state - show a loader while data is being fetched
    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Oval color="#00BFFF" height={80} width={80} />
            </div>
        );
    }

    // Error state - handle invalid or missing data
    if (error) {
        return <div>{error}</div>;
    }

    // Chart data for revenue and orders
    const revenueChartData = {
        labels: [
            'Week 1',
            'Week 2',
            'Week 3',
            'Week 4',
            'Week 5',
            'Week 6',
            'Week 7',
        ],
        datasets: [
            {
                label: 'Revenue ($)',
                data: reportsData?.revenue ?? [],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const ordersChartData = {
        labels: [
            'Week 1',
            'Week 2',
            'Week 3',
            'Week 4',
            'Week 5',
            'Week 6',
            'Week 7',
        ],
        datasets: [
            {
                label: 'Orders',
                data: [reportsData?.orders || 0], // Ensure it's an array for the chart
                borderColor: 'rgb(153, 102, 255)',
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                fill: true,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Weekly Revenue & Orders',
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 7,
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return `$${value}`; // Format y-axis with $
                    },
                },
            },
        },
    };

    return (
        <div className="p-6 bg-gray-100 w-full min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Shop Reports</h1>

            {/* Báo cáo tổng quan doanh thu và đơn hàng */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    Business Overview
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 bg-blue-500 text-white rounded-lg shadow">
                        <h3 className="text-lg font-semibold">Total Revenue</h3>
                        <p className="text-2xl">
                            $
                            {reportsData?.revenue?.reduce((a, b) => a + b, 0) ||
                                0}
                        </p>
                    </div>
                    <div className="p-4 bg-green-500 text-white rounded-lg shadow">
                        <h3 className="text-lg font-semibold">Total Orders</h3>
                        <p className="text-2xl">{reportsData?.orders || 0}</p>
                    </div>
                </div>
            </div>

            {/* Biểu đồ Doanh thu */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Weekly Revenue</h2>
                <Line data={revenueChartData} options={chartOptions} />
            </div>

            {/* Biểu đồ Đơn hàng */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">Weekly Orders</h2>
                <Line data={ordersChartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default Reports;
