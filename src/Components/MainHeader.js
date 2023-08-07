import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import classes from './MainHeader.module.css';
import { useContext } from 'react';
import AuthContext from '../store/auth-context';
const MainHeader = () => {
    const authCntxt = useContext(AuthContext);
    const logoutUser = () => {
        authCntxt.logout();
    }
    return (
        <header>
            <Navbar bg="dark" expand="sm" variant="dark">
                <div>
                    <Nav>
                        <span>
                            <NavLink to='/signup' className={classes.title}>Sign Up</NavLink>
                        </span>
                        <span>
                            {!authCntxt.isLoggedIn && < NavLink to='/login' className={classes.title}>Login</NavLink>}
                            {authCntxt.isLoggedIn && < NavLink to='/login' className={classes.title} onClick={logoutUser }>Logout</NavLink>}
                        </span>
                    </Nav>
                </div>
            </Navbar>
        </header>

    )
};
export default MainHeader;