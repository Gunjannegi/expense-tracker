import { useContext, useEffect, useState } from 'react';
import ExpenseTrackerForm from "./ExpenseTrackerForm";
import classes from './ExpenseList.module.css';
import AuthContext from '../../store/auth-context';

const ExpenseList = () => {
    const authCntxt = useContext(AuthContext);
    const [expenseList, setExpenseList] = useState([])
    console.log(expenseList)
    const addingExpenses = (expense) => {
        setExpenseList((prevExpenses) => {
            return ([...prevExpenses, expense])
        })
    }
    const showOnScreen = async () => {
        const email = (localStorage.getItem('email')).replace(/[^\w\s]/gi, '').trim();
        console.log(email)
        try {
        const response = await fetch(`https://expensetracker-69456-default-rtdb.firebaseio.com/expenses${email}.json`)            
      if (!response.ok) {
            const errorData = await response.json();
            throw new Error('Something went wrong', errorData);
        }
        const data = await response.json();
            console.log('successfully got the data', data)
            const loadedExpenses = [];
            for (const key in data) {
                loadedExpenses.push({
                    price: data[key].price,
                    description: data[key].description,
                    category: data[key].category
                })
            }
            setExpenseList(loadedExpenses);
    } catch (error) {
        console.log('failed', error.message)
    }
    }
    useEffect(() => {
        if (authCntxt.isLoggedIn) {
            showOnScreen()
        }
    }, [authCntxt.isLoggedIn])
    return (
        <>
            <ExpenseTrackerForm addExpense={addingExpenses} />
            <ul className={classes.container}>
        {expenseList.map((expense) =>(
            <li>
                <span className={classes.span1}>{expense.price}</span>
                <span className={classes.span2}>{expense.description}</span>
                <span className={classes.span3}>{expense.category}</span>

            </li>
        ))}
            </ul>
        </>
    )
};
export default ExpenseList;