import { Group, Loader, Text } from '@mantine/core';
import { useMemo } from 'react';
import AddPost from '../../component/post/add-post/AddPost';
import PostItem from '../../component/post/post-item/PostItem';
import useFetchData from '../../hooks/useFetchData';

function PostPage() {
    const params = useMemo(() => [], []);

    const { data, loading, error } = useFetchData('/posts/all', params);
    console.log(data, loading, error);

    return (
        <Group w={700} justify="center" m={20}>
            <AddPost />

            {loading ? (
                <Group w={700} align="center" justify="center">
                    <Loader type="bars" />
                </Group>
            ) : null}

            {data ? (
                <Group w={700}>
                    {data?.data?.reverse().map((post, index) => (
                        <PostItem post={post} key={index} />
                    ))}
                </Group>
            ) : null}

            {error ? (
                <Text c={'red'} fw={500}>
                    {error.message}
                </Text>
            ) : null}
        </Group>
    );
}

export default PostPage;
