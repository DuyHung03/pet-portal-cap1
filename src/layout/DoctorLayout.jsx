import { Group } from '@mantine/core';
import Header from 'component/header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../component/footer/Footer';

function ShopLayout() {
    return (
        <div>
<<<<<<< HEAD
            <ShopHeader />
=======
            <Header title={'Cổng dịch vụ thú cưng'} />
>>>>>>> 6612d5709858a596fdf500e63d218d7f5ec8d207
            <Group w={'100%'} justify="center">
                <Outlet />
            </Group>
            <Footer />
        </div>
    );
}

export default ShopLayout;
