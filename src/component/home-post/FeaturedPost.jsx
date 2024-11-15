import { Card, Image, Text, Stack, Badge, Group } from '@mantine/core';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';

function FeaturedPost() {
    return (
        <Link to="/featured-article" style={{ textDecoration: 'none' }}>
            <Card shadow="xl" p="lg" radius="md" withBorder>
                <Card.Section>
                    <Image
                        src="https://www.shutterstock.com/image-photo/dog-animal-pet-cat-cute-260nw-2521815587.jpg"
                        height={300}
                        fit="cover"
                        alt="Featured Pet Article"
                    />
                </Card.Section>
                <Stack spacing="xs" pt="md">
                    <Group position="apart">
                        <Text size="lg" color="dark" weight={600}>
                            Cách chăm sóc thú cưng mùa đông
                        </Text>
                        <Badge
                            color="yellow"
                            leftSection={<StarIcon style={{ fontSize: 14 }} />}
                        >
                            Nổi bật
                        </Badge>
                    </Group>
                    <Text size="sm" color="dimmed">
                        Hướng dẫn chi tiết cách giữ ấm và chăm sóc thú cưng của
                        bạn trong những ngày lạnh.
                    </Text>
                </Stack>
            </Card>
        </Link>
    );
}

export default FeaturedPost;
