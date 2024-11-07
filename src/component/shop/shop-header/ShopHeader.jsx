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
} from '@mantine/core';
import {
    AccountCircle,
    ExpandMore,
    Logout,
    Search,
    ShoppingCart,
} from '@mui/icons-material';
import { Badge } from '@mui/material';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { useAuthStore } from '../../../store/authStore';
import { useSelector, useDispatch } from 'react-redux';
import { loadCartFromStorage } from '../../../redux/slice/cartSlice';
import CartPanel from '../shop-header-cart/shop-header-cart';

function ShopHeader() {
    const [searchValue, setSearchValue] = useState('');
    const [isCartOpen, setCartOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useAuthStore();

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
            navigate(`search?name=${searchValue}`);
        }
    };

    const handleKeyEnter = (event) => {
        if (event.key === 'Enter') handleSearchClick();
    };

    const openCartPanel = () => setCartOpen(true);
    const closeCartPanel = () => setCartOpen(false);

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
                    <Badge color="error" badgeContent={cartCount}>
                        <ShoppingCart
                            color="primary"
                            fontSize="large"
                            onClick={openCartPanel}
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
                                    >
                                        <Link to={'/logout'}>Đăng xuất</Link>
                                    </MenuItem>
                                </MenuDropdown>
                            </Menu>
                        </Group>
                    )}
                </Group>

                {isCartOpen && (
                    <CartPanel isOpen={isCartOpen} onClose={closeCartPanel} />
                )}
            </Group>
        </Group>
    );
}

export default ShopHeader;
