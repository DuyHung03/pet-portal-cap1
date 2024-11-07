import { Flex, Group } from '@mantine/core';
import ShopDashboardSideBar from 'component/shop-dashboard/sidebar/ShopDashboard-Sidebar';
import { Outlet } from 'react-router-dom';

function ShopDashboardLayout() {
    return (
        <Flex gap={0} w={'100%'} justify="center">
            <Flex w={1440} align={'flex-start'}>
                <Group w={300}>
                    <ShopDashboardSideBar />
                </Group>
                <Group w={1140}>
                    <Outlet />
                </Group>
            </Flex>
        </Flex>
    );
}

export default ShopDashboardLayout;
