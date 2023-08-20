import { forwardRef, useImperativeHandle, useState } from 'react';
import classes from './ExpenseTrackerForm.module.css';

const ExpenseTrackerForm = forwardRef((props, ref) => {
    const [eneteredPrice, setEnteredPrice] = useState('');
    const [enteredDescription, setEnteredDescription] = useState('');
    const [enteredCategory, setEnteredCategory] = useState('')
    const [takeId, setTakeId] = useState('')
    useImperativeHandle(ref, () => ({
        editExpense(expense) {
            setTakeId(expense.id);
            setEnteredPrice(expense.price);
            setEnteredDescription(expense.description);
            setEnteredCategory(expense.category);
        }
    }))
   
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
        if (takeId) {
            const updateExpenseDetail = {
                id: takeId,
                price: eneteredPrice,
                 description: enteredDescription,
                category: enteredCategory
            }
            props.updateExpense(updateExpenseDetail);
            setEnteredPrice('');
            setEnteredCategory('');
            setEnteredDescription('');
            setTakeId('')

           
        }

        else {
            const expenseDetail = {
                id: Math.random(),
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
                const response = await fetch(`https://expensetracker-69456-default-rtdb.firebaseio.com/expenses${email}.json`, {
                    method: 'POST',
                    body: JSON.stringify(expenseDetail),
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
    }
   
    
    return (

        <div className={classes.container}>
            <form onSubmit={submitHandler }>
                <label className={classes.label}>Price : </label>
                <input type='number' className={classes.input} onChange={priceChangeHandler} value={eneteredPrice} required></input>
                <label className={classes.label}>Description : </label>
                <input type='text' className={classes.input} onChange={descriptionChangeHandler} value={enteredDescription} required></input>
                <label className={classes.label}>Category : </label>

                <select type='text' onChange={categoryChangeHandler} value={enteredCategory} required>
                    <option value='Select an option'>Select an option</option>
                    <option value='Food'>Food</option>
                    <option value='Petrol'>Petrol</option>
                    <option value='Salary'>Salary</option>
                    <option value='Shoppng'>Shopping</option>
                    <option value='Repair'>Repair</option>
                    <option value='Furniture'>Furniture</option>
                    <option value='Fees'>Fees</option>
                    <option value='Others'>Others</option>
                </select>
                <div>
                    <button className={classes.button}>Add Expense</button>
                </div>
            </form>
        </div>
           
    )
});
export default ExpenseTrackerForm;