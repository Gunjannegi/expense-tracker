import classes from './Welcome.module.css';
import { NavLink } from 'react-router-dom';
const Welcome = () => {
    return (
        <div className={classes.message}>
            <span>Welcome to Expense Tracker!!!</span>
            <span className={classes.second}>Your profile is incompleted.
                <NavLink to='/profile'> Complete now</NavLink></span>
        </div>
    )
};
export default Welcome;