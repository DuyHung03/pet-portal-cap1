import { Avatar, Flex, Group, Text } from '@mantine/core';
import { timeAgo } from '../../../util/convertTime';

function PostComment({ comment }) {
    return (
        <Flex gap={10} pr={20} pl={20} w={'100%'}>
            <Avatar
                size={'md'}
                name={comment.CommentUser.username}
                color="initials"
            />
            <Group gap={6}>
                <Flex gap={10} align={'center'}>
                    <Text fw={500}>{comment.CommentUser.username}</Text>
                    <Text size="sm" c={'gray'}>
                        {timeAgo(comment.createdAt)}
                    </Text>
                </Flex>
                <Group w={'100%'}>
                    <Text>{comment.content}</Text>
                </Group>
            </Group>
        </Flex>
    );
}

export default PostComment;
