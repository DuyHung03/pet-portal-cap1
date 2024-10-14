import { Avatar, Flex, Group, Loader, Text } from '@mantine/core';
import { useAuthStore } from '../../../store/authStore';
import { timeAgo } from '../../../util/convertTime';

function PostItem() {
    const { user } = useAuthStore();

    // const { data, loading } = useFetchData('/posts', []);
    console.log(data);

    return (
        <Group>
            <Flex>
                <Avatar src={user.avatar_url} size={'md'} name={user.username} color='initials' />
                {loading ? (
                    <Group w={'100%'} justify='center' align='center'>
                        <Loader type='bars' />
                    </Group>
                ) : (
                    <Group>
                        <Text>{user.username}</Text>
                        <Text>{timeAgo()}</Text>
                    </Group>
                )}
            </Flex>
        </Group>
    );
}

export default PostItem;
