import { Group, Loader, Text } from '@mantine/core';
import { useMemo } from 'react';
import AddPost from '../../component/post/add-post/AddPost';
import PostItem from '../../component/post/post-item/PostItem';
import useFetchData from '../../hooks/useFetchData';

function PostPage() {
<<<<<<< HEAD
    const params = useMemo(() => [], []);

    const { data, loading, error } = useFetchData('/posts/latest', params);
    console.log(data, loading, error);

    return (
        <Group w={700} justify='center' m={20}>
            <AddPost />

            {loading ? (
                <Group w={700} align='center' justify='center'>
                    <Loader type='bars' />
                </Group>
            ) : null}

            {data ? (
                <Group w={700}>
                    {data?.data?.map((post, index) => (
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
=======
  return (
    <Group w={700} justify="center" m={20}>
      <AddPost />
      <Group bg={'#f8f8f8'} p={20} w={700} style={{ borderRadius: '24px' }}>
        <PostItem />
      </Group>
    </Group>
  );
>>>>>>> 22787f03128bd5c87206b03e4350024b292b0c52
}

export default PostPage;
