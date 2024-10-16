import { Group } from '@mantine/core';
import AddPost from '../../component/post/add-post/AddPost';
import PostItem from '../../component/post/post-item/PostItem';

function PostPage() {
  return (
    <Group w={700} justify="center" m={20}>
      <AddPost />
      <Group bg={'#f8f8f8'} p={20} w={700} style={{ borderRadius: '24px' }}>
        <PostItem />
      </Group>
    </Group>
  );
}

export default PostPage;
