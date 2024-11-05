import { useDispatch, useSelector } from 'react-redux';
import {
    removeFromCart,
    updateItemQuantity,
    loadCartFromStorage,
    // clearCart,
} from '../../redux/slice/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from '@store/authStore';
import axiosInstance from '@network/httpRequest';

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const cartItems = useSelector((state) => state.cart.items);
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
    }, [dispatch, user.id]);

    const handleRemoveFromCart = (itemId) => {
        dispatch(removeFromCart({ userId: user.id, itemId }));
    };

    const handleQuantityChange = (itemId, quantity) => {
        if (quantity > 0) {
            dispatch(updateItemQuantity({ userId: user.id, itemId, quantity }));
        }
    };

    const handleSaveOrder = async () => {
        if (totalQuantity === 0) {
            alert(
                'Giỏ hàng trống! Vui lòng thêm sản phẩm trước khi thanh toán.',
            );
            return;
        }

        const orderData = {
            petOwner_id: user.id,
            items: cartItems.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price,
            })),
        };
        try {
            const response = await axiosInstance.post(
                '/orders/products',
                orderData,
            );

            if (response.status === 201 && response.data.orderId) {
                navigate(`/checkout/${response.data.orderId}`);
            }
        } catch (error) {
            console.error('Lỗi khi lưu đặt hàng:', error);
            alert('Không thể lưu đơn hàng. Vui lòng thử lại!');
        }
    };
    return (
        <div className="container mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-lg max-w-5xl">
            <h2 className="text-4xl font-bold mb-6 text-blue-900 text-center">
                Giỏ Hàng ({totalQuantity} sản phẩm)
            </h2>

            <div className="overflow-y-auto max-h-96">
                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500">
                        Giỏ hàng của bạn đang trống.
                    </p>
                ) : (
                    cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center mb-6 p-5 bg-white rounded-lg shadow-sm transition-shadow duration-300 hover:shadow-md"
                        >
                            <img
                                src={
                                    item.image ||
                                    'https://product.hstatic.net/200000263355/product/z4431095005129_5ae326bc61106bba8c85799a3e176128_f58eeb18c4fb45898b2283344b1c7cf5_master.jpg'
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
                                    Giá: ${item.price}
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

            {totalQuantity > 0 && (
                <div className="flex justify-between items-center mt-8 p-4 bg-white rounded-lg shadow-sm">
                    <p className="text-xl font-bold">
                        Tổng cộng:{' '}
                        <span className="text-blue-800">
                            ${totalPrice.toFixed(2)}
                        </span>
                    </p>
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
                            Mua hàng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
