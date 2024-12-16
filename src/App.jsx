import emailjs from '@emailjs/browser';
import axiosInstance from '@network/httpRequest';
import { useAuthStore } from '@store/authStore';
import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import Router from './route/route';

function App() {
    const { user, setUserInfo } = useAuthStore();

    emailjs.init({
        publicKey: 'M5U-7455uJ97kM2oR',
        limitRate: {
            // Set the limit rate for the application
            id: 'app',
            // Allow 1 request per 10s
            throttle: 10000,
        },
        blockHeadless: true,
    });

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
