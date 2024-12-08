import axiosInstance from '@network/httpRequest';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    BarElement,
    Title,
    Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
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

const Reports = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [totalOrdersRes, totalRevenueRes] = await Promise.all([
                    axiosInstance.get('/orders/total-orders'),
                    axiosInstance.get('/orders/total-revenue'),
                ]);

                const totalOrders = totalOrdersRes.data?.totalOrders || 0;
                const totalRevenue = totalRevenueRes.data?.data || 0;

                setData({
                    totalOrders,
                    totalRevenue,
                });
            } catch (err) {
                console.error(err);
                setError('Không thể tải dữ liệu từ máy chủ');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const chartData = {
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
                data: Array(7).fill(data?.totalRevenue || 0),
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                type: 'line',
                fill: true,
            },
            {
                label: 'Tổng số đơn hàng',
                data: Array(7).fill(data?.totalOrders || 0),
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgb(255, 159, 64)',
                borderWidth: 1,
                type: 'bar',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Báo cáo doanh thu và đơn hàng hàng tuần',
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

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-lg text-blue-600">Đang tải...</div>
            </div>
        );

    if (error)
        return (
            <div className="text-center text-red-500 mt-10">
                <h2 className="text-2xl font-bold">Lỗi khi tải dữ liệu</h2>
                <p>{error}</p>
            </div>
        );

    return (
        <div className="p-6 bg-gray-100 w-full min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Báo cáo cửa hàng</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-blue-500 text-white rounded-lg shadow flex flex-col items-center">
                    <h3 className="text-lg font-semibold">Tổng doanh thu</h3>
                    <p className="text-2xl">
                        {parseInt(data?.totalRevenue || 0).toLocaleString()} VND
                    </p>
                </div>
                <div className="p-4 bg-green-500 text-white rounded-lg shadow flex flex-col items-center">
                    <h3 className="text-lg font-semibold">Tổng đơn hàng</h3>
                    <p className="text-2xl">{data?.totalOrders || 0}</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    Doanh thu và đơn hàng theo tuần
                </h2>
                <div className="h-64">
                    <Line data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>
    );
};

export default Reports;
