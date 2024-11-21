import { Group } from '@mantine/core';
import Footer from 'component/shop/shop-footer/shop-footer';
import { Outlet } from 'react-router-dom';
import ShopHeader from '../component/shop/shop-header/ShopHeader';
import ShopNavBar from '../component/shop/shop-nav/ShopNavBar';

function ShopLayout() {
    return (
        <div>
            <ShopHeader />
            <ShopNavBar />
            <Group w={'100%'} justify="center">
                <Outlet />
            </Group>
            <Footer />
        </div>
    );
}

export default ShopLayout;
