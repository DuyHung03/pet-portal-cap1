import { Avatar, Button, Divider } from '@mantine/core';
import {
    CalendarMonth,
    Logout,
    ShoppingCart,
    People,
    BarChart,
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';

function ShopDashboardSideBar() {
    const location = useLocation();
    const { user } = useAuthStore();

    const isActive = (path) => location.pathname.includes(path);

    return (
        <div className="w-64 h-screen bg-gray-900 p-4 shadow-xl flex flex-col items-center">
            <Avatar
                src="https://i.pinimg.com/564x/87/19/bd/8719bd600d09de24784cedb300f758f1.jpg"
                size={80}
                className="mb-4 border-4 border-gray-300"
            />
            <h2 className="text-xl font-semibold text-white mb-6">{`Admin ${user.username}`}</h2>

            <div className="w-full">
                <SidebarLink
                    to="/shop-dashboard/overview"
                    label="Overview"
                    icon={<CalendarMonth />}
                    isActive={isActive('/shop-dashboard/overview')}
                />
                <Divider className="my-4 bg-gray-700" />

                <SidebarLink
                    to="/shop-dashboard/products"
                    label="Products"
                    icon={<ShoppingCart />}
                    isActive={isActive('/shop-dashboard/products')}
                />

                <Divider className="my-4 bg-gray-700" />

                <SidebarLink
                    to="/shop-dashboard/orders"
                    label="Orders"
                    icon={<CalendarMonth />}
                    isActive={isActive('/shop-dashboard/orders')}
                />
                <Divider className="my-4 bg-gray-700" />

                <SidebarLink
                    to="/shop-dashboard/users"
                    label="Users"
                    icon={<People />}
                    isActive={isActive('/shop-dashboard/users')}
                />

                <Divider className="my-4 bg-gray-700" />

                <SidebarLink
                    to="/shop-dashboard/reports"
                    label="Reports"
                    icon={<BarChart />}
                    isActive={isActive('/shop-dashboard/reports')}
                />
            </div>
            <Button
                variant="subtle"
                color="red"
                leftSection={<Logout />}
                className="mt-auto w-full text-white hover:bg-red-600 transition-all duration-200"
            >
                Sign Out
            </Button>
        </div>
    );
}

const SidebarLink = ({ to, label, icon, isActive }) => (
    <Link to={to} className="w-full">
        <Button
            variant="subtle"
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-4 ${
                isActive
                    ? 'bg-pink-600 text-white shadow-lg'
                    : 'text-gray-400 hover:bg-gray-700'
            }`}
            leftSection={icon}
            style={
                isActive
                    ? { paddingRight: 20, borderRight: '3px solid #5789cf' }
                    : null
            }
        >
            {label}
        </Button>
    </Link>
);

export default ShopDashboardSideBar;
