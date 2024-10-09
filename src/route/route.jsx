import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Error404 from '../page/404/Error404';
import Home from '../page/home/Home';
import Login from '../page/login/Login';
import SignUp from '../page/sign-up/SignUp';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path='/' element={<MainLayout />} errorElement={<Error404 />}>
                <Route index element={<Home />} />
            </Route>

            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
        </>
    )
);

export default function Router() {
    return <RouterProvider router={router} />;
}
