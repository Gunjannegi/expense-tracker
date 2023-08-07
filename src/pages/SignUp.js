import { useState } from 'react';
import classes from './SignUp.module.css';
const SignUp = () => {
    const [signup, setSignup] = useState(false);
    const [enteredEmail, setEnteredEmail] = useState('');
    const [eneteredPassword, setEnteredPassword] = useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value)
    };

    const passwordChangeHandler = (event) => {
        setEnteredPassword(event.target.value)
    };

    const confirmPasswordHandler = (event) => {
        setEnteredConfirmPassword(event.target.change)
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        const UserSignUpDetail = {
            email: enteredEmail,
            password: eneteredPassword
        }
        if (eneteredPassword === enteredConfirmPassword) {
            try {
                const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDd1F060eXCWEN4kDI0quEanYFlhyDNkPo', {
                    method: 'POST',
                    body: JSON.stringify(UserSignUpDetail),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (!response.ok) {
                    const errorData = response.json();
                    throw new Error(errorData.message || 'Something went wrong')
                }

                const data = await response.json();
                console.log('successfully signed up', data)
                setSignup(true);
            } catch (error) {
                console.error('signup failed', error.message)
            }

        }
    };
    return (
        <>
        <div className={classes.container}>
            <div className={classes.title}>Sign Up</div>
            <form onSubmit={submitHandler}>
                <input type='email' onChange={emailChangeHandler} placeholder="Email" required></input>
                <input type='password' onChange={passwordChangeHandler} placeholder="Password" required></input>
                <input type='password' onChange={confirmPasswordHandler} placeholder="Confirm Password" required></input><br/>
                <button>Sign Up</button>
            </form>
        </div>
            {signup && <p>Your Account has been successfully signed up!!</p>}
        </>
    )
};
export default SignUp;