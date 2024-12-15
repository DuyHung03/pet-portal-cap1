import React, { useState, useEffect } from 'react';
import {
    Avatar,
    Button,
    CloseButton,
    Flex,
    Group,
    Image,
    Input,
    Menu,
    MenuDropdown,
    MenuItem,
    MenuTarget,
    Text,
    UnstyledButton,
    Card,
    Divider,
    ScrollArea,
} from '@mantine/core';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {
    AccountCircle,
    ExpandMore,
    Logout,
    Search,
    ShoppingCart,
} from '@mui/icons-material';
import { Badge } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { useAuthStore } from '../../../store/authStore';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, loadCartFromStorage } from '../../../redux/slice/cartSlice';
import { setSearchQuery } from '@redux/slice/shopSlice';
import CartPanel from '../shop-header-cart/shop-header-cart';

function ShopHeader() {
    const [searchValue, setSearchValue] = useState('');
    const [isCartOpen, setCartOpen] = useState(false);
    const [isOrdersOpen, setOrdersOpen] = useState(false); // State dropdown đơn hàng
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, logout } = useAuthStore();

    const cartItems = useSelector((state) => state.cart.items);
    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
    );

    // Giả lập dữ liệu đơn hàng
    const orders = [
        {
            id: '001',
            date: '2024-12-15',
            image: 'https://via.placeholder.com/50',
            description: 'Sản phẩm 1 ',
            total: 300000,
        },
        {
            id: '002',
            date: '2024-12-14',
            image: 'https://via.placeholder.com/50',
            description: 'Sản phẩm 2 ',
            total: 500000,
        },
    ];

    useEffect(() => {
        dispatch(loadCartFromStorage(user?.id || 0));
    }, [dispatch, user?.id]);

    const handleSearchClick = () => {
        dispatch(setSearchQuery(searchValue.trim() || ''));
    };
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };
    const handleKeyEnter = (event) => {
        if (event.key === 'Enter') handleSearchClick();
    };

    const toggleOrdersDropdown = () => setOrdersOpen((prev) => !prev);

    return (
        <Group pt={10} pb={10} justify="center" align="center" mx={20}>
            <Group
                display={'flex'}
                justify="space-between"
                align="center"
                maw={1440}
                w={'100%'}
            >
                <a href="/">
                    <Flex direction={'row'} align="center">
                        <Image
                            alt="logo"
                            src={logo}
                            height={80}
                            style={{ width: '80px' }}
                        />
                        <Text
                            ff={'Playwrite HU'}
                            c="#165d94"
                            fw={'bold'}
                            style={{ letterSpacing: 1 }}
                            size={'28px'}
                            ml={10}
                        >
                            Cửa hàng
                        </Text>
                    </Flex>
                </a>

                <Input
                    onKeyDown={handleKeyEnter}
                    w={450}
                    radius={'xl'}
                    size="md"
                    placeholder="Tìm kiếm"
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
                            size={'sm'}
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
                    <div style={{ position: 'relative' }}>
                        <div
                            style={{
                                cursor: 'pointer',
                                padding: '8px 12px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                            onClick={toggleOrdersDropdown}
                        >
                            <LocalShippingIcon
                                color="primary"
                                fontSize="large"
                            />

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
                                    width: '400px',
                                    backgroundColor: 'white',
                                }}
                            >
                                <Text
                                    fw="bold"
                                    size="lg"
                                    align="center"
                                    mb="sm"
                                >
                                    Đơn hàng của bạn
                                </Text>
                                <Divider my="xs" />
                                <ScrollArea style={{ height: 250 }}>
                                    {orders.length > 0 ? (
                                        orders.map((order) => (
                                            <Flex
                                                key={order.id}
                                                justify="space-between"
                                                align="center"
                                                mb="xs"
                                                style={{
                                                    border: '1px solid #f0f0f0',
                                                    padding: '10px',
                                                    borderRadius: '8px',
                                                    boxShadow:
                                                        '0 2px 5px rgba(0,0,0,0.1)',
                                                    transition: 'all 0.3s',
                                                }}
                                            >
                                                <Image
                                                    src={order.image}
                                                    alt={order.description}
                                                    width={50}
                                                    height={50}
                                                    radius="md"
                                                    style={{ flexShrink: 0 }}
                                                />

                                                <div
                                                    style={{
                                                        flex: 1,
                                                        marginLeft: '10px',
                                                    }}
                                                >
                                                    <Text
                                                        size="sm"
                                                        fw="bold"
                                                        c="blue"
                                                    >
                                                        {order.description}
                                                    </Text>
                                                    <Text
                                                        size="xs"
                                                        color="gray"
                                                        mt="4px"
                                                    >
                                                        Ngày đặt: {order.date}
                                                    </Text>
                                                    <Text
                                                        size="xs"
                                                        color="green"
                                                        mt="4px"
                                                    >
                                                        Trạng thái: Đang giao
                                                    </Text>
                                                    <Text
                                                        size="xs"
                                                        color="black"
                                                        mt="4px"
                                                    >
                                                        Số sản phẩm: 2
                                                    </Text>
                                                </div>

                                                <Text
                                                    size="sm"
                                                    fw="bold"
                                                    style={{
                                                        textAlign: 'right',
                                                    }}
                                                >
                                                    {order.total.toLocaleString()}
                                                    đ
                                                </Text>
                                            </Flex>
                                        ))
                                    ) : (
                                        <Text align="center" color="gray">
                                            Không có đơn hàng nào
                                        </Text>
                                    )}
                                </ScrollArea>
                            </Card>
                        )}
                    </div>

                    <Badge color="error" badgeContent={cartCount}>
                        <ShoppingCart
                            color="primary"
                            fontSize="large"
                            onClick={() => setCartOpen(true)}
                            style={{ cursor: 'pointer' }}
                        />
                    </Badge>

                    {!user ? (
                        <Link to="/login">
                            <Button variant="filled" radius={'md'} size="md">
                                Đăng nhập
                            </Button>
                        </Link>
                    ) : (
                        <Group>
                            <Avatar src={user.avatar_url} alt={user.username} />
                            <Text size="lg" fw={600} color={'gray'}>
                                {user.username}
                            </Text>
                            <Menu>
                                <MenuTarget>
                                    <UnstyledButton>
                                        <ExpandMore color="action" />
                                    </UnstyledButton>
                                </MenuTarget>
                                <MenuDropdown>
                                    <MenuItem
                                        leftSection={
                                            <AccountCircle color="action" />
                                        }
                                    >
                                        <Link to={'/account'}>
                                            Thông tin cá nhân
                                        </Link>
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

                {/* Cart Panel */}
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
