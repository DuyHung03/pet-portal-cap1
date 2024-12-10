/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { Button, CloseButton, Flex, Text, Overlay, Image } from '@mantine/core';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { removeFromCart } from '../../../redux/slice/cartSlice';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useAuthStore } from '../../../store/authStore';
import axiosInstance from '@network/httpRequest';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

function CartPanel({ onClose, isOpen }) {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const { user } = useAuthStore();

    const subTotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
    );
    const totalQuantity = cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
    );

    const handleDelete = (itemId) => {
        dispatch(removeFromCart({ userId: user?.id, itemId }));
    };

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => (document.body.style.overflow = '');
    }, [isOpen]);

    const handleSaveOrder = async () => {
        if (totalQuantity === 0) {
            alert(
                'Giỏ hàng của bạn đang trống! Vui lòng thêm sản phẩm trước khi thanh toán.',
            );
            return;
        }

        const orderData = {
            petOwner_id: user.id,
            items: cartItems.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
                price: parseFloat(item.price),
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
            console.error('Lỗi khi lưu đơn hàng:', error);
            alert('Không thể lưu đơn hàng. Vui lòng thử lại!');
        }
    };
    return (
        <>
            {isOpen && (
                <Overlay
                    color="rgba(0, 0, 0, 0.5)"
                    onClick={onClose}
                    style={{ zIndex: 99 }}
                />
            )}
            <Flex
                direction="column"
                css={css`
                    position: fixed;
                    top: 0;
                    right: 0;
                    width: 400px;
                    height: 100%;
                    background-color: white;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
                    z-index: 100;
                    overflow: hidden;
                    animation: ${isOpen ? slideIn : slideOut} 0.4s ease;
                `}
            >
                <Flex justify="space-between" align="center" px={20} py={15}>
                    <Text fw="bold" size="lg">
                        Giỏ Hàng
                    </Text>
                    <CloseButton onClick={onClose} />
                </Flex>

                <Flex direction="column" p={20} mb={10} style={{ flexGrow: 1 }}>
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <Flex
                                key={item.id}
                                justify="space-between"
                                align="center"
                                mb={10}
                            >
                                <Image
                                    src={item.images}
                                    style={{
                                        objectFit: 'cover',
                                        maxWidth: '50px',
                                        maxHeight: '50px',
                                    }}
                                    alt={item.name}
                                />
                                <Flex direction="column" ml={10}>
                                    <Text>{item.name}</Text>
                                    <Text>
                                        {parseInt(item.price).toLocaleString()}{' '}
                                        đ x {item.quantity}
                                    </Text>
                                </Flex>
                                <IconButton
                                    aria-label="delete"
                                    color="error"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    <ClearIcon />
                                </IconButton>
                            </Flex>
                        ))
                    ) : (
                        <Text align="center" mt={20} color="gray">
                            Giỏ hàng của bạn trống
                        </Text>
                    )}
                    <Flex
                        justify="space-between"
                        align="center"
                        mt="auto"
                        pt={10}
                    >
                        <Text fw="bold">Tổng Tiền :</Text>
                        <Text fw="bold">
                            {/* {parseInt(subTotal).toLocaleString()} VND */}
                            {subTotal.toLocaleString('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                        </Text>
                    </Flex>
                </Flex>
                <Flex
                    direction="row"
                    justify="center"
                    p={20}
                    style={{
                        borderTop: '1px solid #ddd',
                        backgroundColor: 'white',
                    }}
                >
                    <Link to="/shop/cart">
                        <Button
                            variant="default"
                            style={{
                                backgroundColor: '#2d665c',
                                color: 'white',
                                marginRight: '10px',
                            }}
                            onClick={onClose}
                        >
                            Xem Giỏ Hàng
                        </Button>
                    </Link>
                    {/* <Link to="/checkout"> */}
                    <Button
                        variant="filled"
                        style={{
                            backgroundColor: '#2d2d2d',
                            color: 'white',
                        }}
                        onClick={handleSaveOrder}
                    >
                        Thanh Toán
                    </Button>
                    {/* </Link> */}
                </Flex>
            </Flex>
        </>
    );
}

export default CartPanel;
