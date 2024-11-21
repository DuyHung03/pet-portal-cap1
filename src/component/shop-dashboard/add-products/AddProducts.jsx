import axiosInstance from '@network/httpRequest';
import { useAuthStore } from '@store/authStore';
import React, { useState } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';
import { uploadImage } from '../../../util/firebaseUtils';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProduct({ onClose, onAddProduct }) {
    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const { user } = useAuthStore();

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            try {
                const url = await uploadImage(file, (progress) =>
                    setUploadProgress(progress),
                );
                console.log('URL hình ảnh:', url);
                setImageUrl(url);
            } catch (err) {
                setError((prev) => ({
                    ...prev,
                    image: 'Lỗi khi tải lên hình ảnh',
                }));
            }
        }
    };

    const handleCancelImage = () => {
        setImage(null);
        setImageUrl('');
        setUploadProgress(0);
    };

    const handlePriceChange = (e) => {
        let value = e.target.value.replace(/\D/g, ''); // Loại bỏ ký tự không phải là số
        if (value) {
            value = parseInt(value).toLocaleString(); // Định dạng tiền tệ
        }
        setPrice(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};

        if (!productName) errors.productName = 'Vui lòng nhập tên sản phẩm';
        if (!category) errors.category = 'Vui lòng chọn danh mục sản phẩm';
        if (
            !price ||
            isNaN(price.replace(/,/g, '')) ||
            parseInt(price.replace(/,/g, '')) <= 0
        )
            errors.price = 'Vui lòng nhập giá hợp lệ';
        if (!stock || isNaN(stock) || stock <= 0)
            errors.stock = 'Vui lòng nhập số lượng tồn hợp lệ';
        if (!imageUrl) errors.images = 'Vui lòng tải lên hình ảnh';

        setError(errors);
        if (Object.keys(errors).length > 0) return;

        const newProduct = {
            sales_center_id: user.id,
            name: productName,
            category_id: category,
            price: parseFloat(price.replace(/,/g, '')), // Xóa dấu phẩy trước khi lưu vào cơ sở dữ liệu
            stock_quantity: parseInt(stock, 10),
            sku: `PRD${Date.now()}`,
            images: imageUrl,
        };
        setIsLoading(true);

        try {
            const response = await axiosInstance.post('/products', newProduct);
            if (response.status === 200 || response.status === 201) {
                console.log('Phản hồi thêm sản phẩm:', response.data);
                onAddProduct(response.data);
                onClose();

                // Hiển thị thông báo thành công
                toast.success('Sản phẩm đã được thêm thành công!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                setError((prev) => ({
                    ...prev,
                    server: 'Thêm sản phẩm không thành công',
                }));
            }
        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm:', error);
            setError((prev) => ({
                ...prev,
                server:
                    error.response?.data?.message ||
                    'Đã xảy ra lỗi khi thêm sản phẩm',
            }));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">Thêm Sản Phẩm Mới</h2>
                <form onSubmit={handleSubmit} noValidate>
                    <label className="block mb-1 font-medium">
                        Tên sản phẩm
                    </label>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className={`w-full p-2 mb-2 border rounded ${error.productName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Nhập tên sản phẩm"
                    />
                    {error.productName && (
                        <p className="text-red-500 mb-2">{error.productName}</p>
                    )}

                    <label className="block mb-1 font-medium">Danh mục</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={`w-full p-2 mb-2 border rounded ${error.category ? 'border-red-500' : 'border-gray-300'}`}
                    >
                        <option value="">Chọn danh mục</option>
                        <option value="1">Thức ăn</option>
                        <option value="2">Sản phẩm</option>
                        <option value="3">Phụ kiện</option>
                    </select>
                    {error.category && (
                        <p className="text-red-500 mb-2">{error.category}</p>
                    )}

                    <label className="block mb-1 font-medium">Giá (VND)</label>
                    <input
                        type="text"
                        value={price}
                        onChange={handlePriceChange}
                        className={`w-full p-2 mb-2 border rounded ${error.price ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Nhập giá sản phẩm"
                    />
                    {error.price && (
                        <p className="text-red-500 mb-2">{error.price}</p>
                    )}

                    <label className="block mb-1 font-medium">
                        Số lượng tồn kho
                    </label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className={`w-full p-2 mb-2 border rounded ${error.stock ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Nhập số lượng tồn kho"
                    />
                    {error.stock && (
                        <p className="text-red-500 mb-2">{error.stock}</p>
                    )}

                    <label className="block mb-1 font-medium">
                        Hình ảnh sản phẩm
                    </label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full mb-2"
                    />
                    {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${uploadProgress}%` }}
                            />
                            <p className="text-xs text-gray-600">
                                Đang tải lên... {uploadProgress}%
                            </p>
                        </div>
                    )}
                    {error.images && (
                        <p className="text-red-500 mb-2">{error.images}</p>
                    )}

                    {imageUrl && (
                        <div className="relative mb-4 border rounded overflow-hidden">
                            <img
                                src={imageUrl}
                                alt="Preview"
                                className="w-full h-32 object-cover"
                            />
                            <button
                                type="button"
                                onClick={handleCancelImage}
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                                title="Hủy bỏ hình ảnh"
                            >
                                <FiX />
                            </button>
                        </div>
                    )}

                    <div className="flex justify-end mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="mr-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className={`px-4 py-2 rounded ${isLoading ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Đang thêm...' : 'Thêm sản phẩm'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddProduct;
