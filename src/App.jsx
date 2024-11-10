import axiosInstance from '@network/httpRequest';
import { useAuthStore } from '@store/authStore';
import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import Router from './route/route';

function App() {
    const { user, setUserInfo } = useAuthStore();

    const getUserInfo = async () => {
        const res = await axiosInstance.get(`/auth/users/${user.id}`);
        if (res.status == 200) {
            setUserInfo(res.data.user);
        }
    };

    if (user?.id != null) {
        getUserInfo();
    }
    return (
        <Fragment>
            <Router />
            <ToastContainer />
        </Fragment>
    );
}

export default App;
