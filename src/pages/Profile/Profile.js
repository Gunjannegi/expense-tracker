import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './Profile.module.css';
const Profile = () => {
    const [enteredName, setEnteredName] = useState('');
    const [enteredUrl, setEnteredUrl] = useState('');
    const authCntxt = useContext(AuthContext);
    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value);
    };
    const urlChangeHandler = (event) => {
        setEnteredUrl(event.target.value);
    }
    
    const previousDataFilling = async () => {
        try {
            
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDd1F060eXCWEN4kDI0quEanYFlhyDNkPo', {
                method: 'POST',
                body: JSON.stringify({
                idToken : localStorage.getItem('token')
            }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error('Something went wrong :' + errorData.message)
            }
            const data = await response.json();
            console.log('successful', data)
            const userInfo = data.users[0].providerUserInfo
            setEnteredName(userInfo[0].displayName);
            setEnteredUrl(userInfo[0].photoUrl);
        } catch (error) {
            console.log('data cannot be refilled', error.message)
        }
        
    };
    useEffect(() => {
        if (authCntxt.isLoggedIn) {
            previousDataFilling()
        }
    }, [authCntxt.isLoggedIn])
    const submitHandler = async(event) => {
        event.preventDefault();
       try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDd1F060eXCWEN4kDI0quEanYFlhyDNkPo', {
                method: 'POST',
                body: JSON.stringify({
                    idToken: localStorage.getItem('token'),
                    displayName: enteredName,
                    photoUrl: enteredUrl,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error('Something went wrong :' + errorData.message)
            }
            const data = await response.json();
           console.log('successfully Updated', data)
           
        } catch (error) {
            console.log('updation failed', error.message)
        }
        
    }

    return (
        <div className={classes.container}>
            <div className={classes.title}>Contact Details</div>
            <form onSubmit={submitHandler}>
                <label className={classes.label}>Full Name :</label>
                <input type='text' onChange={nameChangeHandler} value={enteredName}></input>
                <label className={classes.label}>Profile Photo URL :</label>
                <input type='url' onChange={urlChangeHandler} value={enteredUrl}></input>
                <button className={classes.button}>Update</button>
            </form>
        </div>
    )
};
export default Profile;