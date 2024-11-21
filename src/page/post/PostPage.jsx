import { Group, Image, Loader, Text } from '@mantine/core';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import AddPost from '../../component/post/add-post/AddPost';
import PostItem from '../../component/post/post-item/PostItem';
import useFetchData from '../../hooks/useFetchData';

function PostPage() {
    const params = useMemo(() => [], []);

    const { data, loading, error, refetch } = useFetchData(
        '/posts/all',
        params,
    );

    return (
        <Group w={700} justify="center" m={20}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Diễn đàn - Cổng dịch vụ thú cưng</title>
            </Helmet>
            <AddPost onPostCreated={refetch} />

            {loading ? (
                <Group w={700} align="center" justify="center">
                    <Loader type="bars" />
                </Group>
            ) : null}

            {data?.data?.length > 0 ? (
                <Group w={'100%'}>
                    {data.data.reverse().map((post, index) => (
                        <PostItem
                            post={post}
                            key={index}
                            onPostDeleted={refetch}
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
                    <Text w={'100%'} fs={'italic'} ta={'center'} c={'gray'}>
                        Chưa có bài đăng nào
                    </Text>
                </Group>
            )}
            {error ? (
                <Text c={'red'} fw={500}>
                    {error.message}
                </Text>
            ) : null}
        </Group>
    );
}

export default PostPage;
