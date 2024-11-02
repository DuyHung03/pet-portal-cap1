import { Group } from '@mantine/core';
import Header from 'component/header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../component/footer/Footer';

function ShopLayout() {
    return (
        <div>
            <Header title={'Cổng dịch vụ thú cưng'} />
            <Group w={'100%'} justify="center">
                <Outlet />
            </Group>
            <Footer />
        </div>
    );
}

export default ShopLayout;
