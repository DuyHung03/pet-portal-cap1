import { Outlet } from 'react-router-dom';
import Header from '../component/header/Header';

function MainLayout() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}

export default MainLayout;