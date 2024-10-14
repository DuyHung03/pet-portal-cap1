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
import Login from '../page/login/Login';
import ProductDetails from '../page/product-details/ProductDetails';
import Search from '../page/search/Search';
import Shop from '../page/shop/Shop';
import SignUp from '../page/sign-up/SignUp';
import VerifyOtp from '../page/verify-otp/VerifyOtp';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<MainLayout />} errorElement={<Error404 />}>
                <Route index element={<Home />} />
            </Route>

            <Route path='/shop' element={<ShopLayout />} errorElement={<Error404 />}>
                <Route index element={<Shop />} />
                <Route path='product/:id' element={<ProductDetails />} />
                <Route path='search' element={<Search />} />
            </Route>

            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/auth/verify' element={<VerifyOtp />} />
        </>
    )
);

export default function Router() {
    return <RouterProvider router={router} />;
}
