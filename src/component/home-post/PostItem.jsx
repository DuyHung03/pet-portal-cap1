import { Card, Image, Text, Stack } from '@mantine/core';
import { Link } from 'react-router-dom';

function PostItem() {
    return (
        <Link to={'/'} style={{ textDecoration: 'none' }}>
            <Card shadow="sm" p="lg" radius="md" withBorder>
                <Card.Section>
                    <Image
                        src="https://png.pngtree.com/background/20210710/original/pngtree-cute-pet-cartoon-fresh-hand-painted-banner-picture-image_1031084.jpg"
                        height={200}
                        fit="cover"
                    />
                </Card.Section>
                <Stack spacing="xs" pt="md">
                    <Text size="lg" color="dark" weight={500}>
                        Hôm nay trời đẹp, dẫn thú cưng đi dạo thôi!
                    </Text>
                    <Text size="sm" color="dimmed">
                        Cập nhật những câu chuyện dễ thương của thú cưng và mẹo
                        chăm sóc mỗi ngày.
                    </Text>
                </Stack>
            </Card>
        </Link>
    );
}

export default PostItem;
