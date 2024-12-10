import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { addToCart, loadCartFromStorage } from '../../redux/slice/cartSlice';
import { useAuthStore } from '@store/authStore';

function ProductDetails() {
    const location = useLocation();
    const product = location.state?.product || {};
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const { isAuthenticated, user } = useAuthStore();

    useEffect(() => {
        if (isAuthenticated && user) {
            dispatch(loadCartFromStorage(user.id));
        }
    }, [isAuthenticated, user, dispatch]);

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            try {
                const item = { ...product, quantity };
                await dispatch(addToCart({ userId: user.id, item }));
                setAddedToCart(true);
                setTimeout(() => setAddedToCart(false), 2000);
            } catch (error) {
                console.error(
                    'Error adding item to API:',
                    error.response?.data || error.message,
                );
            }
        }
    };

    const averageRating = product.ProductReviews?.length
        ? (
              product.ProductReviews.reduce(
                  (acc, review) => acc + review.rating,
                  0,
              ) / product.ProductReviews.length
          ).toFixed(1)
        : 0;

    return (
        <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
            <button
                className="mb-4 text-blue-500 underline"
                onClick={() => navigate(-1)}
            >
                &larr; Quay lại
            </button>
            <div className="flex flex-row items-start justify-between mb-8 space-x-6">
                <img
                    src={product.images}
                    alt={product.name || 'Sản phẩm'}
                    className="w-64 h-64 object-cover rounded-md shadow-md"
                />

                <div className="flex-1 p-4">
                    <h1 className="text-2xl font-bold text-blue-800 mb-2 uppercase tracking-wide">
                        {product.name || 'Tên sản phẩm'}
                    </h1>

                    <p className="text-lg text-red-600 font-semibold mb-2">
                        Giá:
                        {parseInt(product.price).toLocaleString() ||
                            'Liên hệ'}{' '}
                        VND
                    </p>

                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full mb-2">
                        Danh mục: {product.Category?.name || 'Chưa rõ'}
                    </span>

                    <div className="flex items-center mb-2 mt-3">
                        <label className="font-medium" htmlFor="quantity">
                            Số lượng:
                        </label>
                        <input
                            id="quantity"
                            type="number"
                            value={quantity}
                            min={1}
                            max={product.stock_quantity || 1}
                            onChange={(e) =>
                                setQuantity(Number(e.target.value))
                            }
                            className="ml-2 w-16 border border-gray-300 rounded-md px-2"
                            aria-label="Số lượng sản phẩm"
                        />
                    </div>

                    <div className="flex items-center mb-2">
                        <span className="font-medium">Đánh giá:</span>
                        <span className="text-yellow-500 ml-2">
                            {averageRating} / 5
                        </span>
                        <span className="text-gray-500 ml-1">
                            ({product.ProductReviews?.length || 0} đánh giá)
                        </span>
                    </div>

                    <button
                        className="bg-gradient-to-r from-teal-400 to-lime-400 text-white font-bold py-2 px-4 rounded-xl mt-4 hover:scale-105 transition-transform"
                        onClick={handleAddToCart}
                    >
                        Thêm vào giỏ hàng
                    </button>

                    {addedToCart && (
                        <div className="fixed z-10 top-0 right-0 p-4 bg-green-500 text-white rounded-md shadow-lg">
                            Sản phẩm đã được thêm vào giỏ hàng!
                        </div>
                    )}
                </div>
            </div>

            <hr className="my-8" />

            <p className="text-sm text-gray-600 mb-4">
                <strong>Mô tả:</strong>{' '}
                {product.description || 'Không có mô tả'}
            </p>
            <p className="text-sm text-gray-600 mb-2">
                <strong>SKU:</strong> {product.sku || 'Không có SKU'}
            </p>
            <p className="text-sm text-gray-600 mb-4">
                <strong>Số lượng trong kho:</strong>{' '}
                {product.stock_quantity || 0}
            </p>

            <hr className="my-8" />

            <h2 className="text-lg font-bold mb-4">Đánh giá của khách hàng</h2>
            {product.ProductReviews && product.ProductReviews.length > 0 ? (
                product.ProductReviews.map((review, index) => (
                    <div className="flex items-center mb-4" key={index}>
                        <Avatar
                            src={
                                review.userAvatar ||
                                'https://via.placeholder.com/40'
                            }
                            alt="Avatar"
                            size={40}
                            className="mr-3"
                        />
                        <div>
                            <p className="text-sm font-medium">
                                {review.comment}
                            </p>
                            <span className="text-yellow-500">
                                {review.rating} / 5
                            </span>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500 italic">Chưa có đánh giá nào.</p>
            )}

            <hr className="my-8" />

            <p className="text-sm font-medium text-gray-600 mb-2">
                Trung tâm bán hàng:{' '}
                {product.SalesCenter?.full_name || 'Chưa có thông tin'}
            </p>

            <h2 className="text-lg font-bold mt-8 mb-4">
                Sản phẩm khác có thể bạn thích
            </h2>
            <div className="flex flex-wrap justify-between mt-2">
                {product.Category && (
                    <div className="p-2 text-gray-700">
                        Sản phẩm trong danh mục: {product.Category.name}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductDetails;
