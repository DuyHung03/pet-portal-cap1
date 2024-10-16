import { Avatar, Flex, Group, Loader, Text } from '@mantine/core';
import { useAuthStore } from '../../../store/authStore';
import { timeAgo } from '../../../util/convertTime';
import useFetchData from '../../../hooks/useFetchData';
import { useMemo } from 'react';

function PostItem() {
  const { user } = useAuthStore();

  const params = useMemo(() => [], []);

  const { data, loading, error } = useFetchData('/posts', params);
  console.log('data', data);

  return (
    <Group>
      <Flex>
        <Avatar
          src={user.avatar_url}
          size={'md'}
          name={user.username}
          color="initials"
        />
        {loading ? (
          <Group w={'100%'} justify="center" align="center">
            <Loader type="bars" />
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
