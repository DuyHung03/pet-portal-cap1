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
  UnstyledButton,
} from '@mantine/core';
import { AccountCircle, ExpandMore, Logout } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { useAuthStore } from '../../store/authStore';

function Header({ title }) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
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
            justify='center'
            align='center'
            style={{ boxShadow: 'rgba(33, 35, 38, 0.1) 0px 10px 10px -10px', zIndex: '10' }}
        >
            <Group display={'flex'} justify='space-between' align='center' maw={1440} w={'100%'}>
                <a href='/'>
                    <Flex direction={'row'} align='center'>
                        <Image alt='logo' src={logo} style={{ width: '120px' }} height={120} />
                        <Text
                            ff={'Playwrite HU'}
                            c='#165d94'
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
                        <Link to='/signup'>
                            <Button variant='outline' radius={'md'} size='md'>
                                Đăng kí
                            </Button>
                        </Link>
                        <Link to='/login'>
                            <Button variant='filled' radius={'md'} size='md'>
                                Đăng nhập
                            </Button>
                        </Link>
                    </Group>
                ) : (
                    <Group>
                        <Avatar
                            size={'lg'}
                            allowedInitialsColors={'#dfe6e9'}
                            src={user.avatar_url}
                            name={user.username}
                            color='initials'
                        />
                        <Text size='lg' fw={600} c={'gray'}>
                            {user.username}
                        </Text>
                        <Menu>
                            <MenuTarget>
                                <UnstyledButton>
                                    <ExpandMore color='action' />
                                </UnstyledButton>
                            </MenuTarget>

                            <MenuDropdown>
                                <MenuItem leftSection={<AccountCircle color='action' />}>
                                    <Link to={'/'}>Thông tin cá nhân</Link>
                                </MenuItem>
                                <MenuItem
                                    leftSection={<Logout color='error' />}
                                    onClick={handleLogout}
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
