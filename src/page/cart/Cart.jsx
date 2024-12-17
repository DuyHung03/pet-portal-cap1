import axiosInstance from '@network/httpRequest';
import { useAuthStore } from '@store/authStore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    applyDiscountCode,
    loadCartFromStorage,
    removeFromCart,
    updateItemQuantity,
} from '../../redux/slice/cartSlice';

function Cart() {
    const [discountCode, setDiscountCode] = useState('');
    const [isDiscountApplied, setIsDiscountApplied] = useState(false);

    const [notification, setNotification] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useAuthStore();

    const cartItems = useSelector((state) => state.cart.items);
    const totalPriceWithDiscount = useSelector(
        (state) => state.cart.totalPriceWithDiscount,
    );
    const discountAmount = useSelector((state) => state.cart.discountAmount);

    const totalQuantity = cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
    );

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    );

    useEffect(() => {
        if (user && user.id) {
            dispatch(loadCartFromStorage(user.id));
        }
    }, [dispatch, user]);
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);
    const handleRemoveFromCart = (itemId) => {
        dispatch(removeFromCart({ userId: user.id, itemId }));
    };

    const handleQuantityChange = (itemId, quantity) => {
        if (quantity > 0) {
            dispatch(updateItemQuantity({ userId: user.id, itemId, quantity }));
        }
    };

    const handleApplyDiscount = async () => {
        try {
            const percentageCoupons = await axiosInstance.get(
                '/coupons/discount-type/Percentage',
            );
            const freeShippingCoupons = await axiosInstance.get(
                '/coupons/discount-type/FreeShipping',
            );

            const allCoupons = [
                ...percentageCoupons.data.data,
                ...freeShippingCoupons.data.data,
            ];

            const coupon = allCoupons.find(
                (c) =>
                    c.code === discountCode &&
                    c.is_active &&
                    new Date(c.start_date) <= new Date() &&
                    new Date(c.end_date) >= new Date(),
            );

            if (coupon) {
                if (coupon.discount_type === 'Percentage') {
                    const discountAmount =
                        (totalPrice * parseFloat(coupon.discount_value)) / 100;
                    dispatch(
                        applyDiscountCode({
                            code: coupon.code,
                            discountAmount,
                        }),
                    );
                    setNotification({
                        type: 'success',
                        message: `Áp dụng mã giảm giá thành công! Bạn được giảm ${discountAmount.toLocaleString(
                            'vi-VN',
                            { style: 'currency', currency: 'VND' },
                        )}.`,
                    });
                } else if (coupon.discount_type === 'FreeShipping') {
                    dispatch(
                        applyDiscountCode({
                            code: coupon.code,
                            discountAmount: 0,
                        }),
                    );
                    setNotification({
                        type: 'success',
                        message:
                            'Áp dụng mã giảm giá thành công! Bạn được miễn phí vận chuyển.',
                    });
                }
                setIsDiscountApplied(true);
            } else {
                setNotification({
                    type: 'error',
                    message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn!',
                });
            }
        } catch (error) {
            console.error('Lỗi khi kiểm tra mã giảm giá:', error);
            setNotification({
                type: 'error',
                message:
                    'Không thể kiểm tra mã giảm giá. Vui lòng thử lại sau!',
            });
        }
    };

    const handleSaveOrder = async () => {
        if (totalQuantity === 0) {
            setNotification({
                type: 'error',
                message:
                    'Giỏ hàng của bạn đang trống! Vui lòng thêm sản phẩm trước khi thanh toán.',
            });
            return;
        }

        const orderData = {
            petOwner_id: user.id,
            items: cartItems.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
                price: parseFloat(item.price),
            })),
        };

        try {
            const orderResponse = await axiosInstance.post(
                '/orders/products',
                orderData,
            );

            const { orderId } = orderResponse.data;

            const paymentResponse = await axiosInstance.post('/payments', {
                orderId,
            });
            console.log(orderData);
            console.log(orderResponse);
            const { url } = paymentResponse.data;

            setNotification({
                type: 'success',
                message:
                    'Đơn hàng đã được lưu thành công. Đang chuyển đến trang thanh toán...',
            });

            setTimeout(() => {
                window.location.href = url;
            }, 2000);
        } catch (error) {
            console.error('Lỗi khi lưu đơn hàng:', error);
            setNotification({
                type: 'error',
                message: 'Không thể lưu đơn hàng. Vui lòng thử lại!',
            });
        }
    };

    return (
        <div className="container mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-lg max-w-5xl">
            <h2 className="text-4xl font-bold mb-6 text-blue-900 text-center">
                Giỏ hàng ({totalQuantity} sản phẩm)
            </h2>

            <div className="overflow-y-auto max-h-96">
                {cartItems.length === 0 ? (
                    <div className="text-center">
                        <p className="text-gray-500 mb-4">
                            Giỏ hàng của bạn hiện đang trống.
                        </p>
                        <button
                            onClick={() => navigate('/shop')}
                            className="bg-blue-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-600"
                        >
                            Quay về shop
                        </button>
                    </div>
                ) : (
                    cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center mb-6 p-5 bg-white rounded-lg shadow-sm transition-shadow duration-300 hover:shadow-md"
                        >
                            <img
                                src={
                                    item?.images ||
                                    'https://via.placeholder.com/150'
                                }
                                alt={item.name}
                                className="w-32 h-32 object-cover rounded-md mr-6"
                            />
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold">
                                    {item.name}
                                </h3>
                                <div className="flex items-center">
                                    <button
                                        onClick={() =>
                                            handleQuantityChange(
                                                item.id,
                                                item.quantity - 1,
                                            )
                                        }
                                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span className="mx-3 text-lg">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() =>
                                            handleQuantityChange(
                                                item.id,
                                                item.quantity + 1,
                                            )
                                        }
                                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="text-lg font-medium text-blue-800">
                                    Giá: {parseInt(item.price).toLocaleString()}{' '}
                                    đ
                                </p>
                            </div>
                            <button
                                onClick={() => handleRemoveFromCart(item.id)}
                                className="bg-red-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-red-600 transition-colors duration-200"
                            >
                                Xóa
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="my-6 flex items-center justify-between bg-white p-4 rounded-lg shadow-md">
                <div className="flex-1 mr-4">
                    <input
                        type="text"
                        placeholder="Nhập mã giảm giá"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition duration-300"
                    />
                </div>
                <button
                    onClick={handleApplyDiscount}
                    className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Áp dụng
                </button>
            </div>

            {notification && (
                <div
                    className={`fixed z-10 top-0 right-0 p-4 rounded-md shadow-lg ${
                        notification.type === 'success'
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                    }`}
                >
                    {notification.message}
                </div>
            )}

            {isDiscountApplied && (
                <div className="mt-4 bg-green-50 p-4 rounded-lg shadow-sm">
                    <p className="text-lg font-semibold text-green-700">
                        Mã giảm giá: {discountCode}
                    </p>
                    {discountAmount > 0 ? (
                        <p className="text-lg font-medium text-green-800">
                            Bạn được giảm:{' '}
                            {discountAmount.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                        </p>
                    ) : (
                        <p className="text-lg font-medium text-green-800">
                            Miễn phí vận chuyển
                        </p>
                    )}
                </div>
            )}

            {totalQuantity > 0 && (
                <div className="flex justify-between items-center mt-8 p-4 bg-white rounded-lg shadow-sm">
                    <div>
                        <p className="text-lg font-bold">
                            Tổng tiền:{' '}
                            <span className="text-blue-800">
                                {totalPrice.toLocaleString('vi-VN', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </span>
                        </p>
                        {isDiscountApplied && (
                            <p className="text-lg font-bold text-green-600">
                                Tổng tiền sau khi giảm:{' '}
                                <span>
                                    {totalPriceWithDiscount.toLocaleString(
                                        'vi-VN',
                                        {
                                            style: 'currency',
                                            currency: 'VND',
                                        },
                                    )}
                                </span>
                            </p>
                        )}
                    </div>
                    <div>
                        <button
                            onClick={() => navigate('/shop')}
                            className="bg-blue-500 text-white font-bold py-2 px-5 rounded-lg mr-4 hover:bg-blue-600"
                        >
                            Tiếp tục mua sắm
                        </button>
                        <button
                            onClick={handleSaveOrder}
                            className="bg-green-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-600"
                        >
                            Thanh toán
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
