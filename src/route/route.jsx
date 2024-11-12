import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
    RouterProvider,
} from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import ShopLayout from '../layout/ShopLayout';
import Error404 from '../page/404/Error404';
import EmailVerificationPage from '../page/EmailVerificationPage/EmailVerificationPage';
import ForgotPasswordPage from '../page/ForgotPasswordPage/ForgotPasswordPage';
import Home from '../page/home/Home';
import Login from '../page/LoginPage/LoginPage';
import PostPage from '../page/post/PostPage';
import ProductDetails from '../page/product-details/ProductDetails';
import ResetPasswordPage from '../page/ResetPasswordPage/ResetPasswordPage';
import Search from '../page/search/Search';
import Shop from '../page/shop/Shop';

// trước khi config
import NoneFooterLayout from '@layout/NoneFooterLayout';
import ShopDashboardLayout from '@layout/ShopDashboard';
import AppointmentList from '@pages/appointment/AppointmentsPage';
import AppointmentSumary from '@pages/appointment/AppointmentSumary';
import MakeAppointment from '@pages/appointment/MakeAppointment';
import Checkout from '@pages/checkout/checkout';
import DoctorList from '@pages/doctor/DoctorList';
import AddNewPet from '@pages/pet/AddNewPet';
import PetDetail from '@pages/pet/PetDetail';
import DoctorRegister from '@pages/service-register/doctor/DoctorRegister';
import ServiceRegister from '@pages/service-register/ServiceRegister';
import ShopRegister from '@pages/service-register/shop/ShopRegister';
import Orders from '@pages/shop-dashboard/shop-orders';
import Overview from '@pages/shop-dashboard/shop-overview';
import Products from '@pages/shop-dashboard/shop-products';
import Reports from '@pages/shop-dashboard/shop-reports';
import Users from '@pages/shop-dashboard/shop-users';
import DoctorDashboardLayout from '../layout/DoctorDashboardLayout';
import PostLayout from '../layout/PostLayout';
import Cart from '../page/cart/Cart';
import AppoinmentDetails from '../page/doctor-dashboard/AppoinmentDetails';
import CalendarPage from '../page/doctor-dashboard/CalendarPage';
import PetListPage from '../page/pet/PetListPage';
import SignUp from '../page/SignUpPage/SignUpPage';
import UserPage from '../page/user/UserPage';
import ProtectedRoute from './ProtectedRoute';

// import ProtectedRoute from './ProtectedRoute';
// import MedicalPortal from '@pages/doctor/MedicalPortal/MedicalPortal';

// sau khi config

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path="/"
                element={<MainLayout />}
                errorElement={<Error404 />}
            >
                <Route index element={<Home />} />
                {/* <Route path="your-pet" element={<PetListPage />} />
                <Route path="your-pet/:petId" element={<PetDetail />} />
                <Route path="your-pet/add-new-pet" element={<AddNewPet />} /> */}
            </Route>
            <Route
                path="/shop"
                element={<ShopLayout />}
                errorElement={<Error404 />}
            >
                <Route index element={<Shop />} />
                <Route path="product/:id" element={<ProductDetails />} />
                <Route path="search" element={<Search />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout/:id" element={<Checkout />} />
                <Route
                    path="shop-category/:category"
                    element={<ShopCategory />}
                />
            </Route>
            <Route path="cart" element={<Cart />} />

            <Route
                path="/doctor-dashboard"
                element={
                    <ProtectedRoute
                        allowedRoles={['Doctor']}
                        element={<DoctorDashboardLayout />}
                    />
                }
                errorElement={<Error404 />}
            >
                <Route index element={<Navigate to={'calendar'} />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route
                    path="appointment/:appointmentId"
                    element={<AppoinmentDetails />}
                />
            </Route>

            <Route
                path="/shop-dashboard"
                element={
                    <ProtectedRoute
                        allowedRoles={['Seller']}
                        element={<ShopDashboardLayout />}
                    />
                }
                errorElement={<Error404 />}
            >
                <Route index element={<Navigate to="overview" replace />} />
                <Route path="overview" element={<Overview />} />
                <Route path="products" element={<Products />} />
                <Route path="orders" element={<Orders />} />
                <Route path="users" element={<Users />} />
                <Route path="reports" element={<Reports />} />
            </Route>

            <Route
                path="/your-pet"
                element={
                    <ProtectedRoute
                        allowedRoles={['PetOwner']}
                        element={<NoneFooterLayout />}
                    />
                }
                errorElement={<Error404 />}
            >
                <Route index element={<PetListPage />} />
                <Route path=":petId" element={<PetDetail />} />
                <Route path="add-new-pet" element={<AddNewPet />} />
            </Route>

            <Route
                path="/post"
                element={
                    <ProtectedRoute
                        element={<PostLayout />}
                        allowedRoles={['PetOwner']}
                    />
                }
                errorElement={<Error404 />}
            >
                <Route index element={<PostPage />} />
            </Route>

            <Route
                path="/account"
                element={
                    <ProtectedRoute
                        element={<MainLayout />}
                        allowedRoles={['PetOwner']}
                    />
                }
                errorElement={<Error404 />}
            >
                <Route index element={<UserPage />} />
            </Route>

            <Route
                path="/service"
                element={
                    <ProtectedRoute
                        element={<NoneFooterLayout />}
                        allowedRoles={['PetOwner']}
                    />
                }
                errorElement={<Error404 />}
            >
                <Route index element={<ServiceRegister />} />
                <Route path="doctor-register" element={<DoctorRegister />} />
                <Route path="sale-register" element={<ShopRegister />} />
            </Route>

            <Route
                path="/appointment"
                element={
                    <ProtectedRoute
                        element={<NoneFooterLayout />}
                        allowedRoles={['PetOwner']}
                    />
                }
                errorElement={<Error404 />}
            >
                <Route index element={<AppointmentList />} />
                <Route path="make-appointment" element={<MakeAppointment />} />
                <Route
                    path="make-appointment/confirmation"
                    element={<AppointmentSumary />}
                />
            </Route>

            <Route
                path="/doctors"
                element={
                    <ProtectedRoute
                        element={<NoneFooterLayout />}
                        allowedRoles={['PetOwner']}
                    />
                }
                errorElement={<Error404 />}
            >
                <Route index element={<DoctorList />} />
                {/* <Route path="make-appointment" element={<MakeAppointment />} /> */}
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verify-email" element={<EmailVerificationPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
                path="/reset-password/:token"
                element={<ResetPasswordPage />}
            />
        </>,
    ),
);

export default function Router() {
    return <RouterProvider router={router} />;
}
