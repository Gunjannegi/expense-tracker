import { Route, Redirect } from 'react-router-dom';
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import MainHeader from "./Components/MainHeader";
import Welcome from './pages/Welcome';
function App() {
    return (
        <div>
            <MainHeader />
            <div>
                <Route path='/' exact>
                    <Redirect to='/signup' />
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
            </div>
        </div>
    );
}

export default App;
