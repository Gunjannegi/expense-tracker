import { NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import classes from './MainHeader.module.css';

//import { useContext } from 'react';
//import AuthContext from '../store/auth-context';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth';
const MainHeader = () => {
    const dispatch = useDispatch()
    //const authCntxt = useContext(AuthContext);
    const isAuth = useSelector(state => state.auth.isAuthenticated)
    const logoutUser = () => {
        dispatch(authActions.logout());
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('premium');
        localStorage.removeItem('stateOfPremiumButton');
    }
    return (
        
        <header>
            <Navbar bg="dark" expand="sm" variant="dark">
                <div>
                    <span>
                        <NavLink to='/signup' className={classes.title}>Sign Up</NavLink>
                        </span>
                        <span>
                        {!isAuth && < NavLink to='/login' className={classes.title}>Login</NavLink>}
                        {isAuth && < NavLink to='/login' className={classes.title} onClick={logoutUser}>Logout</NavLink>}
                        </span>
               </div>
            </Navbar>
            </header>
        

    )
};
export default MainHeader;