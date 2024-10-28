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

function ShopHeader() {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useAuthStore();

    const cartItems = useSelector((state) => state.cart.items);
    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
    );
    useEffect(() => {
        dispatch(loadCartFromStorage(user.id));
    }, [dispatch, user.id]);

    const handleSearchClick = () => {
        if (searchValue.trim()) {
            console.log('Searching for:', searchValue);
            navigate(`search?name=${searchValue}`);
        }
    };
    const handleKeyEnter = (event) => {
        if (event.key === 'Enter') handleSearchClick();
    };
    return (
        <Group
            pt={15}
            pb={15}
            justify="center"
            align="center"
            style={{ boxShadow: 'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px' }}
            mx={20}
        >
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
                            height={120}
                            style={{ width: '120px' }}
                        />
                        <Text
                            ff={'Playwrite HU'}
                            c="#165d94"
                            fw={'bold'}
                            style={{ letterSpacing: 1.25 }}
                            size={'30px'}
                            ml={12}
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
                    leftSectionPointerEvents="all"
                    rightSectionPointerEvents="all"
                    leftSection={
                        <Search
                            fontSize="small"
                            onClick={handleSearchClick}
                            style={{ cursor: 'pointer' }}
                        />
                    }
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
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
                />

                <Group>
                    <Link to={'/cart'}>
                        <Badge color="error" badgeContent={cartCount}>
                            <ShoppingCart color="primary" fontSize="large" />
                        </Badge>
                    </Link>
                    {!user ? (
                        <Link to="/login">
                            <Button variant="filled" radius={'md'} size="md">
                                Đăng nhập
                            </Button>
                        </Link>
                    ) : (
                        <Group>
                            <Avatar
                                size={'lg'}
                                allowedInitialsColors={'#dfe6e9'}
                                src={user.avatar_url}
                                name={user.username}
                                color="initials"
                            />
                            <Text size="lg" fw={600} c={'gray'}>
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
                                        <Link to={'/'}>Đăng xuất</Link>
                                    </MenuItem>
                                </MenuDropdown>
                            </Menu>
                        </Group>
                    )}
                </Group>
            </Group>
        </Group>
    );
}

export default ShopHeader;
