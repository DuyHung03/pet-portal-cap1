import { Group, Text } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <Group w={'100%'} justify='center' align='center' bg={'#f5f5f5'}>
            <Group maw={1200}>
                <Link to={'/'}>
                    <Text
                        c={isActive('/') ? 'white' : 'dark'}
                        size='xl'
                        pr={12}
                        pl={12}
                        pt={6}
                        pb={6}
                        bg={isActive('/') ? 'blue' : 'transparent'}
                    >
                        Trang chủ
                    </Text>
                </Link>
                <Link to={'/about'}>
                    <Text
                        c={isActive('/about') ? 'white' : 'dark'}
                        fw={500}
                        size='xl'
                        pr={12}
                        pl={12}
                        pt={6}
                        pb={6}
                        bg={isActive('/about') ? '#dfe6e9' : 'transparent'}
                    >
                        Giới thiệu
                    </Text>
                </Link>
                <Link to={'/service'}>
                    <Text
                        fw={500}
                        c={isActive('/service') ? 'white' : 'dark'}
                        size='xl'
                        pr={12}
                        pl={12}
                        pt={6}
                        pb={6}
                        bg={isActive('/service') ? '#dfe6e9' : 'transparent'}
                    >
                        Dịch vụ
                    </Text>
                </Link>
                <Link to={'/product'}>
                    <Text
                        c={isActive('/product') ? 'white' : 'dark'}
                        size='xl'
                        fw={500}
                        pr={12}
                        pl={12}
                        pt={6}
                        pb={6}
                        bg={isActive('/product') ? '#dfe6e9' : 'transparent'}
                    >
                        Sản phẩm
                    </Text>
                </Link>
                <Link to={'/product'}>
                    <Text
                        c={isActive('/product') ? 'white' : 'dark'}
                        size='xl'
                        fw={500}
                        pr={12}
                        pl={12}
                        pt={6}
                        pb={6}
                        bg={isActive('/product') ? '#dfe6e9' : 'transparent'}
                    >
                        Đặt lịch hẹn
                    </Text>
                </Link>
            </Group>
        </Group>
    );
}

export default NavBar;
