import { Avatar, Flex, Group, Text } from '@mantine/core';
import { timeAgo } from '../../../util/convertTime';

function PostItem({ post }) {
    return (
        <Group w={'100%'} bg={'#f8f8f8'} p={20} style={{ borderRadius: '24px' }}>
            <Flex gap={20}>
                <Avatar
                    src={post.PostOwner.avatar_url}
                    size={'lg'}
                    name={post.PostOwner.username}
                    color='initials'
                />
                <Flex direction={'column'}>
                    <Text fw={600} size='lg'>
                        {post.PostOwner.username}
                    </Text>
                    <Text c={'gray'}>{timeAgo(post.createdAt)}</Text>
                </Flex>
            </Flex>
            <Group w={'100%'}>
                <Text fw={500} size='lg' w={'100%'}>
                    {post.title}
                </Text>
                <Text lineClamp={3} w={'100%'}>
                    {post.content}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas doloremque
                    architecto quos facilis et sint voluptatem officia quam obcaecati nam earum
                    eligendi reprehenderit modi libero, id molestiae in quae deleniti!
                </Text>
            </Group>
        </Group>
    );
}

export default PostItem;
