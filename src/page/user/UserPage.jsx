import {
    Avatar,
    Button,
    Divider,
    Flex,
    Grid,
    GridCol,
    Group,
    Image,
    Loader,
    Text,
} from '@mantine/core';
import { Cake, CreateOutlined, LocationOn, Phone } from '@mui/icons-material';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PostItem from '../../component/post/post-item/PostItem';
import useFetchData from '../../hooks/useFetchData';
import { useAuthStore } from '../../store/authStore';

function UserPage() {
    const { user } = useAuthStore();

    const params = useMemo(() => ({ limit: 8 }), []);

    const { data, loading, error } = useFetchData(
        `/posts/pet_owner/${user.id}`,
        params,
    );

    {
        error ?? console.log(error);
    }

    console.log(data);

    const handleDeletePost = async () => {
        console.log('delete');
    };

    return (
        <Group w={'100%'} p={30}>
            <Group>
                <Flex gap={20} align={'center'}>
                    <Avatar
                        size={140}
                        allowedInitialsColors={'#dfe6e9'}
                        src={user.avatar_url}
                        name={user.username}
                        color="initials"
                    />
                    <Text size="27px" fw={700} c={'dark'}>
                        {user.username}
                    </Text>
                </Flex>
            </Group>
            <Divider w={'100%'} />
            <Grid justify="space-between" w={'100%'} mt={20} gutter={'xl'}>
                <GridCol span={'content'}>
                    <Text c={'#165D94'} mb={20} fw={500}>
                        Thông tin cá nhân
                    </Text>
                    <Divider h={1} w={'100%'} />
                    <Flex direction={'column'} gap={10} pt={20} c={'#5789CF'}>
                        <Flex align={'flex-end'} gap={6}>
                            <Cake />
                            birthday
                        </Flex>
                        <Flex align={'flex-end'} gap={6}>
                            <LocationOn />
                            address
                        </Flex>
                        <Flex align={'flex-end'} gap={6}>
                            <Phone />
                            phone
                        </Flex>
                    </Flex>
                </GridCol>
                <GridCol span={'auto'}>
                    <Text c={'#165D94'} mb={20} fw={500}>
                        Bài đăng của bạn ({data?.data?.length})
                    </Text>
                    <Divider h={1} w={'100%'} />
                    {loading ? (
                        <Group w={'100%'} justify="center" align="center">
                            <Loader type="bars" />
                        </Group>
                    ) : null}
                    {data?.data?.length > 0 ? (
                        <Group>
                            {data.data.reverse().map((post, index) => (
                                <PostItem
                                    post={post}
                                    handleDeletePost={handleDeletePost}
                                    key={index}
                                />
                            ))}
                        </Group>
                    ) : (
                        <Group w={'100%'} justify="center">
                            <Image
                                w={100}
                                src={
                                    'https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.empty_states.dormant_lightmode.png-26-c4532c98034818a0.png'
                                }
                            />
                            <Text w={'100%'} ta={'center'} c={'gray'}>
                                Bạn chưa có bài đăng nào
                            </Text>
                            <Link to={'post'}>
                                <Button bg={'#5789CF'}>Tạo bài đăng mới</Button>
                            </Link>
                        </Group>
                    )}
                </GridCol>
                <GridCol span={'content'}>
                    <Text c={'#165D94'} mb={20} fw={500}>
                        Dịch vụ
                    </Text>
                    <Divider h={1} w={'100%'} />
                    <Group pt={20}>
                        <Link to={'#'}>
                            <Button
                                leftSection={<CreateOutlined />}
                                variant="transparent"
                                c={'#5789CF'}
                            >
                                Khai báo thông tin thú cưng
                            </Button>
                        </Link>
                    </Group>
                </GridCol>
            </Grid>
        </Group>
    );
}

export default UserPage;
