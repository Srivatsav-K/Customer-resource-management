import { Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
//-----------------------------------------------------------------------
import NavBar from './navigation/NavBar'
import Home from "./common/Home"
import Login from './common/Login';
import SignUp from './common/Signup';
import PrivateRoute from './helper/PrivateRoute';
import UserContainer from './user/UserContainer';
//-----------------------------------------------------------------------
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import "react-toastify/dist/ReactToastify.css";
import { useSelector } from 'react-redux';
//-----------------------------------------------------------------------

const App = () => {
    const state = useSelector((state) => state)
    console.log(state)
    return (
        <div style={{ marginTop: '6rem' }}>
            <NavBar />

            <ToastContainer autoClose={500} position='top-center' theme='colored' hideProgressBar={true} />


            <Route path='/' component={Home} exact />
            <Route path='/login' component={Login} exact />
            <Route path='/signup' component={SignUp} exact />
            <PrivateRoute path='/user' component={UserContainer} />
        </div>
    )
}

export default App