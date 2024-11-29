import axiosInstance from '@network/httpRequest';
import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

function EditProduct({ product, onClose, onUpdateProduct }) {
    const [productName, setProductName] = useState(product?.name || '');
    const [category, setCategory] = useState(product?.category_id || '');
    const [price, setPrice] = useState(product?.price || '');
    const [stock, setStock] = useState(product?.stock_quantity || '');
    const [imageUrl, setImageUrl] = useState(product?.images || '');
    const [description, setDescription] = useState(product?.description || '');
    const [error, setError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('/categories');
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

    useEffect(() => {
        if (product) {
            const formattedPrice = parseInt(product.price, 10).toLocaleString();
            setPrice(formattedPrice);
        }
    }, [product]);
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
            value = parseInt(value, 10);
            setPrice(value.toLocaleString());
        }
    };
    const validate = () => {
        const newError = {};

        if (!productName) newError.productName = 'Tên sản phẩm là bắt buộc.';
        if (!category) newError.category = 'Danh mục là bắt buộc.';
        if (!description)
            newError.description = 'Mô tả sản phẩm không được để trống.';

        if (!price || price <= 0) {
            newError.price = 'Giá sản phẩm phải lớn hơn 0.';
        }

        if (stock < 0) {
            newError.stock = 'Số lượng tồn kho không được là số âm.';
        }

        setError(newError);

        return Object.keys(newError).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleanedPrice = parseInt(price.replace(/\D/g, ''), 10);
        if (validate()) {
            const updatedProduct = {
                ...product,
                name: productName,
                category_id: category,
                price: cleanedPrice,
                stock_quantity: stock,
                images: imageUrl,
            };

            onUpdateProduct(updatedProduct);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">Chỉnh sửa Sản Phẩm</h2>
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
                            type="button"
                            onClick={onClose}
                            className="w-20 ml-5 p-3 bg-[#008B8B] text-white rounded-lg "
                        >
                            Huỷ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProduct;
