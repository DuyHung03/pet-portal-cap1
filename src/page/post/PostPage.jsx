import { Group, Loader } from '@mantine/core';
import { useMemo } from 'react';
import AddPost from '../../component/post/add-post/AddPost';
import PostItem from '../../component/post/post-item/PostItem';
import useFetchData from '../../hooks/useFetchData';

function PostPage() {
    const params = useMemo(() => [], []);

    const { data, loading } = useFetchData('/posts', params);
    console.log(data);
    return (
        <Group w={700} justify='center' m={20}>
            <AddPost />
            {loading ? (
                <Group w={700} align='center' justify='center'>
                    <Loader type='bars' />
                </Group>
            ) : (
                <Group w={700}>
                    {data.reverse().map((post, index) => (
                        <PostItem post={post} key={index} />
                    ))}
                </Group>
            )}
        </Group>
    );
}

export default PostPage;
