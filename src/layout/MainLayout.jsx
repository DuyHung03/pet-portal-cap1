import { Outlet } from 'react-router-dom';
import NavBar from '../component/header-nav/NavBar';
import Header from '../component/header/Header';

function MainLayout() {
    return (
        <div>
            <Header />
            <NavBar />
            <Outlet />
        </div>
    );
}

export default MainLayout;
