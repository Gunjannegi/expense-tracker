import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './ExpenseHeader.module.css';
import { Navbar} from 'react-bootstrap';
import { expensesActions } from '../../store/expenses';
import ToggleTheme from './ToggleTheme';
const ExpenseHeader = () => {
    const [premium, setPremium] = useState(localStorage.getItem('premium'));
    const show = useSelector(state => state.expenses.showPremiumButton)
    const dispatch = useDispatch();
    const themeChangeHandler = () => {
        dispatch(expensesActions.show());
        localStorage.setItem('stateOfPremiumButton',false)
        setPremium(true);
        localStorage.setItem('premium',true)
        
    }
    return (
       <header>
            <Navbar className={classes.header1}>
                <div className={classes.tagline1}>What Gets Measured, Gets Managed.</div>
            </Navbar>
                <Navbar className={classes.header}>
                <h1 className={classes.tagline2}>Track Your Expenses</h1>
                <span>
                    {show && < button className={classes.button} onClick={themeChangeHandler}> Activate Premium</button>}
                    {premium && <ToggleTheme/>}
                </span>
            </Navbar>
        </header>
    )

};
export default ExpenseHeader;