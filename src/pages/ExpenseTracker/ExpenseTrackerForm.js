import { useState } from 'react';
import classes from './ExpenseTrackerForm.module.css';
const ExpenseTrackerForm = (props) => {
    const [eneteredPrice, setEnteredPrice] = useState('');
    const [enteredDescription, setEnteredDescription] = useState('');
    const [enteredCategory, setEnteredCategory] = useState('')
    const priceChangeHandler = (event) => {
        setEnteredPrice(event.target.value);
    };
    const descriptionChangeHandler = (event) => {
        setEnteredDescription(event.target.value);
    };
    const categoryChangeHandler = (event) => {
        setEnteredCategory(event.target.value);
    };
    const submitHandler = async(event) => {
        event.preventDefault();
        const expenseDetail = {
            price: eneteredPrice,
            description: enteredDescription,
            category: enteredCategory
        }
        props.addExpense(expenseDetail);
        setEnteredPrice('');
        setEnteredCategory('');
        setEnteredDescription('');

        try {
            const email = (localStorage.getItem('email')).replace(/[^\w\s]/gi, '').trim();
            console.log(email)
            const response = await fetch(`https://expensetracker-69456-default-rtdb.firebaseio.com/expenses${email}.json`, {
                method: 'POST',
                body: JSON.stringify({
                    price: eneteredPrice,
                    description: enteredDescription,
                    category: enteredCategory
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }); if (!response.ok) {
                const errorData = await response.json();
                throw new Error('Something went wrong', errorData);
            }
            const data = await response.json();
            console.log('successfully added', data)
        } catch (error) {
            console.log('failed', error.message)
        }

    }

    return (

        <div className={classes.container}>
            <form onSubmit={submitHandler }>
                <label className={classes.label}>Price : </label>
                <input type='number' className={classes.input} onChange={priceChangeHandler } required></input>
                <label className={classes.label}>Description : </label>
                <input type='text' className={classes.input} onChange={descriptionChangeHandler } required></input>
                <label className={classes.label}>Category : </label>
                <input type='text' className={classes.input} onChange={categoryChangeHandler } required></input>
                <select></select>
                <div>
                    <button className={classes.button}>Add Expense</button>
                </div>
            </form>
        </div>
    )
};
export default ExpenseTrackerForm;