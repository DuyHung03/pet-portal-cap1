import { Grid, GridCol, Group, Image, Loader, Text } from '@mantine/core';
import { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import AddPost from '../../component/post/add-post/AddPost';
import PostItem from '../../component/post/post-item/PostItem';
import useFetchData from '../../hooks/useFetchData';

function PostPage() {
    const params = useMemo(() => [], []);

    const { data, loading, error, refetch } = useFetchData(
        '/posts/all',
        params,
    );

    return (
        <Group w={'100%'} justify="center" m={20}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Diễn đàn - Cổng dịch vụ thú cưng</title>
            </Helmet>

            {loading ? (
                <Group w={700} align="center" justify="center">
                    <Loader type="bars" />
                </Group>
            ) : null}

            <Grid w={'100%'}>
                <GridCol span={2}>
                    <Group w={'100%'} justify="center">
                        <Image
                            mb={20}
                            src={
                                'https://media2.giphy.com/media/qE229m7xYgfsCx1UVE/200w.gif?cid=6c09b952gi3p0hpdj393jhq35l7sru6yaapt8oahj989norp&ep=v1_gifs_search&rid=200w.gif&ct=g'
                            }
                        />
                        <Image
                            src={
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTehZKvjkhDC2JCMz4dopk2DJ0cuBHSgFQqF8fc5luQhsqxBSSFWRlqFYYlLEtoJ6v8crM&usqp=CAU'
                            }
                        />
                    </Group>
                </GridCol>
                <GridCol span={8}>
                    <Group w={'100%'} justify="center">
                        <AddPost onPostCreated={refetch} />
                        {data?.data?.length > 0 ? (
                            <Group w={700}>
                                {data.data.reverse().map((post, index) => (
                                    <PostItem
                                        post={post}
                                        key={index}
                                        onPostDeleted={refetch}
                                    />
                                ))}
                            </Group>
                        ) : (
                            <Group w={'100%'} justify="center">
                                <Image
                                    w={100}
                                    src={
                                        'https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.empty_states.dormant_lightmode.png-26-c4532c98034818a0.png'
                                    }
                                />
                                <Text
                                    w={'100%'}
                                    fs={'italic'}
                                    ta={'center'}
                                    c={'gray'}
                                >
                                    Chưa có bài đăng nào
                                </Text>
                            </Group>
                        )}
                        {error ? (
                            <Text c={'red'} fw={500}>
                                {error.message}
                            </Text>
                        ) : null}
                    </Group>
                </GridCol>
                <GridCol span={2}>
                    <Group w={'100%'} justify="center">
                        <Image
                            mb={20}
                            src={
                                'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGhzOXN3a2w3Z2hmeTFvcm54em1xamtqem50c3d1amJnbDl3ZHg4NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vZid7APSGjFICGXd47/giphy.webp'
                            }
                        />
                        <Image
                            src={
                                'https://media4.giphy.com/media/oOfYZ1c6amT7jRcaYn/giphy.gif?cid=6c09b95232ws9rb86d4hlxnzyqwxt53d72asv8qs60th038q&ep=v1_gifs_search&rid=giphy.gif&ct=g'
                            }
                        />
                    </Group>
                </GridCol>
            </Grid>
        </Group>
    );
}

export default PostPage;
