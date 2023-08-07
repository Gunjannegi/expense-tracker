import { useState } from 'react';
import classes from './Profile.module.css';
const Profile = () => {
    const [enteredName, setEnteredName] = useState('');
    const [enteredUrl, setEnteredUrl] = useState('');
    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value);
    };
    const urlChangeHandler = (event) => {
        setEnteredUrl(event.target.value);
    }
    const submitHandler = async(event) => {
        event.preventDefault();
        const updateProfile = {
            name: enteredName,
            url: enteredUrl
        }
        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDd1F060eXCWEN4kDI0quEanYFlhyDNkPo', {
                method: 'POST',
                body: JSON.stringify(updateProfile),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (!response.ok) {
                const errorData = response.json();
                throw new Error(errorData.message, 'Something went wrong')
            }
            const data = response.json();
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
                <input type='text' onChange={nameChangeHandler }></input>
                <label className={classes.label}>Profile Photo URL :</label>
                <input type='url' onChange={urlChangeHandler}></input>
                <button className={classes.button}>Update</button>
            </form>
        </div>
    )
};
export default Profile;