import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import ExpenseHeader from './ExpenseHeader';
import { Provider } from 'react-redux';
import store from '../../store/redux';
import { BrowserRouter } from 'react-router-dom';

describe('ExpenseHeader component', () => {
    test('testing first tagline text', () => {

        //Arrange
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ExpenseHeader />
                </BrowserRouter>
            </Provider>);

        //Act
        //...nothing

        //Assert
        try {
            const taglineElement = screen.getByText('What Gets Measured, Gets Managed.');
            expect(taglineElement).toBeInTheDocument();
        } catch (error) {
            // Assertion failed, handle the error
            throw error;
        }
    })

    test('testing second tagline text', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ExpenseHeader />
                </BrowserRouter>
            </Provider>);
        try {
            const taglineElement = screen.getByText('Track Your Expenses');
            expect(taglineElement).toBeInTheDocument();
        } catch (error) {
            throw error;
        }
    })

})
