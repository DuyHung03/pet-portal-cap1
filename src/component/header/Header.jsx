import {
    Avatar,
    Button,
    Flex,
    Group,
    Image,
    Menu,
    MenuDropdown,
    MenuItem,
    MenuTarget,
    Text,
} from '@mantine/core';
import {
    AccountCircle,
    Logout,
    MedicalInformation,
    Store,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { clearCart } from '../../redux/slice/cartSlice';
import { useAuthStore } from '../../store/authStore';
function Header({ title }) {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await logout();
            dispatch(clearCart(user.id));
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <Group
            w={'100%'}
            bg={'white'}
            pt={15}
            pb={15}
            justify="center"
            align="center"
        >
            <Group
                display={'flex'}
                justify="space-between"
                align="center"
                bg={'white'}
                maw={1440}
                w={'100%'}
            >
                <a href="/">
                    <Flex direction={'row'} align="center">
                        <Image
                            alt="logo"
                            src={logo}
                            style={{ width: '120px' }}
                            height={120}
                        />
                        <Text
                            ff={'Playwrite HU'}
                            c="#165d94"
                            fw={'bold'}
                            style={{ letterSpacing: 1.25 }}
                            size={'30px'}
                            ml={12}
                        >
                            {title}
                        </Text>
                    </Flex>
                </a>
                {!user ? (
                    <Group>
                        <Link to="/signup">
                            <Button variant="outline" radius={'md'} size="md">
                                Đăng kí
                            </Button>
                        </Link>
                        <Link to="/login">
                            <Button variant="filled" radius={'md'} size="md">
                                Đăng nhập
                            </Button>
                        </Link>
                    </Group>
                ) : (
                    <Group>
                        <Menu trigger="hover" shadow="sm">
                            <MenuTarget>
                                <Group style={{ cursor: 'pointer' }}>
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
                                </Group>
                            </MenuTarget>

                            <MenuDropdown>
                                <MenuItem
                                    leftSection={
                                        <AccountCircle color="action" />
                                    }
                                >
                                    <Link to={'/account'}>
                                        Tài khoản của tôi
                                    </Link>
                                </MenuItem>
                                {user?.role?.includes('Doctor') ? (
                                    <MenuItem
                                        leftSection={
                                            <MedicalInformation color="action" />
                                        }
                                    >
                                        <Link
                                            to={'/doctor-dashboard'}
                                            target="_blank"
                                        >
                                            Quản lý phòng khám
                                        </Link>
                                    </MenuItem>
                                ) : null}
                                {user?.role?.includes('Seller') ? (
                                    <MenuItem
                                        leftSection={<Store color="action" />}
                                    >
                                        <Link
                                            to={'/shop-dashboard'}
                                            target="_blank"
                                        >
                                            Quản lý cửa hàng
                                        </Link>
                                    </MenuItem>
                                ) : null}
                                <Menu.Divider />
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
        </Group>
    );
}

export default Header;
