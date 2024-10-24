import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import Router from './route/route';

function App() {
    return (
        <Fragment>
            <Router />
            <ToastContainer />
        </Fragment>
    );
}

export default App;
