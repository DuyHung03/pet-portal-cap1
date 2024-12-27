import { Group, Text } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function ShopNavBar() {
    const location = useLocation();
    const [showSubNav, setShowSubNav] = useState(false);
    const [hoveredNav, setHoveredNav] = useState(null);

    const isActive = (path) => location.pathname === path;

    return (
        <Group
            w={'100%'}
            justify="center"
            align="center"
            bg={'#f5f5f5'}
            // p={10}
            style={{
                border: '1px solid #dfe6e9',
            }}
        >
            <Group maw={1440} spacing="xs">
                <Link to={'/'}>
                    <Text
                        c={
                            isActive('/') || hoveredNav === '/'
                                ? 'white'
                                : 'dark'
                        }
                        size="md"
                        pr={12}
                        pl={12}
                        pt={6}
                        pb={6}
                        bg={
                            isActive('/') || hoveredNav === '/'
                                ? '#dfe6e9'
                                : 'transparent'
                        }
                        onMouseEnter={() => setHoveredNav('/')}
                        onMouseLeave={() => setHoveredNav(null)}
                        style={{ transition: 'background-color 0.3s' }}
                    >
                        Trang Chủ
                    </Text>
                </Link>
                <Link to={'/shop'}>
                    <Text
                        c={
                            isActive('/shop') || hoveredNav === 'home'
                                ? 'white'
                                : 'dark'
                        }
                        size="md"
                        pr={12}
                        pl={12}
                        pt={6}
                        pb={6}
                        bg={
                            isActive('/shop') || hoveredNav === 'home'
                                ? 'blue'
                                : 'transparent'
                        }
                        onMouseEnter={() => setHoveredNav('home')}
                        onMouseLeave={() => setHoveredNav(null)}
                        style={{ transition: 'background-color 0.3s' }}
                    >
                        Cửa Hàng
                    </Text>
                </Link>

                <Link to={'produce'}>
                    <Text
                        c={
                            isActive('produce') || hoveredNav === 'produce'
                                ? 'white'
                                : 'dark'
                        }
                        size="md"
                        pr={12}
                        pl={12}
                        pt={6}
                        pb={6}
                        bg={
                            isActive('produce') || hoveredNav === 'produce'
                                ? '#dfe6e9'
                                : 'transparent'
                        }
                        onMouseEnter={() => setHoveredNav('produce')}
                        onMouseLeave={() => setHoveredNav(null)}
                        style={{ transition: 'background-color 0.3s' }}
                    >
                        Sản Phẩm
                    </Text>
                </Link>

                {/* <Link to={'pet'}>
                    <Text
                        c={
                            isActive('pet') || hoveredNav === 'pet'
                                ? 'white'
                                : 'dark'
                        }
                        size="md"
                        pr={12}
                        pl={12}
                        pt={6}
                        pb={6}
                        bg={
                            isActive('pet') || hoveredNav === 'pet'
                                ? '#dfe6e9'
                                : 'transparent'
                        }
                        onMouseEnter={() => setHoveredNav('pet')}
                        onMouseLeave={() => setHoveredNav(null)}
                        style={{ transition: 'background-color 0.3s' }}
                    >
                        Thú Cưng
                    </Text>
                </Link> */}
                <Link to={'contact'}>
                    <Text
                        c={
                            isActive('contact') || hoveredNav === 'contact'
                                ? 'white'
                                : 'dark'
                        }
                        size="md"
                        pr={12}
                        pl={12}
                        pt={6}
                        pb={6}
                        bg={
                            isActive('contact') || hoveredNav === 'contact'
                                ? '#dfe6e9'
                                : 'transparent'
                        }
                        onMouseEnter={() => setHoveredNav('contact')}
                        onMouseLeave={() => setHoveredNav(null)}
                        style={{ transition: 'background-color 0.3s' }}
                    >
                        Liên hệ
                    </Text>
                </Link>

                <Link to={'about'}>
                    <Text
                        c={
                            isActive('about') || hoveredNav === 'about'
                                ? 'white'
                                : 'dark'
                        }
                        size="md"
                        pr={12}
                        pl={12}
                        pt={6}
                        pb={6}
                        bg={
                            isActive('about') || hoveredNav === 'about'
                                ? '#dfe6e9'
                                : 'transparent'
                        }
                        onMouseEnter={() => setHoveredNav('about')}
                        onMouseLeave={() => setHoveredNav(null)}
                        style={{ transition: 'background-color 0.3s' }}
                    >
                        Giới Thiệu
                    </Text>
                </Link>
            </Group>
        </Group>
    );
}

export default ShopNavBar;
