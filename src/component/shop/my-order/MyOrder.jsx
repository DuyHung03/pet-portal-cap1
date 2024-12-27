import React, { useEffect, useRef, useState } from 'react';
import {
    Badge,
    Card,
    Divider,
    Flex,
    Image,
    ScrollArea,
    Text,
    Textarea,
    Button,
    Input,
    Notification,
} from '@mantine/core';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import axiosInstance from '@network/httpRequest';

function MyOrder({ user, handleReviewSubmit }) {
    const [isOrdersOpen, setOrdersOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [reviews, setReviews] = useState({});
    const [activeProductId, setActiveProductId] = useState(null); // Lưu trạng thái product đang được đánh giá
    const [errorMessage, setErrorMessage] = useState('');
    const dropdownRef = useRef(null);

    const toggleOrdersDropdown = () => setOrdersOpen((prev) => !prev);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.id) {
                console.warn('User ID is not available');
                return;
            }
            try {
                const response = await axiosInstance.get(
                    `/orders/pet_owner/${user.id}`,
                );
                if (response.data.success) {
                    setOrders(response.data.data);
                } else {
                    console.error(
                        'Failed to fetch orders:',
                        response.data.message,
                    );
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, [user?.id]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOrdersOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const openReviewForm = (productId) => {
        setActiveProductId(productId); // Chỉ mở form đánh giá cho sản phẩm được chọn
    };

    const closeReviewForm = () => {
        setActiveProductId(null); // Đóng form đánh giá
    };

    const submitReview = async (productId, reviewData) => {
        if (!reviewData.title || !reviewData.comment || !reviewData.rating) {
            setErrorMessage('Vui lòng nhập đầy đủ thông tin đánh giá!');
            return;
        }

        try {
            await handleReviewSubmit(productId, reviewData);
            closeReviewForm(); // Đóng form sau khi gửi thành công
            setReviews((prev) => ({
                ...prev,
                [productId]: { isReviewed: true },
            }));
            setErrorMessage('');
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div style={{ position: 'relative' }} ref={dropdownRef}>
            <div
                style={{
                    cursor: 'pointer',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                }}
                onClick={toggleOrdersDropdown}
            >
                <LocalShippingIcon color="primary" fontSize="large" />
                <Badge
                    color="error"
                    badgeContent={orders.length}
                    style={{ bottom: 15 }}
                />
            </div>

            {isOrdersOpen && (
                <Card
                    shadow="sm"
                    padding="md"
                    style={{
                        position: 'absolute',
                        top: '45px',
                        right: 0,
                        zIndex: 1000,
                        width: '500px',
                        backgroundColor: 'white',
                    }}
                >
                    <Text fw="bold" size="lg" align="center" mb="sm">
                        Đơn hàng của bạn
                    </Text>
                    <Divider my="xs" />
                    <ScrollArea style={{ height: 300 }}>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <div key={order.id}>
                                    <Text
                                        fw="bold"
                                        color="blue"
                                        size="sm"
                                        mb={5}
                                    >
                                        Đơn hàng #{order.id} -{' '}
                                        <Text size="xs" color="green">
                                            {order.status}
                                        </Text>
                                    </Text>
                                    {order.OrderItems.map((item) => (
                                        <Flex
                                            key={item.id}
                                            justify="space-between"
                                            align="center"
                                            mb="xs"
                                            style={{
                                                border: '1px solid #f0f0f0',
                                                padding: '10px',
                                                borderRadius: '8px',
                                            }}
                                        >
                                            <Image
                                                src="https://via.placeholder.com/50"
                                                alt={item.Product.name}
                                                width={50}
                                                height={50}
                                                radius="md"
                                            />
                                            <div
                                                style={{
                                                    flex: 1,
                                                    marginLeft: '10px',
                                                }}
                                            >
                                                <Text size="sm" fw="bold">
                                                    {item.Product.name}
                                                </Text>
                                                <Text size="xs">
                                                    Số lượng: {item.quantity}
                                                </Text>
                                                <Text size="xs">
                                                    Đơn giá:{' '}
                                                    {parseFloat(
                                                        item.unit_price,
                                                    ).toLocaleString()}{' '}
                                                    đ
                                                </Text>
                                            </div>

                                            {order.status === 'Hoàn thành' && (
                                                <>
                                                    {activeProductId ===
                                                    item.product_id ? (
                                                        <div
                                                            style={{ flex: 1 }}
                                                        >
                                                            <Input
                                                                placeholder="Tiêu đề đánh giá"
                                                                value={
                                                                    reviews[
                                                                        item
                                                                            .product_id
                                                                    ]?.title ||
                                                                    ''
                                                                }
                                                                onChange={(e) =>
                                                                    setReviews(
                                                                        (
                                                                            prev,
                                                                        ) => ({
                                                                            ...prev,
                                                                            [item.product_id]:
                                                                                {
                                                                                    ...prev[
                                                                                        item
                                                                                            .product_id
                                                                                    ],
                                                                                    title: e
                                                                                        .target
                                                                                        .value,
                                                                                },
                                                                        }),
                                                                    )
                                                                }
                                                                mb="xs"
                                                            />
                                                            <Textarea
                                                                placeholder="Viết đánh giá của bạn..."
                                                                value={
                                                                    reviews[
                                                                        item
                                                                            .product_id
                                                                    ]
                                                                        ?.comment ||
                                                                    ''
                                                                }
                                                                onChange={(e) =>
                                                                    setReviews(
                                                                        (
                                                                            prev,
                                                                        ) => ({
                                                                            ...prev,
                                                                            [item.product_id]:
                                                                                {
                                                                                    ...prev[
                                                                                        item
                                                                                            .product_id
                                                                                    ],
                                                                                    comment:
                                                                                        e
                                                                                            .target
                                                                                            .value,
                                                                                },
                                                                        }),
                                                                    )
                                                                }
                                                            />
                                                            <Input
                                                                type="number"
                                                                min={1}
                                                                max={5}
                                                                placeholder="Đánh giá (1-5)"
                                                                value={
                                                                    reviews[
                                                                        item
                                                                            .product_id
                                                                    ]?.rating ||
                                                                    ''
                                                                }
                                                                onChange={(e) =>
                                                                    setReviews(
                                                                        (
                                                                            prev,
                                                                        ) => ({
                                                                            ...prev,
                                                                            [item.product_id]:
                                                                                {
                                                                                    ...prev[
                                                                                        item
                                                                                            .product_id
                                                                                    ],
                                                                                    rating: e
                                                                                        .target
                                                                                        .value,
                                                                                },
                                                                        }),
                                                                    )
                                                                }
                                                                mt="xs"
                                                            />
                                                            <Button
                                                                mt="sm"
                                                                size="xs"
                                                                onClick={() =>
                                                                    submitReview(
                                                                        item.product_id,
                                                                        {
                                                                            title:
                                                                                reviews[
                                                                                    item
                                                                                        .product_id
                                                                                ]
                                                                                    ?.title ||
                                                                                '',
                                                                            comment:
                                                                                reviews[
                                                                                    item
                                                                                        .product_id
                                                                                ]
                                                                                    ?.comment ||
                                                                                '',
                                                                            rating:
                                                                                reviews[
                                                                                    item
                                                                                        .product_id
                                                                                ]
                                                                                    ?.rating ||
                                                                                5,
                                                                            is_verified_purchase: true,
                                                                        },
                                                                    )
                                                                }
                                                            >
                                                                Gửi đánh giá
                                                            </Button>
                                                            <Button
                                                                mt="xs"
                                                                size="xs"
                                                                color="gray"
                                                                onClick={
                                                                    closeReviewForm
                                                                }
                                                            >
                                                                Hủy
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <Button
                                                            mt="sm"
                                                            size="xs"
                                                            onClick={() =>
                                                                openReviewForm(
                                                                    item.product_id,
                                                                )
                                                            }
                                                        >
                                                            Đánh giá
                                                        </Button>
                                                    )}
                                                </>
                                            )}
                                        </Flex>
                                    ))}
                                    <Divider my="xs" />
                                </div>
                            ))
                        ) : (
                            <Text align="center" color="gray">
                                Không có đơn hàng nào
                            </Text>
                        )}
                    </ScrollArea>
                    {errorMessage && (
                        <Notification color="red" mt="sm">
                            {errorMessage}
                        </Notification>
                    )}
                </Card>
            )}
        </div>
    );
}

export default MyOrder;
