// import emailjs from '@emailjs/browser';
import axiosInstance from '@network/httpRequest';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearCart } from '../../redux/slice/cartSlice';

function Checkout() {
    const { orderId } = useParams();
    const [orderData, setOrderData] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    console.log(orderData);

    console.log(orderId);
    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await axiosInstance.get(`/orders/${orderId}`);
                console.log(response);
                setOrderData(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu đơn hàng:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();
    }, [orderId]);

    const handlePayment = async () => {
        try {
            const response = await axiosInstance.post(`/payments/${orderId}`);
            if (response.status === 200) {
                alert('Thanh toán thành công!');
                // const templateParams = {
                //     customer_name: user.username,
                // };
                // emailjs
                //     .send('service_ubdnywu', 'template_qtbkviq', templateParams)
                //     .then(
                //         () => {
                //             // saveOptToServer(code)
                //             console.log('Send email successfully');
                //         },
                //         (error) => {
                //             console.log(error);
                //         },
                //     );
                dispatch(clearCart());
            }
        } catch (error) {
            console.error('Lỗi khi thanh toán:', error);
            alert('Đã xảy ra lỗi khi thanh toán. Vui lòng thử lại!');
        }
    };

    if (loading) {
        return <p>Đang tải dữ liệu đơn hàng...</p>;
    }

    if (!orderData || !orderData.items.length) {
        return <p>Không có dữ liệu đơn hàng.</p>;
    }

    return (
        <div className="container mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-lg max-w-5xl">
            <h2 className="text-4xl font-bold mb-6 text-blue-900 text-center">
                Thanh Toán
            </h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold mb-4">
                    Thông tin đơn hàng
                </h3>
                {orderData.items.map((item) => (
                    <div
                        key={item.productId}
                        className="flex justify-between items-center mb-4 p-4 border border-gray-200 rounded-lg shadow-sm"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-md mr-4"
                        />
                        <div className="flex-1">
                            <h4 className="text-lg font-semibold">
                                {item.name}
                            </h4>
                            <p className="text-gray-600">
                                Số lượng: {item.quantity}
                            </p>
                        </div>
                        <span className="text-lg font-medium text-blue-800">
                            ${item.price.toFixed(2)}
                        </span>
                    </div>
                ))}
                <h4 className="text-xl font-bold mt-4">
                    Tổng cộng: $
                    {orderData.items
                        .reduce(
                            (total, item) => total + item.price * item.quantity,
                            0,
                        )
                        .toFixed(2)}
                </h4>
                <button
                    onClick={handlePayment}
                    className="bg-green-500 text-white font-bold py-3 px-5 rounded-lg hover:bg-green-600 transition duration-300 mt-4"
                >
                    Xác Nhận Thanh Toán
                </button>
            </div>

            <div className="mt-10">
                <h3 className="text-2xl font-semibold mb-4">
                    Bạn có thể thích
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Gợi ý các sản phẩm liên quan */}
                    {orderData.suggestedProducts.map((suggestion) => (
                        <div
                            key={suggestion.id}
                            className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
                        >
                            <img
                                src={suggestion.image}
                                alt={suggestion.name}
                                className="w-full h-40 object-cover rounded-md"
                            />
                            <h4 className="text-lg font-semibold mt-2">
                                {suggestion.name}
                            </h4>
                            <p className="text-blue-800 font-medium">
                                ${suggestion.price.toFixed(2)}
                            </p>
                            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 mt-2">
                                Thêm vào giỏ
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Checkout;
