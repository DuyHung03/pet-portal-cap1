import { Group } from '@mantine/core';
import HomePost from '../../component/home-post/HomePost';
import Banner from '../../component/home/banner/Banner';

function Home() {
    return (
        <Group w={'100%'} gap={0}>
            <Banner />
            <HomePost />
        </Group>
    );
}

export default Home;
