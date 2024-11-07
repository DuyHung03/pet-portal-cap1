import { Group, Text } from '@mantine/core';
import PostItem from './PostItem';

function HomePost() {
    return (
        <Group w={'100%'} pt={24} pb={24} bg={'#F8F8F8'}>
            <Text
                ff={'Roboto Slab'}
                size="39px"
                pt={6}
                pb={6}
                ta={'center'}
                w={'100%'}
                c={'#003594'}
            >
                Tin tức hàng đầu
            </Text>

            <Group w={'100%'} gap={0}>
                <PostItem />
                <PostItem />
                <PostItem />
                <PostItem />
            </Group>
        </Group>
    );
}

export default HomePost;
