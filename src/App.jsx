import { ToastContainer } from 'react-toastify';
import Router from './route/route';
import { Fragment } from 'react';

function App() {
    return (
        <Fragment>
            <Router />;
            <ToastContainer/>
        </Fragment>
    )
}

export default App;
