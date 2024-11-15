import {
    Group,
    Text,
    Container,
    SimpleGrid,
    Card,
    Image,
    Stack,
    Divider,
} from '@mantine/core';
import PostItem from './PostItem';
import FeaturedPost from './FeaturedPost.jsx';

const dataBlog = [];

function HomePost() {
    return (
        <Container py={48} bg="#F8F8F8">
            {/* Main Title */}
            <Text
                ff="Roboto Slab"
                size="2.5rem"
                pt={6}
                pb={24}
                ta="center"
                color="#003594"
                weight={400}
                height={400}
            >
                Thông Tin Thú Cưng Nổi Bật
            </Text>

            {/* Featured Section */}
            <Group direction="column" spacing="lg" mb={36}>
                <FeaturedPost />
            </Group>

            <Divider my="lg" />

            {/* Pet Tips Section */}
            <Group direction="column" spacing="lg" mb={36}>
                <Text size="xl" color="#003594" weight={600}>
                    Mẹo Chăm Sóc Thú Cưng
                </Text>
                <SimpleGrid
                    cols={2}
                    spacing="lg"
                    breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                >
                    <PostItem />
                    <PostItem />
                </SimpleGrid>
            </Group>

            <Divider my="lg" />

            {/* Latest News Section */}
            <Group direction="column" spacing="lg" mb={36}>
                <Text size="xl" color="#003594" weight={600}>
                    Tin Tức Mới Nhất
                </Text>
                <SimpleGrid
                    cols={3}
                    spacing="lg"
                    breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
                >
                    <PostItem />
                    <PostItem />
                    <PostItem />
                </SimpleGrid>
            </Group>

            <Divider my="lg" />

            {/* Pet of the Day Section */}
            <Group direction="column" spacing="lg" align="center">
                <Card shadow="sm" p="lg" radius="md" withBorder w={300}>
                    <Card.Section>
                        <Image
                            src="https://www.shutterstock.com/image-photo/dog-animal-pet-cat-cute-260nw-2521815587.jpg"
                            height={200}
                            fit="cover"
                            alt="Pet of the Day"
                        />
                    </Card.Section>
                    <Stack spacing="xs" pt="md">
                        <Text size="lg" color="dark" weight={500}>
                            Tên: Lucky
                        </Text>
                        <Text size="sm" color="dimmed">
                            Một chú mèo dễ thương 2 tuổi, rất thích đùa nghịch
                            với đồ chơi.
                        </Text>
                    </Stack>
                </Card>
                <Card shadow="sm" p="lg" radius="md" withBorder w={300}>
                    <Card.Section>
                        <Image
                            src="https://www.shutterstock.com/image-photo/dog-animal-pet-cat-cute-260nw-2521815587.jpg"
                            height={200}
                            fit="cover"
                            alt="Pet of the Day"
                        />
                    </Card.Section>
                    <Stack spacing="xs" pt="md">
                        <Text size="lg" color="dark" weight={500}>
                            Tên: Lucky
                        </Text>
                        <Text size="sm" color="dimmed">
                            Một chú mèo dễ thương 2 tuổi, rất thích đùa nghịch
                            với đồ chơi.
                        </Text>
                    </Stack>
                </Card>
            </Group>
        </Container>
    );
}

export default HomePost;
