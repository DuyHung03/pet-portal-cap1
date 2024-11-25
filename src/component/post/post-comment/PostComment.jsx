import {
    Avatar,
    Button,
    Flex,
    Group,
    Menu,
    MenuDropdown,
    MenuItem,
    MenuTarget,
    Text,
} from '@mantine/core';
import { Delete, MoreHoriz } from '@mui/icons-material';
import { useAuthStore } from '@store/authStore';
import { timeAgo } from '../../../util/convertTime';

function PostComment({ comment, onDeleteComment }) {
    const { user } = useAuthStore();
    console.log(comment.CommentUser.id);

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
                    {comment.CommentUser.id == user.id ? (
                        <Menu shadow="sm" zIndex={0}>
                            <MenuTarget>
                                <Button variant="transparent" c={'#626262'}>
                                    <MoreHoriz />
                                </Button>
                            </MenuTarget>
                            <MenuDropdown>
                                <MenuItem
                                    component="button"
                                    onClick={onDeleteComment}
                                    color="red"
                                    leftSection={
                                        <Delete
                                            fontSize="small"
                                            color="error"
                                        />
                                    }
                                >
                                    Xóa bình luận
                                </MenuItem>
                            </MenuDropdown>
                        </Menu>
                    ) : null}
                </Flex>
                <Group w={'100%'}>
                    <Text>{comment.content}</Text>
                </Group>
            </Group>
        </Flex>
    );
}

export default PostComment;
