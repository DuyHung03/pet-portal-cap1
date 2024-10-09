import { Button, Flex, Group, Image, Text } from '@mantine/core';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <Group pt={15} pb={15} justify='center' align='center'>
            <Group display={'flex'} justify='space-between' align='center' maw={1200} w={'100%'}>
                <a href='/'>
                    <Flex direction={'row'} align='center'>
                        <Image
                            alt='logo'
                            src={
                                'https://book-haven-frontend-seven.vercel.app/assets/logo_only-Djt1EDPU.png'
                            }
                            width={76}
                            height={76}
                        />
                        <Text
                            c='cyan'
                            fw={'bold'}
                            style={{ letterSpacing: 1.25 }}
                            size={'xl'}
                            ml={12}
                        >
                            Cổng dịch vụ thú cưng
                        </Text>
                    </Flex>
                </a>

                {/* <Input
                    // onKeyDown={handleKeyEnter}
                    w={350}
                    radius={'xl'}
                    size='md'
                    placeholder='Search'
                    leftSectionPointerEvents='all'
                    rightSectionPointerEvents='all'
                    leftSection={
                        <Search
                            fontSize='small'
                            // onClick={handleSearchClick}
                            style={{ cursor: 'pointer' }}
                        />
                    }
                    // onChange={(e) => setSearchValue(e.target.value)}
                    // value={searchValue}
                    rightSection={
                        <CloseButton
                            aria-label='Clear input'
                            size={'sm'}
                            // onClick={() => setSearchValue('')}
                            // style={{ display: searchValue ? undefined : 'none' }}
                        />
                    }
                /> */}

                <div></div>

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
                {/* <Group>
                    {!user.userId ? (
                        <Group>
                            <Link to='/signup'>
                                <Button variant='outline' radius={'md'}>
                                    Sign up
                                </Button>
                            </Link>
                            <Link to='/login'>
                                <Button variant='filled' radius={'md'}>
                                    Login
                                </Button>
                            </Link>
                        </Group>
                    ) : (
                        <Group grow>
                            <UnstyledButton>
                                <Badge badgeContent={0} color='error'>
                                    <FavoriteBorderOutlined fontSize='large' color='error' />
                                </Badge>
                            </UnstyledButton>

                            <UnstyledButton>
                                <Link to={`/user/cart/${user.userId}`}>
                                    <Badge badgeContent={cartItems.length} color='error'>
                                        <ShoppingCartOutlined fontSize='large' color='primary' />
                                    </Badge>
                                </Link>
                            </UnstyledButton>

                            <Link to={`/user/${user.userId}`}>
                                <Avatar src={user.photoUrl} alt='avatar' size={'lg'} />
                            </Link>
                        </Group>
                    )}
                </Group> */}
            </Group>
        </Group>
    );
}

export default Header;
