import { Group } from '@mantine/core';
import NavBar from 'component/header-nav/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../component/footer/Footer';
import Header from '../component/header/Header';
import NavBar from 'component/header-nav/NavBar';

function PostLayout() {
    return (
        <div>
            <Group gap={0} pos={'fixed'} style={{ zIndex: '10' }} w={'100%'}>
                <Header title={'Diễn đàn'} />
                <NavBar />
            </Group>
            <Group w={'100%'} justify="center" pt={190}>
                <Outlet />
            </Group>
            <Footer />
        </div>
    );
}

export default PostLayout;
