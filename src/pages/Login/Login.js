import { useContext, useRef, useState } from "react"
import classes from './Login.module.css';
import { useHistory, NavLink } from 'react-router-dom';
import AuthContext from "../../store/auth-context";
const Login = () => {
   const history = useHistory()
    const [login, setLogin] = useState(false);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const authCntxt = useContext(AuthContext);
    const submitHandler = async(event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;
        if (!login) {
            try {
                const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDd1F060eXCWEN4kDI0quEanYFlhyDNkPo', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: enteredEmail,
                        password: enteredPassword,
                        returnSecureToken: true
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }

                })
                if (!response.ok) {
                    const errorData = response.json();
                    alert('Please fill correct credentials.')
                    throw new Error(errorData.message || 'Something went wrong!')
                    
                }
                const data = await response.json();
                console.log('successfully loggedIn', data)
                authCntxt.login(data.idToken)
                setLogin(true);

            } catch (error) {
                console.error('login failed', error.message)
            }
        }
    }
    
    const goToWelcomePage = () => {
            history.push('/welcome')
    }
    if (login) {
        goToWelcomePage();
    }
    return (
        <>
         <div className={classes.container}>
            <div className={classes.title}>Login</div>
            <form onSubmit={submitHandler}>
                <input type='email' ref={emailInputRef} placeholder="Email" required></input>
                    <input type='password' ref={passwordInputRef} placeholder="Password" required></input>
                    <div className={classes.forgotpassword}>
                        <NavLink to='/password' >Forgot password?</NavLink>
                    </div>
                <button className={classes.button}>Login</button>
            </form>
        </div>
        
        </>
    )
};
export default Login;