import { Avatar, Button, Divider } from '@mantine/core';
import {
    CalendarMonth,
    Logout,
    ShoppingCart,
    BarChart,
} from '@mui/icons-material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import DiscountIcon from '@mui/icons-material/Discount';
function ShopDashboardSideBar() {
    const location = useLocation();
    const { user, logout } = useAuthStore();
    console.log('usser:', user.store_logo);
    const isActive = (path) => location.pathname.includes(path);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <div
            className="w-64  min-h-screen bg-[#FAFAFC] p-4 shadow-xl flex flex-col items-center"
            style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
            }}
        >
            <Avatar
                src={user.store_logo}
                size={80}
                className="mb-4 border-4 border-gray-300"
            />
            <h2 className="text-xl font-semibold text-[#5789cf] mb-6">{`Admin ${user.username}`}</h2>

            <div className="w-full">
                <Divider className="my-4 bg-[#5789cf]" />
                <SidebarLink
                    to="/shop-dashboard/reports"
                    label="Báo Cáo"
                    icon={<BarChart />}
                    isActive={isActive('/shop-dashboard/reports')}
                />
                <Divider className="my-4 bg-[#5789cf]" />
                <SidebarLink
                    to="/shop-dashboard/products"
                    label="Sản Phẩm"
                    icon={<ShoppingCart />}
                    isActive={isActive('/shop-dashboard/products')}
                />
                <Divider className="my-4 bg-[#5789cf]" />
                <SidebarLink
                    to="/shop-dashboard/orders"
                    label="Đơn Hàng"
                    icon={<CalendarMonth />}
                    isActive={isActive('/shop-dashboard/orders')}
                />
                <Divider className="my-4 bg-[#5789cf]" />
                <SidebarLink
                    to="/shop-dashboard/coupon"
                    label="Mã Giảm Giá"
                    icon={<DiscountIcon />}
                    isActive={isActive('/shop-dashboard/coupon')}
                />
                <Divider className="my-4 bg-[#5789cf]" />
            </div>
            <Button
                variant="subtle"
                color="red"
                onClick={handleLogout}
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
                    : 'text-gray-400 hover:bg-[#5789cf]'
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
