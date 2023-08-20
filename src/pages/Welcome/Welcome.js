import classes from './Welcome.module.css';
import { NavLink, useHistory } from 'react-router-dom';
const Welcome = () => {
    const history = useHistory();
    const verifyingEmailHandler = async() => {
        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDd1F060eXCWEN4kDI0quEanYFlhyDNkPo', {
                method: 'POST',
                body: JSON.stringify({
                    requestType: 'VERIFY_EMAIL',
                    idToken: localStorage.getItem('token'),

                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }); if (!response.ok) {
                const errorData = await response.json();
                throw new Error('Something went wrong', errorData)
            }
            const data = await response.json();
            console.log('Successfully sent the verification link', data)


        } catch (error) {
            console.log('failed', error.message)
        }
    }
    const trackOfExpenses = () => {
        history.push('/expenselist')
    }
    return (
        <>
        <div className={classes.message}>
            <span>Welcome to Expense Tracker!!!</span>
            <span className={classes.second}>Your profile is incompleted.
                    <NavLink to='/profile'>Complete now</NavLink></span>
                <div className={classes.message2}>Please verify your email :
                    <button className={classes.button} onClick={verifyingEmailHandler}>Verify Email</button>
                </div>
            </div>
            <div className={classes.containersecond}>
                <div className={classes.title}>Track your day-to-day expenses</div>
                <button className={classes.trackButton} onClick={trackOfExpenses}>Expense Tracker</button>
            </div>
        </>
    )
};
export default Welcome;