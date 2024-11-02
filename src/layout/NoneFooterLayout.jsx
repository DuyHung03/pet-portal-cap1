import { Group } from '@mantine/core';
import NavBar from 'component/header-nav/NavBar';
import { Outlet } from 'react-router-dom';
import Header from '../component/header/Header';

function NoneFooterLayout() {
    return (
        <div>
            <Header title={'Cổng dịch vụ thú cưng'} />
            <NavBar />
            <Group w={'100%'} justify="center">
                <Group maw={1440} w={'100%'}>
                    <Outlet />
                </Group>
            </Group>
        </div>
    );
}

export default NoneFooterLayout;
