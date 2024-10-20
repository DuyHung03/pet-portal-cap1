import {
    createBrowserRouter,
    createRoutesFromElements,
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
import AddNewPet from '../component/pet/AddNewPet';
import PostLayout from '../layout/PostLayout';
import Cart from '../page/cart/Cart';
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
                <Route path="your-pet" element={<PetListPage />} />
                <Route path="your-pet/add-new-pet" element={<AddNewPet />} />
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
            </Route>
            <Route path="cart" element={<Cart />} />

            <Route
                path="/doctor"
                element={<ShopLayout />}
                errorElement={<Error404 />}
            >
                {/* <Route index element={<MedicalPortal />} /> */}
                {/* <Route path='detail/:id' element={<ProductDetails />} /> */}
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
