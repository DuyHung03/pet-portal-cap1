import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import ShopLayout from '../layout/ShopLayout';
import Error404 from '../page/404/Error404';
import Home from '../page/home/Home';
import Login from '../page/LoginPage/LoginPage';
import ProductDetails from '../page/product-details/ProductDetails';
import Shop from '../page/shop/Shop';
import SignUp from '../page/SignUpPage/SignUpPage';
import EmailVerificationPage from '../page/EmailVerificationPage/EmailVerificationPage';
import ResetPasswordPage from '../page/ResetPasswordPage/ResetPasswordPage';
import ForgotPasswordPage from '../page/ForgotPasswordPage/ForgotPasswordPage';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<MainLayout />} errorElement={<Error404 />}>
                <Route index element={<Home />} />
            </Route>

            <Route path='/shop' element={<ShopLayout />} errorElement={<Error404 />}>
                <Route index element={<Shop />} />
                <Route path='product/:id' element={<ProductDetails />} />
            </Route>

            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/verify-email' element={<EmailVerificationPage />} />
            <Route
                path='/forgot-password'
                element={
                    <ForgotPasswordPage />
                }
            />
            <Route
                path='/reset-password/:token'
                element={<ResetPasswordPage />}
            />
        </>
    )
);

export default function Router() {
    return <RouterProvider router={router} />;
}
