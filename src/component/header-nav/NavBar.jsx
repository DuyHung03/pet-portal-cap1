import { Group, Text } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';

function NavBar() {
    const location = useLocation();

    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.includes(path);
    };

    return (
        <Group w={'100%'} justify="center" align="center" bg={'#f5f5f5'}>
            <Group maw={1440}>
                <Link to={'/'}>
                    <Text
                        c={isActive('/') ? 'white' : 'dark'}
                        size="md"
                        pr={12}
                        pl={12}
                        pt={6}
                        pb={6}
                        bg={isActive('/') ? 'blue' : 'transparent'}
                    >
                        Trang chủ
                    </Text>
                </Link>
                <Link to={'/post'}>
                    <Text
                        c={isActive('/post') ? 'white' : 'dark'}
                        size="md"
                        pr={12}
                        pl={12}
                        pt={6}
                        pb={6}
                        bg={isActive('/post') ? 'blue' : 'transparent'}
                    >
                        Diễn đàn
                    </Text>
                </Link>
                <Link to={'/your-pet'}>
                    <Text
                        c={isActive('/your-pet') ? 'white' : 'dark'}
                        size="md"
                        pr={12}
                        pl={12}
                        pt={6}
                        pb={6}
                        bg={isActive('/your-pet') ? 'blue' : 'transparent'}
                    >
                        Quản lý thú cưng
                    </Text>
                </Link>
                <Link to={'/shop'}>
                    <Text
                        c={isActive('/shop') ? 'white' : 'dark'}
                        size="md"
                        pr={12}
                        pl={12}
                        pt={6}
                        pb={6}
                        bg={isActive('/shop') ? 'blue' : 'transparent'}
                    >
                        Cửa Hàng
                    </Text>
                </Link>
                <Link to={'/service'}>
                    <Text
                        c={isActive('/service') ? 'white' : 'dark'}
                        size="md"
                        pr={12}
                        pl={12}
                        pt={6}
                        pb={6}
                        bg={isActive('/service') ? 'blue' : 'transparent'}
                    >
                        Dịch vụ
                    </Text>
                </Link>
                <Link to={'/product'}>
                    <Text
                        c={isActive('/product') ? 'white' : 'dark'}
                        size="md"
                        pr={12}
                        pl={12}
                        pt={6}
                        pb={6}
                        bg={isActive('/product') ? 'blue' : 'transparent'}
                    >
                        Đặt lịch hẹn
                    </Text>
                </Link>
            </Group>
        </Group>
    );
}

export default NavBar;
