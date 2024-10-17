import {
    Avatar,
    Button,
    Flex,
    Group,
    Loader,
    Text,
    Textarea,
} from '@mantine/core';
import { ChatBubbleOutline, FavoriteBorderOutlined } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { toast, ToastContainer } from 'react-toastify';
import axiosInstance from '../../../network/httpRequest';
import { useAuthStore } from '../../../store/authStore';
import { timeAgo } from '../../../util/convertTime';
import PostComment from '../post-comment/PostComment';

function PostItem({ post }) {
    const [commentsVisible, setCommentsVisible] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false);
    const { user } = useAuthStore();
    const queryClient = useQueryClient();

    const postComment = async ({ postId, user, content }) => {
        const response = await axiosInstance.post(
            '/comments',
            { post_id: postId, petOwner_Id: user.id, content },
            { withCredentials: true },
        );
        return response.data;
    };

    const commentMutation = useMutation({
        mutationFn: postComment,
        onMutate: (newCommentData) => {
            queryClient.cancelQueries(['comments', post.id]);

            const previousComments = queryClient.getQueryData([
                'comments',
                post.id,
            ]);

            const newComment = {
                content: newCommentData.content,
                CommentUser: user,
                createdAt: new Date().toISOString(),
            };
            setComments((prev) => [newComment, ...prev]);

            return { previousComments };
        },
        onError: (err, newComment, context) => {
            queryClient.setQueryData(
                ['comments', post.id],
                context.previousComments,
            );
            setComments((prevComments) =>
                prevComments.filter(
                    (comment) => comment.content !== newComment.content,
                ),
            );
            toast.error('An error occurred');
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', post.id]);
        },
    });

    const handleAddComment = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            commentMutation.mutate({
                postId: post.id,
                user: user,
                content: newComment,
            });
            setNewComment('');
        }
    };

    const toggleComments = async () => {
        setCommentsVisible((prev) => !prev);
        if (!commentsVisible && comments.length === 0) {
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
                console.error('Error fetching comments:', error);
            } finally {
                setLoadingComments(false);
            }
        }
    };

    return (
        <>
            <ToastContainer style={{ marginTop: '100px' }} />
            <Group
                w={'100%'}
                bg={'#f8f8f8'}
                p={20}
                style={{ borderRadius: '24px' }}
            >
                {/* Post content */}
                <Flex gap={20}>
                    <Avatar
                        size={'lg'}
                        name={post.PostOwner.username}
                        color="initials"
                    />
                    <Flex direction={'column'}>
                        <Text fw={600} size="lg">
                            {post.PostOwner.username}
                        </Text>
                        <Text c={'gray'}>{timeAgo(post.createdAt)}</Text>
                    </Flex>
                </Flex>

                <Group w={'100%'}>
                    <Text fw={500} size="lg" w={'100%'}>
                        {post.title}
                    </Text>
                    <Text lineClamp={3} w={'100%'}>
                        {post.content}
                    </Text>
                </Group>

                {post.image_url ? (
                    <Group w={'100%'} justify="center">
                        <LazyLoadImage
                            src={post.image_url}
                            style={{ maxHeight: '460px', borderRadius: '12px' }}
                            alt="img"
                        />
                    </Group>
                ) : null}

                <Flex>
                    <Button
                        variant="subtle"
                        radius={'xl'}
                        // onClick={toggleComments}
                    >
                        <FavoriteBorderOutlined />
                        <Text ml={10}>{post.likeCount}</Text>
                    </Button>
                    <Button
                        variant="subtle"
                        radius={'xl'}
                        onClick={toggleComments}
                    >
                        <ChatBubbleOutline />
                        <Text ml={10}>{post.PostComments.length}</Text>
                    </Button>
                </Flex>

                {commentsVisible && (
                    <Flex direction={'column'} w={'100%'}>
                        <Flex
                            w={'100%'}
                            direction={'row'}
                            align={'center'}
                            gap={10}
                        >
                            <Avatar name={user.username} color="initials" />
                            <Textarea
                                value={newComment}
                                radius={'xl'}
                                autosize
                                maxRows={3}
                                placeholder="Thêm bình luận"
                                onChange={(e) => setNewComment(e.target.value)}
                                style={{ flexGrow: '1' }}
                            />
                            <Button
                                radius={'30px'}
                                onClick={handleAddComment}
                                disabled={commentMutation.isLoading}
                            >
                                Gửi
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
                                comments.map((comment, index) => (
                                    <PostComment
                                        comment={comment}
                                        key={index}
                                    />
                                ))
                            ) : (
                                <Text ta={'center'} w={'100%'} c={'gray'}>
                                    Hãy là người bình luận đầu tiên cho bài viết
                                    này
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
