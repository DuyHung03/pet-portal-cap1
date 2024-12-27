import React, { useState, useEffect } from 'react';
import {
    Avatar,
    Button,
    Flex,
    Group,
    Image,
    Input,
    Text,
    CloseButton,
    Menu,
    MenuTarget,
    MenuDropdown,
    MenuItem,
} from '@mantine/core';
import {
    Search,
    ShoppingCart,
    AccountCircle,
    Logout,
    ExpandMore,
} from '@mui/icons-material';
import { Badge } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { useAuthStore } from '../../../store/authStore';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, loadCartFromStorage } from '@redux/slice/cartSlice';
import { setSearchQuery } from '@redux/slice/shopSlice';
import MyOrder from '../my-order/MyOrder';
import axiosInstance from '@network/httpRequest';
import CartPanel from '../shop-header-cart/shop-header-cart';
function ShopHeader() {
    const [searchValue, setSearchValue] = useState('');
    const [isCartOpen, setCartOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, logout } = useAuthStore();

    const cartItems = useSelector((state) => state.cart.items);
    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
    );
    useEffect(() => {
        dispatch(loadCartFromStorage(user?.id || 0));
    }, [dispatch, user?.id]);

    const handleSearchClick = () => {
        if (searchValue.trim()) {
            dispatch(setSearchQuery(searchValue.trim()));
            navigate(`/search?query=${searchValue.trim()}`);
        }
    };

    const handleKeyEnter = (event) => {
        if (event.key === 'Enter') handleSearchClick();
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const handleReviewSubmit = async (productId, reviewData) => {
        try {
            await axiosInstance.post(`/reviews`, {
                petOwner_Id: user.id,
                product_id: productId,
                ...reviewData,
            });
            alert('Đánh giá đã được gửi thành công!');
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Có lỗi xảy ra khi gửi đánh giá.');
        }
    };

    return (
        <Group pt={10} pb={10} justify="center" align="center" mx={20}>
            <Group
                display="flex"
                justify="space-between"
                align="center"
                maw={1440}
                w="100%"
            >
                {/* Logo */}
                <Link to="/">
                    <Flex direction="row" align="center">
                        <Image
                            alt="logo"
                            src={logo}
                            height={80}
                            style={{ width: '80px' }}
                        />
                        <Text
                            ff="Playwrite HU"
                            c="#165d94"
                            fw="bold"
                            style={{ letterSpacing: 1 }}
                            size="28px"
                            ml={10}
                        >
                            Cửa hàng
                        </Text>
                    </Flex>
                </Link>

                {/* Input tìm kiếm */}
                <Input
                    onKeyDown={handleKeyEnter}
                    w={450}
                    radius="xl"
                    size="md"
                    placeholder="Tìm kiếm sản phẩm..."
                    leftSection={
                        <Search
                            fontSize="small"
                            onClick={handleSearchClick}
                            style={{ cursor: 'pointer' }}
                        />
                    }
                    rightSection={
                        <CloseButton
                            aria-label="Clear input"
                            size="sm"
                            onClick={() => setSearchValue('')}
                            style={{
                                display: searchValue ? undefined : 'none',
                            }}
                        />
                    }
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                />

                <Group>
                    <MyOrder
                        user={user}
                        handleReviewSubmit={handleReviewSubmit}
                    />

                    <Badge color="error" badgeContent={cartCount}>
                        <ShoppingCart
                            color="primary"
                            fontSize="large"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setCartOpen(true)}
                        />
                    </Badge>

                    {!user ? (
                        <Link to="/login">
                            <Button variant="filled" radius="md" size="md">
                                Đăng nhập
                            </Button>
                        </Link>
                    ) : (
                        <Group>
                            <Avatar src={user.avatar_url} alt={user.username} />
                            <Text size="lg" fw={600} color="gray">
                                {user.username}
                            </Text>
                            <Menu>
                                <MenuTarget>
                                    <Button variant="subtle" radius="xl">
                                        <ExpandMore color="action" />
                                    </Button>
                                </MenuTarget>
                                <MenuDropdown>
                                    <MenuItem
                                        leftSection={
                                            <AccountCircle color="action" />
                                        }
                                        onClick={() => navigate('/account')}
                                    >
                                        Thông tin cá nhân
                                    </MenuItem>
                                    <MenuItem
                                        leftSection={<Logout color="error" />}
                                        onClick={handleLogout}
                                        color="red"
                                    >
                                        Đăng xuất
                                    </MenuItem>
                                </MenuDropdown>
                            </Menu>
                        </Group>
                    )}
                </Group>
                {isCartOpen && (
                    <CartPanel
                        isOpen={isCartOpen}
                        onClose={() => setCartOpen(false)}
                    />
                )}
            </Group>
        </Group>
    );
}

export default ShopHeader;
