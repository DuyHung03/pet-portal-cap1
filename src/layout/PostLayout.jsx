import { Group } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Footer from '../component/footer/Footer';
import Header from '../component/header/Header';

function PostLayout() {
    return (
        <div>
            <Header title={'Diễn đàn'} />
            <Group w={'100%'} justify='center'>
                <Outlet />
            </Group>
            <Footer />
        </div>
    );
}

export default PostLayout;
