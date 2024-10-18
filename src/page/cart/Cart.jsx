import { removeFromCart, updateItemQuantity } from '@redux/slice/cartSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.items);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    );

    const handleRemoveFromCart = (itemId) => {
        const confirmDelete = window.confirm(
            'Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?',
        );
        if (confirmDelete) {
            dispatch(removeFromCart(itemId));
        }
    };

    const handleQuantityChange = (itemId, quantity) => {
        if (quantity < 1) return;
        dispatch(updateItemQuantity({ itemId, quantity }));
    };

    const handleCheckout = () => {
        alert('Chuyển sang trang thanh toán...');
        navigate('/checkout');
    };

    return (
        <div className="container mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-lg max-w-5xl">
            <h2 className="text-4xl font-bold mb-6 text-blue-900 text-center">
                Giỏ Hàng ({totalQuantity} sản phẩm)
            </h2>

            <div className="overflow-y-auto max-h-96">
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center mb-6 p-5 bg-white rounded-lg shadow-sm transition-shadow duration-300 hover:shadow-md"
                    >
                        <img
                            // src={item.images}
                            src="https://product.hstatic.net/200000263355/product/z4431095005129_5ae326bc61106bba8c85799a3e176128_f58eeb18c4fb45898b2283344b1c7cf5_master.jpg"
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
                ))}
            </div>

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
                        onClick={handleCheckout}
                        className="bg-green-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-600"
                    >
                        Thanh toán
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
