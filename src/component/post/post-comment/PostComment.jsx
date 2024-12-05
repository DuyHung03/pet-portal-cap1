import {
    Avatar,
    Button,
    Flex,
    Group,
    Menu,
    MenuDropdown,
    MenuItem,
    MenuTarget,
    Modal,
    Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Delete, MoreHoriz } from '@mui/icons-material';
import { useAuthStore } from '@store/authStore';
import { timeAgo } from '../../../util/convertTime';

function PostComment({ comment, onDeleteComment }) {
    const { user } = useAuthStore();
    const [modalOpened, { open: openModal, close: closeModal }] =
        useDisclosure(false);
    console.log(comment.CommentUser.id);

    return (
        <>
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
                                    {/* <MenuItem
                                        component="button"
                                        onClick={openModal}
                                        leftSection={
                                            <Edit
                                                fontSize="small"
                                                color="action"
                                            />
                                        }
                                    >
                                        Chỉnh sửa
                                    </MenuItem> */}
                                    <MenuItem
                                        component="button"
                                        onClick={openModal}
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
            <Modal
                opened={modalOpened}
                onClose={closeModal}
                centered
                withCloseButton={false}
                title="Xóa bình luận"
            >
                <Text mb={20}>Bạn có muốn xóa bình luận này?</Text>
                <Group mt="lg" justify="flex-end">
                    <Button onClick={closeModal} variant="default">
                        Hủy
                    </Button>
                    <Button onClick={onDeleteComment} color="red">
                        Xóa
                    </Button>
                </Group>
            </Modal>
        </>
    );
}

export default PostComment;
