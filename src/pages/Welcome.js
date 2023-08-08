import classes from './Welcome.module.css';
import { NavLink } from 'react-router-dom';
const Welcome = () => {
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
    return (
        <>
        <div className={classes.message}>
            <span>Welcome to Expense Tracker!!!</span>
            <span className={classes.second}>Your profile is incompleted.
                <NavLink to='/profile'> Complete now</NavLink></span>
            </div>
            <div className={classes.container}>
                <span>Please verify your email :</span>
                <button className={classes.button} onClick={verifyingEmailHandler}>Verify Email</button>
            </div>
        </>
    )
};
export default Welcome;