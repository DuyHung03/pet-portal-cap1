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

    const handleDelete = (itemId) => {
        dispatch(removeFromCart({ userId: user?.id, itemId }));
    };

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => (document.body.style.overflow = '');
    }, [isOpen]);

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
                                    // src={item.image}
                                    src={
                                        'https://product.hstatic.net/200000263355/product/z4431095005129_5ae326bc61106bba8c85799a3e176128_f58eeb18c4fb45898b2283344b1c7cf5_master.jpg'
                                    }
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
                    <Link to="/checkout">
                        <Button
                            variant="filled"
                            style={{
                                backgroundColor: '#2d2d2d',
                                color: 'white',
                            }}
                        >
                            Thanh Toán
                        </Button>
                    </Link>
                </Flex>
            </Flex>
        </>
    );
}

export default CartPanel;
