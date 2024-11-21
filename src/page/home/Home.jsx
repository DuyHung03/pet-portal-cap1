import { Group } from '@mantine/core';
import { Helmet } from 'react-helmet';
import HomePost from '../../component/home-post/HomePost';
import Banner from '../../component/home/banner/Banner';

function Home() {
    return (
        <Group w={'100%'} gap={0}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Trang chủ - Cổng dịch vụ thú cưng</title>
            </Helmet>
            <Banner />
            <HomePost />
        </Group>
    );
}

export default Home;
