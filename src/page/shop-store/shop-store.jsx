import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@store/authStore';
import { Text } from '@mantine/core';
import axiosInstance from '@network/httpRequest';
import Product from '../../component/shop/shop-product/Product';

function ShopStore() {
    const { user } = useAuthStore();
    const [storeInfo, setStoreInfo] = useState(null);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStoreInfo = async () => {
            try {
                const response = await axiosInstance.get(
                    `/auth/users/${user?.id}`,
                );
                setStoreInfo(response.data.user);
            } catch (err) {
                setError('Không thể tải thông tin shop.');
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get(
                    `/products/seller/${user?.id}`,
                );
                setProducts(response.data.data || []);
            } catch (err) {
                setError('Không thể tải danh sách sản phẩm.');
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('/categories');
                const categoriesData = response.data.reduce((acc, category) => {
                    acc[category.id] = category.name;
                    return acc;
                }, {});
                setCategories(categoriesData);
            } catch (err) {
                console.error('Lỗi khi tải danh mục:', err.message);
            }
        };

        if (user?.id) {
            setLoading(true);
            Promise.all([
                fetchStoreInfo(),
                fetchProducts(),
                fetchCategories(),
            ]).finally(() => setLoading(false));
        }
    }, [user?.id]);

    if (loading) {
        return <Text align="center">Đang tải dữ liệu...</Text>;
    }

    if (error) {
        console.error('Error:', error);
        return <Text align="center">{error}</Text>;
    }

    if (!storeInfo) {
        return <Text align="center">Không có thông tin shop nào.</Text>;
    }

    return (
        <div className="bg-gray-100 w-full min-h-screen">
            {/* Thông tin shop */}
            <div className="bg-white flex items-center p-6 max-w-5xl mx-auto rounded-lg shadow-md mb-8">
                <img
                    src={
                        storeInfo.store_logo ||
                        'https://via.placeholder.com/120'
                    }
                    alt={`${storeInfo.store_name || 'Shop'} Logo`}
                    className="w-36 h-36 rounded-full object-cover border-4 border-orange-500"
                />
                <div className="ml-6">
                    <Text className="text-3xl font-bold text-gray-800">
                        {storeInfo.store_name || 'Shop Không Tên'}
                    </Text>
                    <Text className="text-sm text-gray-500 italic mb-3">
                        {storeInfo.store_description ||
                            'Mô tả shop đang cập nhật...'}
                    </Text>
                </div>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="max-w-5xl mx-auto">
                <Text className="text-xl font-bold text-gray-800 mb-5">
                    Các Sản Phẩm
                </Text>
                {products.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-md">
                        <Text className="text-lg font-semibold text-gray-600">
                            Hiện tại chưa có sản phẩm nào.
                        </Text>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Product
                                key={product.id}
                                product={{
                                    ...product,
                                    Category: {
                                        name:
                                            categories[product.category_id] ||
                                            'Chưa có thể loại',
                                    },
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShopStore;
