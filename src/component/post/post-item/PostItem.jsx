import {
    Avatar,
    Button,
    Flex,
    Group,
    Loader,
    Menu,
    MenuDropdown,
    MenuItem,
    MenuTarget,
    Modal,
    Text,
    Textarea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    ChatBubbleOutline,
    Delete,
    FavoriteBorderOutlined,
    MoreHoriz,
} from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast, ToastContainer } from 'react-toastify';
import axiosInstance from '../../../network/httpRequest';
import { useAuthStore } from '../../../store/authStore';
import { timeAgo } from '../../../util/convertTime';
import PostComment from '../post-comment/PostComment';

function PostItem({ post, onPostDeleted }) {
    const [commentsVisible, setCommentsVisible] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const { user } = useAuthStore();
    const [modalOpened, { open: openModal, close: closeModal }] =
        useDisclosure(false);

    // Post comment mutation
    const commentMutation = useMutation({
        mutationFn: async ({ postId, user, content }) => {
            const response = await axiosInstance.post(
                '/comments',
                { post_id: postId, petOwner_Id: user.id, content },
                { withCredentials: true },
            );
            return response.data;
        },
        onMutate: (newCommentData) => {
            const optimisticComment = {
                content: newCommentData.content,
                CommentUser: user,
                createdAt: new Date().toISOString(),
            };
            setComments((prev) => [optimisticComment, ...prev]);
        },
        onError: (error, newComment) => {
            setComments((prev) =>
                prev.filter((c) => c.content !== newComment.content),
            );
            toast.error('An error occurred while posting the comment.');
        },
    });

    // Comment deletion mutation
    const deleteCommentMutation = useMutation({
        mutationFn: async ({ commentId }) => {
            const response = await axiosInstance.delete(
                `/comments/${commentId}`,
                {
                    withCredentials: true,
                },
            );
            return response.data;
        },
        onSuccess: (_, { commentId }) => {
            setComments((prev) =>
                prev.filter((comment) => comment.id !== commentId),
            );
        },
        onError: () => {
            toast.error('An error occurred while deleting the comment.');
        },
    });

    // Post deletion mutation
    const deletePostMutation = useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.delete(`/posts/${post.id}`, {
                withCredentials: true,
            });
            return response.data;
        },
        onSuccess: () => {
            onPostDeleted();
        },
    });

    const handleAddComment = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            commentMutation.mutate({
                postId: post.id,
                user,
                content: newComment,
            });
            setNewComment('');
        }
    };

    const handleDeleteComment = (commentId) => {
        deleteCommentMutation.mutate({ commentId });
    };

    const toggleComments = async () => {
        setCommentsVisible((prev) => !prev);
        if (
            !commentsVisible &&
            comments.length === 0 &&
            post?.PostComments?.length > 0
        ) {
            setLoadingComments(true);
            try {
                const response = await axiosInstance.get(
                    `/comments/post/${post.id}`,
                    {
                        withCredentials: true,
                    },
                );
                setComments(response.data.data);
            } catch (error) {
                console.log(error);
                toast.error('Error fetching comments.');
            } finally {
                setLoadingComments(false);
            }
        }
    };

    const handleDeletePost = () => {
        deletePostMutation.mutate();
    };

    return (
        <>
            <ToastContainer
                style={{ marginTop: '100px' }}
                limit={1}
                newestOnTop
            />
            <Modal
                opened={modalOpened}
                onClose={closeModal}
                centered
                withCloseButton={false}
                title="Xóa bài viết"
            >
                <Text mb={20}>Bạn có muốn xóa bài viết này?</Text>
                <Group mt="lg" justify="flex-end">
                    <Button onClick={closeModal} variant="default">
                        Hủy
                    </Button>
                    <Button onClick={handleDeletePost} color="red">
                        Xóa
                    </Button>
                </Group>
            </Modal>
            <Group
                w={'100%'}
                bg={'#f8f8f8'}
                p={20}
                style={{ borderRadius: '24px' }}
            >
                {/* Header */}
                <Flex w={'100%'} justify={'space-between'}>
                    <Flex gap={20}>
                        <Avatar size={'lg'} name={post.PostOwner.username} />
                        <Flex direction={'column'}>
                            <Text fw={600} size="lg">
                                {post.PostOwner.username}
                            </Text>
                            <Text c={'gray'}>{timeAgo(post.createdAt)}</Text>
                        </Flex>
                    </Flex>
                    {post.petOwner_Id === user.id && (
                        <Menu shadow="sm" zIndex={0}>
                            <MenuTarget>
                                <Button variant="transparent" c={'#626262'}>
                                    <MoreHoriz />
                                </Button>
                            </MenuTarget>
                            <MenuDropdown>
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
                                    Xóa bài viết
                                </MenuItem>
                            </MenuDropdown>
                        </Menu>
                    )}
                </Flex>

                {/* Post content */}
                <Group w={'100%'}>
                    <Text fw={500} size="lg" w={'100%'}>
                        {post.title}
                    </Text>
                    <Text lineClamp={3} w={'100%'}>
                        {post.content}
                    </Text>
                </Group>

                {post.image_url && (
                    <Group w={'100%'} justify="center">
                        <LazyLoadImage
                            src={post.image_url}
                            style={{ maxHeight: '460px', borderRadius: '12px' }}
                            alt="Post image"
                        />
                    </Group>
                )}

                {/* Actions */}
                <Flex>
                    <Button variant="subtle" radius={'xl'}>
                        <FavoriteBorderOutlined />
                        <Text ml={10}>{post.likeCount ?? 0}</Text>
                    </Button>
                    <Button
                        variant="subtle"
                        radius={'xl'}
                        onClick={toggleComments}
                    >
                        <ChatBubbleOutline />
                        <Text ml={10}>{post?.PostComments?.length ?? 0}</Text>
                    </Button>
                </Flex>

                {/* Comments Section */}
                {commentsVisible && (
                    <Flex direction={'column'} w={'100%'}>
                        <Flex w={'100%'} align={'center'} gap={10}>
                            <Avatar name={user.username} />
                            <Textarea
                                value={newComment}
                                radius={'xl'}
                                autosize
                                maxRows={3}
                                placeholder="Add a comment"
                                onChange={(e) => setNewComment(e.target.value)}
                                style={{ flexGrow: '1' }}
                            />
                            <Button
                                bg={'#5789cf'}
                                radius={'30px'}
                                onClick={handleAddComment}
                                disabled={commentMutation.isLoading}
                            >
                                Submit
                            </Button>
                        </Flex>

                        {loadingComments && (
                            <Group
                                w={'100%'}
                                justify="center"
                                align="center"
                                p={20}
                            >
                                <Loader type="bars" size="sm" />
                            </Group>
                        )}

                        <Group mt={20} gap={20}>
                            {comments.length > 0 ? (
                                comments.map((comment) => (
                                    <PostComment
                                        key={comment.id}
                                        comment={comment}
                                        onDeleteComment={() =>
                                            handleDeleteComment(comment.id)
                                        }
                                    />
                                ))
                            ) : (
                                <Text
                                    ta={'center'}
                                    fs={'italic'}
                                    w={'100%'}
                                    c={'gray'}
                                >
                                    Hãy là người đầu tiên bình luận cho bài viết
                                    này!
                                </Text>
                            )}
                        </Group>
                    </Flex>
                )}
            </Group>
        </>
    );
}

export default PostItem;
