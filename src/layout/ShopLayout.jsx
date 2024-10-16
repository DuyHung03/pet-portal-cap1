import { Group } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Footer from '../component/footer/Footer';
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
