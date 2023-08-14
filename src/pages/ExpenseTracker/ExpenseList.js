import { useEffect, useState, useRef } from 'react';
import ExpenseTrackerForm from "./ExpenseTrackerForm";
import classes from './ExpenseList.module.css';
//import AuthContext from '../../store/auth-context';
import ExpenseHeader from './ExpenseHeader';
import { useDispatch, useSelector } from 'react-redux';
import { expensesActions } from '../../store/expenses';

const ExpenseList = () => {
    // const authCntxt = useContext(AuthContext);
    const isAuth = useSelector(state => state.auth.isAuthenticated)
    const [expenseList, setExpenseList] = useState([]);
    const childRef = useRef()
    const dispatch = useDispatch();
    console.log(expenseList)
    dispatch(expensesActions.itemList(expenseList))
    dispatch(expensesActions.totalExpenses(expenseList))
    const addingExpenses = (expense) => {
        setExpenseList((prevExpenses) => {
            return ([...prevExpenses, expense])
        })
    }

    const updatingExpenses = async (expense) => {
        const updatedExpenseList = expenseList.filter((i) => (
            i.id !== expense.id
        ))
        setExpenseList([...updatedExpenseList, expense])

      try {
            const email = (localStorage.getItem('email')).replace(/[^\w\s]/gi, '').trim();
            const response = await fetch(`https://expensetracker-69456-default-rtdb.firebaseio.com/expenses${email}.json`)
            const existingExpenses = await response.json();
            for (const key in existingExpenses) {
                if (existingExpenses[key].id === expense.id) {
                    existingExpenses[key] = expense;
                }
            }
           const res = await fetch(`https://expensetracker-69456-default-rtdb.firebaseio.com/expenses${email}.json`, {
               method: 'PUT',
               body: JSON.stringify(existingExpenses),
                headers: {
                    'Content-Type': 'application/json'
                }
            }); if (!res.ok) {
                const errorData = await res.json();
                throw new Error('Something went wrong', errorData);
            }
            const data = await res.json();
            console.log('successfully added', data)

        } catch (error) {
           console.log('failed', error.message)
        }
    }
    const showOnScreen = async () => {
        console.log('a')
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
                    id: data[key].id,
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
        if (isAuth) {
            showOnScreen()
        }
    }, [isAuth])

    const deletingExpense = async (id) => {
        const updatedList = expenseList.filter((expense) => (
            expense.id !== Number(id)

        ))
        setExpenseList(updatedList);
        const email = (localStorage.getItem('email')).replace(/[^\w\s]/gi, '').trim();
        try {
            const response = await fetch(`https://expensetracker-69456-default-rtdb.firebaseio.com/expenses${email}.json`)
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error('Something went wrong', errorData);
            }
            const data = await response.json();
            for (const key in data) {
                if (data[key].id === Number(id)) {
                    const res = await fetch(`https://expensetracker-69456-default-rtdb.firebaseio.com/expenses${email}/${key}.json`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    if (!response.ok) {
                        const errorData = await res.json();
                        throw new Error('Something went wrong', errorData);
                    }
                    const data = await res.json();
                    console.log('successfully deleted', data)

                }
            }
        }
        catch (error) {
            console.log('failed', error.message)
        }

    }
    const editingExpense = (expense) => {
        childRef.current.editExpense(expense);
    }

    return (
        <>
            <ExpenseHeader />
            <div className={classes.inline}>
            <ExpenseTrackerForm addExpense={addingExpenses} ref={childRef} updateExpense={updatingExpenses} />
            <div className={classes.container}>
                <table className='table table-hover'>
                        <thead className="thead-dark">
                            <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Price</th>
                            <th scope='col'>Description</th>
                            <th scope='col'>Category</th>
                            <th scope='col'>Edit</th>
                            <th scope='col'>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenseList.map((expense) => (
                            <tr>
                                < th scope='row'>*</th>
                                <td className={classes.span1}>{expense.price}</td>
                                <td className={classes.span2}>{expense.description}</td>
                                <td className={classes.span3}>{expense.category}</td>
                                <td>
                                    <button className={classes.button} onClick={() => editingExpense(expense)}>Edit</button></td>
                                <td>
                                    <button className={classes.button} onClick={() => deletingExpense(expense.id)}>Delete</button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </>
    )
};
export default ExpenseList;