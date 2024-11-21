import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@store/authStore';
import { Card, Badge, Text, Flex, Image, Button } from '@mantine/core';
import axiosInstance from '@network/httpRequest';

function ShopStore() {
    const { user } = useAuthStore();
    const [storeInfo, setStoreInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user?.id) {
            const fetchStoreInfo = async () => {
                try {
                    setLoading(true);
                    const response = await axiosInstance.get(
                        `/auth/users/${user.id}`,
                    );
                    setStoreInfo(response.data.user);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchStoreInfo();
        }
    }, [user?.id]);

    if (loading) {
        return <Text align="center">Đang tải thông tin shop...</Text>;
    }

    if (error) {
        console.error('Error fetching store data:', error);
        return <Text align="center">Lỗi khi tải dữ liệu shop.</Text>;
    }

    if (!storeInfo) {
        return <Text align="center">Không có thông tin shop nào.</Text>;
    }

    return (
        <div className="bg-gray-100 w-full min-h-screen">
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
                    {storeInfo.is_store_verified && (
                        <Badge
                            color="orange"
                            variant="light"
                            className="mt-2 font-semibold"
                        >
                            Shop Đã Xác Minh
                        </Badge>
                    )}
                    <Text className="mt-4 text-md text-gray-600">
                        Địa chỉ:{' '}
                        {storeInfo.store_address || 'Chưa cập nhật địa chỉ'}
                    </Text>
                    <Text className="text-md text-gray-600">
                        Liên hệ: {storeInfo.phone || 'Chưa cập nhật'}
                    </Text>
                </div>
            </div>

            {/* Phần Sản Phẩm (Product Section) */}
            <div className="max-w-5xl mx-auto">
                <Text className="text-xl font-bold text-gray-800 mb-5">
                    Các Sản Phẩm
                </Text>
                {/* Nếu không có sản phẩm thì hiển thị placeholder */}
                {storeInfo.products?.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow-md">
                        <Text className="text-lg font-semibold text-gray-600">
                            Hiện tại chưa có sản phẩm nào.
                        </Text>
                        <Text className="text-sm text-gray-500 mt-2">
                            Hãy quay lại sau để xem các sản phẩm mới.
                        </Text>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {/* Placeholder cho sản phẩm */}
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center"
                            >
                                <div className="w-full h-48 bg-gray-300 rounded-lg mb-4"></div>
                                <Text className="text-md font-semibold text-gray-800">
                                    Tên sản phẩm
                                </Text>
                                <Text className="text-sm text-gray-500">
                                    Thể loại sản phẩm
                                </Text>
                                <Text className="text-lg font-bold text-gray-800 mt-2">
                                    $100.00
                                </Text>
                                <Button
                                    variant="light"
                                    color="orange"
                                    className="mt-4 w-full"
                                >
                                    Thêm vào giỏ
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShopStore;
