import { Route, Redirect } from 'react-router-dom';
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MainHeader from "./Components/MainHeader";
import Welcome from './pages/Welcome';
import Profile from './pages/Profile';
import { useContext } from 'react';
import AuthContext from './store/auth-context';
function App() {
    const authCntxt = useContext(AuthContext)
    return (
        <div>
            <MainHeader />
            <div>
                <Route path='/' exact>
                    {authCntxt.isLoggedIn && <Redirect to='/welcome' />}
                    {!authCntxt.isLoggedIn && <Redirect to='/signup'/>}
                </Route>
                <Route path='/signup'>
                    <SignUp />
                </Route>
                <Route path='/login' exact>
                    <Login />
                </Route>
                <Route path='/welcome'>
                    <Welcome />
                </Route>
                <Route path='/profile'>
                    <Profile/>
                </Route>
            </div>
        </div>
    );
}

export default App;
