import classes from './ExpenseHeader.module.css';
import { Navbar} from 'react-bootstrap';
const ExpenseHeader = () => {
    return (
       <header>
            <Navbar className={classes.header1}>
                <div className={classes.tagline1}>What Gets Measured, Gets Managed.</div>
            </Navbar>
                <Navbar className={classes.header}>
                    <h1 className={classes.tagline2}>Track Your Expenses</h1>
            </Navbar>
        </header>
    )

};
export default ExpenseHeader;