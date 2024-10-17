import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addToCart } from '@redux/slice/cartSlice';

function ProductDetails() {
  const location = useLocation();
  const { product } = location.state;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false); // State để theo dõi khi sản phẩm được thêm vào giỏ hàng

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    setAddedToCart(true);
    setTimeout(() => {
      setAddedToCart(false);
    }, 2000);
  };

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
          src="https://product.hstatic.net/200000263355/product/z4431095005129_5ae326bc61106bba8c85799a3e176128_f58eeb18c4fb45898b2283344b1c7cf5_master.jpg"
          alt={product.name}
          className="w-64 h-64 object-cover rounded-md shadow-md"
        />

        <div className="flex-1 p-4">
          <h1 className="text-2xl font-bold text-blue-800 mb-2 uppercase tracking-wide">
            {product.name}
          </h1>

          <p className="text-lg text-red-600 font-semibold mb-2">
            Giá: ${product.price}
          </p>

          <span className="bg-blue-500 text-white px-2 py-1 rounded-full mb-2">
            Danh mục: {product.Category.name}
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
              max={product.stock_quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="ml-2 w-16 border border-gray-300 rounded-md px-2"
              aria-label="Số lượng sản phẩm"
            />
          </div>

          <div className="flex items-center mb-2">
            <span className="font-medium">Đánh giá:</span>
            <span className="text-yellow-500 ml-2">
              {(
                product.ProductReviews.reduce(
                  (acc, review) => acc + review.rating,
                  0,
                ) / product.ProductReviews.length
              ).toFixed(1)}{' '}
              / 5
            </span>
            <span className="text-gray-500 ml-1">
              ({product.ProductReviews.length} đánh giá)
            </span>
          </div>

          <button
            className="bg-gradient-to-r from-teal-400 to-lime-400 text-white font-bold py-2 px-4 rounded-xl mt-4 hover:scale-105 transition-transform"
            onClick={handleAddToCart}
          >
            Thêm vào giỏ hàng
          </button>

          {/* Hiển thị thông báo đã thêm vào giỏ hàng */}
          {addedToCart && (
            <div className="absolute top-0 right-0 p-4 bg-green-500 text-white rounded-md shadow-lg">
              Sản phẩm đã được thêm vào giỏ hàng!
            </div>
          )}
        </div>
      </div>
      <hr className="my-8" />
      <p className="text-sm text-gray-600 mb-4">
        <strong>Mô tả:</strong> {product.description}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        <strong>SKU:</strong> {product.sku}
      </p>
      <p className="text-sm text-gray-600 mb-4">
        <strong>Số lượng trong kho:</strong> {product.stock_quantity}
      </p>
      <hr className="my-8" />
      <h2 className="text-lg font-bold mb-4">Đánh giá của khách hàng</h2>
      {product.ProductReviews.length > 0 ? (
        product.ProductReviews.map((review) => (
          <div className="flex items-center mb-4" key={review.id}>
            <Avatar
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdhHe79aHGHO5SfYZ01rniGOn7--_yPBXC4HIlynkunrmLLU3rli-La4uyaHQq76-ywBUL6RDQ_qzZ4FxW39LM4ERCN9balNn4FJwRUQ"
              alt="Avatar"
              size={40}
              className="mr-3"
            />
            <div>
              <p className="text-sm font-medium">{review.comment}</p>
              <span className="text-yellow-500">{review.rating} / 5</span>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 italic">Chưa có đánh giá nào.</p>
      )}

      <hr className="my-8" />

      <p className="text-sm font-medium text-gray-600 mb-2">
        Trung tâm bán hàng:{' '}
        {product.SalesCenter.full_name || 'Chưa có thông tin'}
      </p>

      <h2 className="text-lg font-bold mt-8 mb-4">
        Sản phẩm khác có thể bạn thích
      </h2>
      <div className="flex flex-wrap justify-between mt-2">
        <div className="p-2 text-gray-700">Sản phẩm 1</div>
        <div className="p-2 text-gray-700">Sản phẩm 2</div>
        <div className="p-2 text-gray-700">Sản phẩm 3</div>
        <div className="p-2 text-gray-700">Sản phẩm 4</div>
      </div>
    </div>
  );
}

export default ProductDetails;
