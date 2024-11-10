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
                        bg={isActive('/') ? '#5789cf' : 'transparent'}
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
                        bg={isActive('/post') ? '#5789cf' : 'transparent'}
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
                        bg={isActive('/your-pet') ? '#5789cf' : 'transparent'}
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
                        bg={isActive('/shop') ? '#5789cf' : 'transparent'}
                    >
                        Cửa Hàng
                    </Text>
                </Link>
                <Link to={'/appointment'}>
                    <Text
                        c={isActive('/appointment') ? 'white' : 'dark'}
                        size="md"
                        pr={12}
                        pl={12}
                        pt={6}
                        pb={6}
                        bg={
                            isActive('/appointment') ? '#5789cf' : 'transparent'
                        }
                    >
                        Đặt lịch hẹn
                    </Text>
                </Link>
                <Link to={'/doctors'}>
                    <Text
                        c={isActive('/doctors') ? 'white' : 'dark'}
                        size="md"
                        pr={12}
                        pl={12}
                        pt={6}
                        pb={6}
                        bg={isActive('/doctors') ? '#5789cf' : 'transparent'}
                    >
                        Bác sĩ
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
                        bg={isActive('/service') ? '#5789cf' : 'transparent'}
                    >
                        Đăng kí dịch vụ
                    </Text>
                </Link>
            </Group>
        </Group>
    );
}

export default NavBar;
