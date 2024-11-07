import { useDispatch, useSelector } from 'react-redux';
import {
    removeFromCart,
    updateItemQuantity,
    loadCartFromStorage,
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

    // Calculate total quantity and price
    const totalQuantity = cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
    );
    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
    );

    // Load cart items from storage when user is available
    useEffect(() => {
        if (user && user.id) {
            dispatch(loadCartFromStorage(user.id));
        }
    }, [dispatch, user]);

    // Handle removing an item from the cart
    const handleRemoveFromCart = (itemId) => {
        dispatch(removeFromCart({ userId: user.id, itemId }));
    };

    // Handle changing the quantity of an item
    const handleQuantityChange = (itemId, quantity) => {
        if (quantity > 0) {
            dispatch(updateItemQuantity({ userId: user.id, itemId, quantity }));
        }
    };

    // Handle saving the order and navigating to checkout
    const handleSaveOrder = async () => {
        if (totalQuantity === 0) {
            alert(
                'Your cart is empty! Please add products before proceeding to checkout.',
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
            const orderResponse = await axiosInstance.post(
                '/orders/products',
                orderData,
            );

            const { orderId } = orderResponse.data;

            const paymentResponse = await axiosInstance.post('/payments', {
                orderId,
            });

            const { url } = paymentResponse.data;
            window.location.href = url;
        } catch (error) {
            console.error('Error saving order:', error);
            alert('Unable to save order. Please try again!');
        }
    };

    return (
        <div className="container mx-auto my-10 p-6 bg-gray-100 rounded-lg shadow-lg max-w-5xl">
            <h2 className="text-4xl font-bold mb-6 text-blue-900 text-center">
                Cart ({totalQuantity} items)
            </h2>

            <div className="overflow-y-auto max-h-96">
                {cartItems.length === 0 ? (
                    <p className="text-center text-gray-500">
                        Your cart is currently empty.
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
                                    Price: ${item.price}
                                </p>
                            </div>
                            <button
                                onClick={() => handleRemoveFromCart(item.id)}
                                className="bg-red-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-red-600 transition-colors duration-200"
                            >
                                Remove
                            </button>
                        </div>
                    ))
                )}
            </div>

            {totalQuantity > 0 && (
                <div className="flex justify-between items-center mt-8 p-4 bg-white rounded-lg shadow-sm">
                    <p className="text-xl font-bold">
                        Total:{' '}
                        <span className="text-blue-800">
                            ${totalPrice.toFixed(2)}
                        </span>
                    </p>
                    <div>
                        <button
                            onClick={() => navigate('/shop')}
                            className="bg-blue-500 text-white font-bold py-2 px-5 rounded-lg mr-4 hover:bg-blue-600"
                        >
                            Continue Shopping
                        </button>
                        <button
                            onClick={handleSaveOrder}
                            className="bg-green-500 text-white font-bold py-2 px-5 rounded-lg hover:bg-green-600"
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
