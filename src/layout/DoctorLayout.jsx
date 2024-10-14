import { Group } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Footer from '../component/footer/Footer';
import ShopHeader from '../component/shop/shop-header/ShopHeader';

function ShopLayout() {
    return (
        <div>
            <ShopHeader />
            <Group w={'100%'} justify='center'>
                <Outlet />
            </Group>
            <Footer />
        </div>
    );
}

export default ShopLayout;
