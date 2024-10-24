import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';

import MainLayout from '../layout/MainLayout';
import ShopLayout from '../layout/ShopLayout';
import PostLayout from '../layout/PostLayout';

import Error404 from '../page/404/Error404';
import MedicalPortal from '../page/doctor/MedicalPortal/MedicalPortal';
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
import Cart from '@pages/cart/Cart';

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
            </Route>
            <Route path="/cart" element={<Cart />} />

            {/* Medical Portal */}
            <Route
                path="/doctor"
                element={<ShopLayout />}
                errorElement={<Error404 />}
            >
                <Route index element={<MedicalPortal />} />
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
            <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        </>
    )
);

export default function Router() {
    return <RouterProvider router={router} />;
}
