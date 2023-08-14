import { Route, Redirect } from 'react-router-dom';
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import MainHeader from "./Components/MainHeader";
import Welcome from './pages/Welcome/Welcome';
import Profile from './pages/Profile/Profile';
//import { useContext } from 'react';
//import AuthContext from './store/auth-context';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ExpenseList from './pages/ExpenseTracker/ExpenseList';
import { useSelector } from 'react-redux';
function App() {
    //const authCntxt = useContext(AuthContext)
    const isAuth = useSelector(state => state.auth.isAuthenticated)
    return (
        <div>
            <MainHeader />
            <div>
                <Route path='/' exact>
                    {isAuth && <Redirect to='/welcome' />}
                    {!isAuth && <Redirect to='/signup' />}
                </Route>
                <Route path='/signup'>
                    <SignUp />
                </Route>
                <Route path='/login' exact>
                    <Login />
                </Route>
                <Route path='/welcome' exact>
                    <Welcome />
                </Route>
                <Route path='/profile'>
                    <Profile />
                </Route>
                <Route path='/password'>
                    <ForgotPassword />
                </Route>
                <Route path='/expenselist'>
                    <ExpenseList />
                </Route>
            </div>
        </div>
    );
}

export default App;