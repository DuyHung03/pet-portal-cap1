import { Group } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Footer from '../component/footer/Footer';
import NavBar from '../component/header-nav/NavBar';
import Header from '../component/header/Header';

function MainLayout() {
    return (
        <div>
            <Header title={'Cổng dịch vụ thú cưng'} />
            <NavBar />
            <Group w={'100%'} justify="center">
                <Group maw={1440} w={'100%'}>
                    <Outlet />
                </Group>
            </Group>
            <Footer />
        </div>
    );
}

export default MainLayout;
