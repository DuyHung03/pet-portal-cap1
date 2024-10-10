import { Group } from '@mantine/core';
import Banner from '../../component/banner/Banner';
import HomePost from '../../component/home-post/HomePost';

function Home() {
    return (
        <Group w={'100%'} gap={0}>
            <Banner />
            <HomePost />
        </Group>
    );
}

export default Home;
