import { useState } from 'react';
import ExpenseTrackerForm from "./ExpenseTrackerForm";
import classes from './ExpenseList.module.css';

const ExpenseList = () => {
    const [expenseList, setExpenseList] = useState([])
    const addingExpenses = (expense) => {
        console.log(expense)
        setExpenseList((prevExpenses) => {
            return ([...prevExpenses, expense])
        })
    }
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