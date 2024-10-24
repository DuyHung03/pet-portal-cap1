import {
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
    RouterProvider,
} from 'react-router-dom';

import MainLayout from '../layout/MainLayout';
import ShopLayout from '../layout/ShopLayout';
import PostLayout from '../layout/PostLayout';

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
import SignUp from '../page/SignUpPage/SignUpPage';
import ProtectedRoute from './ProtectedRoute';
import Cart from '../page/cart/Cart';
import AddNewPet from '../component/pet/AddNewPet';
import DoctorDashboardLayout from '../layout/DoctorDashboardLayout';
import AppoinmentDetails from '../page/doctor-dashboard/AppoinmentDetails';
import CalendarPage from '../page/doctor-dashboard/CalendarPage';
import PetListPage from '../page/pet/PetListPage';
import UserPage from '../page/user/UserPage';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Main Layout */}
            <Route
                path="/"
                element={<MainLayout />}
                errorElement={<Error404 />}
            >
                <Route index element={<Home />} />
                <Route path="your-pet" element={<PetListPage />} />
                <Route path="your-pet/add-new-pet" element={<AddNewPet />} />
            </Route>

            {/* Shop Layout */}
            <Route
                path="/shop"
                element={<ShopLayout />}
                errorElement={<Error404 />}
            >
                <Route index element={<Shop />} />
                <Route path="product/:id" element={<ProductDetails />} />
                <Route path="search" element={<Search />} />
                <Route path="cart" element={<Cart />} />
            </Route>

            <Route path="/cart" element={<Cart />} />

            {/* Medical Portal */}
            <Route
                path="/doctor-dashboard"
                element={<DoctorDashboardLayout />}
                errorElement={<Error404 />}
            >
                <Route index element={<Navigate to={'calendar'} />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route
                    path="appointment/:appointmentId"
                    element={<AppoinmentDetails />}
                />
            </Route>

            {/* Post Layout with Protected Route */}
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

            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/verify-email" element={<EmailVerificationPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route
                path="/reset-password/:token"
                element={<ResetPasswordPage />}
            />

            {/* Account */}
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
        </>
    ),
);

export default function Router() {
    return <RouterProvider router={router} />;
}
