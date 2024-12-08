import { Flex } from '@mantine/core';
import ShopDashboardSideBar from 'component/shop-dashboard/sidebar/ShopDashboard-Sidebar';
import { Outlet } from 'react-router-dom';

function ShopDashboardLayout() {
    return (
        <div style={{ display: 'flex', width: '100%' }}>
            <div
                style={{
                    width: '300px',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100vh',
                    backgroundColor: '#FAFAFC',
                    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
                    zIndex: 1000,
                }}
            >
                <ShopDashboardSideBar />
            </div>

            <div
                style={{
                    marginLeft: '300px',
                    flexGrow: 1,
                    padding: '24px',
                }}
            >
                <Outlet />
            </div>
        </div>
    );
}

export default ShopDashboardLayout;
