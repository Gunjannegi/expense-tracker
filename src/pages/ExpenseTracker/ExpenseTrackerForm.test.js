import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import store from '../../store/redux';
import { BrowserRouter } from 'react-router-dom';
import ExpenseTrackerForm from './ExpenseTrackerForm';

describe('ExpenseTrackerForm component', () => {
    test('testing first label text', () => {

        //Arrange
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ExpenseTrackerForm />
                </BrowserRouter>
            </Provider>);

        //Act
        //...nothing

        //Assert
        try {
            const priceElement = screen.getByText('Price :');
            expect(priceElement).toBeInTheDocument();
        } catch (error) {
            // Assertion failed, handle the error
            throw error;
        }
    })

    test('testing second label text', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ExpenseTrackerForm />
                </BrowserRouter>
            </Provider>);
        try {
            const descriptionElement = screen.getByText('Description :');
            expect(descriptionElement).toBeInTheDocument();
        } catch (error) {
            throw error;
        }
    })

    test('testing third label text', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ExpenseTrackerForm />
                </BrowserRouter>
            </Provider>);
        try {
            const categoryElement = screen.getByText('Category :');
            expect(categoryElement).toBeInTheDocument();
        } catch (error) {
            throw error;
        }
    })

    test('testing first option text', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ExpenseTrackerForm />
                </BrowserRouter>
            </Provider>);
        try {
            const firstOptionElement = screen.getByText('Food');
            expect(firstOptionElement).toBeInTheDocument();
        } catch (error) {
            throw error;
        }
    })

    test('testing second option text', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ExpenseTrackerForm />
                </BrowserRouter>
            </Provider>);
        try {
            const secondOptionElement = screen.getByText('Petrol');
            expect(secondOptionElement).toBeInTheDocument();
        } catch (error) {
            throw error;
        }
    })

    test('testing third option text', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ExpenseTrackerForm />
                </BrowserRouter>
            </Provider>);
        try {
            const thirdOptionElement = screen.getByText('Salary');
            expect(thirdOptionElement).toBeInTheDocument();
        } catch (error) {
            throw error;
        }
    })
    
        
})


