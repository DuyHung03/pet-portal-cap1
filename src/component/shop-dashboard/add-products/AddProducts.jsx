import axiosInstance from '@network/httpRequest';
import { useAuthStore } from '@store/authStore';
import React, { useState, useEffect } from 'react';
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
    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryType, setNewCategoryType] = useState('Product');
    const [description, setDescription] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuthStore();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('/categories'); // Gọi API
                if (response.status === 200) {
                    const { data } = response.data;
                    setCategories(data);
                }
            } catch (err) {
                console.error('Lỗi khi lấy danh mục:', err);
                toast.error('Không thể tải danh mục sản phẩm.');
            }
        };

        fetchCategories();
    }, []);

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
        let value = e.target.value.replace(/\D/g, '');
        if (value) {
            value = parseInt(value).toLocaleString();
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
            description: description,
            price: parseFloat(price.replace(/,/g, '')),
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

    const handleAddCategory = async () => {
        if (!newCategoryName || !newCategoryType) {
            toast.error('Vui lòng nhập tên và loại danh mục mới.');
            return;
        }

        try {
            const response = await axiosInstance.post('/categories', {
                name: newCategoryName,
                type: newCategoryType,
            });
            if (response.status === 200) {
                setCategories([...categories, response.data.data]);
                setCategory(response.data.data.id);
                setNewCategoryName('');
                setNewCategoryType('Product');
                setIsModalOpen(false);
                toast.success('Danh mục đã được thêm thành công!');
            }
        } catch (err) {
            console.error('Lỗi khi thêm danh mục:', err);
            toast.error('Không thể thêm danh mục.');
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
                        className={`w-full p-2 mb-2 border rounded ${
                            error.category
                                ? 'border-red-500'
                                : 'border-gray-300'
                        }`}
                    >
                        <option value="">Chọn danh mục</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    {error.category && (
                        <p className="text-red-500 mb-2">{error.category}</p>
                    )}
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="text-blue-600 underline my-2"
                    >
                        + Thêm danh mục mới
                    </button>
                    <label className="block mb-1 font-medium">
                        Mô tả sản phẩm
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={`w-full p-2 mb-2 border rounded ${error.description ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Nhập mô tả sản phẩm"
                    />
                    {error.description && (
                        <p className="text-red-500 mb-2">{error.description}</p>
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
                    {uploadProgress > 0 && (
                        <div className="mb-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${uploadProgress}%` }}
                            ></div>
                        </div>
                    )}
                    {error.images && (
                        <p className="text-red-500 mb-2">{error.images}</p>
                    )}

                    {imageUrl && (
                        <div className="mb-2">
                            <img
                                src={imageUrl}
                                alt="Ảnh sản phẩm"
                                className="w-32 h-32 object-cover rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={handleCancelImage}
                                className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white"
                            >
                                <FiX />
                            </button>
                        </div>
                    )}

                    <div className="flex ">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full p-3 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
                        >
                            {isLoading
                                ? 'Đang thêm sản phẩm...'
                                : 'Thêm sản phẩm'}
                        </button>
                        <button
                            type="cancel"
                            onClick={onClose}
                            className="w-20 ml-5 p-3 bg-[#008B8B] text-white rounded-lg "
                        >
                            Huỷ
                        </button>
                    </div>
                </form>

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h3 className="text-xl font-semibold mb-4">
                                Thêm danh mục mới
                            </h3>
                            <input
                                type="text"
                                value={newCategoryName}
                                onChange={(e) =>
                                    setNewCategoryName(e.target.value)
                                }
                                className="w-full p-2 mb-4 border rounded"
                                placeholder="Nhập tên danh mục"
                            />

                            <select
                                value={newCategoryType}
                                onChange={(e) =>
                                    setNewCategoryType(e.target.value)
                                }
                                className="w-full p-2 mb-4 border rounded"
                            >
                                <option value="Product">Sản phẩm</option>
                                <option value="Service">Dịch vụ</option>
                                <option value="Pet">Thú cưng</option>
                            </select>
                            <button
                                onClick={handleAddCategory}
                                className="w-full p-2 bg-green-600 text-white rounded-lg"
                            >
                                Thêm danh mục
                            </button>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-full p-2 mt-2 bg-gray-300 rounded-lg"
                            >
                                Hủy
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddProduct;
