import React, { useEffect, useState } from 'react';
import {
    Pets as PetsIcon,
    ShoppingCart as ShoppingCartIcon,
    Storefront as StorefrontIcon,
    AttachMoney as AttachMoneyIcon,
} from '@mui/icons-material';
import {
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

function Overview() {
    const [weeklyData, setWeeklyData] = useState({
        revenue: [1000, 2000, 3000, 4000, 5000, 6000, 7000],
        pets: [50, 60, 70, 80, 90, 100, 110],
        products: [100, 200, 150, 250, 300, 350, 400],
        vendors: [10, 20, 15, 25, 30, 35, 40],
    });

    const stats = [
        {
            icon: <PetsIcon style={{ fontSize: 40, color: 'white' }} />,
            title: 'Tổng số thú cưng',
            value: 150,
            bgColor: 'bg-blue-500',
        },
        {
            icon: <ShoppingCartIcon style={{ fontSize: 40, color: 'white' }} />,
            title: 'Tổng sản phẩm',
            value: 545,
            bgColor: 'bg-green-500',
        },
        {
            icon: <StorefrontIcon style={{ fontSize: 40, color: 'white' }} />,
            title: 'Tổng nhà cung cấp',
            value: 1322,
            bgColor: 'bg-yellow-500',
        },
        {
            icon: <AttachMoneyIcon style={{ fontSize: 40, color: 'white' }} />,
            title: 'Tổng thu nhập',
            value: '$44,300',
            bgColor: 'bg-red-500',
        },
    ];

    const lineChartData = {
        labels: [
            'Tuần 1',
            'Tuần 2',
            'Tuần 3',
            'Tuần 4',
            'Tuần 5',
            'Tuần 6',
            'Tuần 7',
        ],
        datasets: [
            {
                label: 'Doanh thu (VND)',
                data: weeklyData.revenue,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            },
        ],
    };

    const barChartData = {
        labels: [
            'Tuần 1',
            'Tuần 2',
            'Tuần 3',
            'Tuần 4',
            'Tuần 5',
            'Tuần 6',
            'Tuần 7',
        ],
        datasets: [
            {
                label: 'Thú cưng',
                data: weeklyData.pets,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
            },
            {
                label: 'Sản phẩm',
                data: weeklyData.products,
                backgroundColor: 'rgba(255, 206, 86, 0.6)',
            },
            {
                label: 'Nhà cung cấp',
                data: weeklyData.vendors,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Biểu đồ hoạt động hàng tuần',
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
            },
        },
    };

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">
                Tổng Quan
            </h1>
            <p className="text-gray-600 mb-8">
                Đây là khu vực hiển thị tổng quan về tình hình hoạt động của hệ
                thống.
            </p>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`${stat.bgColor} p-6 rounded-lg shadow-md flex items-center`}
                    >
                        <div className="p-4 rounded-full bg-white mr-4">
                            {stat.icon}
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-white">
                                {stat.title}
                            </h2>
                            <p className="text-2xl font-bold text-white">
                                {stat.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Line Chart */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    Doanh thu hàng tuần
                </h2>
                <div className="h-64">
                    <Line data={lineChartData} options={chartOptions} />
                </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-semibold mb-4">
                    Số lượng thú cưng, sản phẩm và nhà cung cấp
                </h2>

                <div className="h-64">
                    <Bar data={barChartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
}

export default Overview;
