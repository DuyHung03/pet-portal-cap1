import { CloseButton, Group, Image, Input, Text } from '@mantine/core';
import { Search } from '@mui/icons-material';

function Header() {
    return (
        <Group pt={15} pb={15}>
            <Group display={'flex'} justify='space-between' align='center'>
                <Group align='center'>
                    <a href='/'>
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
                            Book Haven
                        </Text>
                    </a>
                </Group>

                <Input
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
                />

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
