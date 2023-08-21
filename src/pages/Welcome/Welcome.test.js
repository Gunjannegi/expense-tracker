import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import store from '../../store/redux';
import { BrowserRouter } from 'react-router-dom';
import Welcome from './Welcome';

describe('Welcome Component', () => {
    test('renders Expense Tracker button text', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Welcome />
                </BrowserRouter>
            </Provider>
        )

        const ExpenseTrackerButton = screen.getByText('Expense Tracker');
        expect(ExpenseTrackerButton).toBeInTheDocument();

    })

    test('renders welcome text', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Welcome />
                </BrowserRouter>
            </Provider>
        )

        const welcomeElement = screen.getByText('Welcome to Expense Tracker!!!');
        expect(welcomeElement).toBeInTheDocument();

    })

    test('renders profile incomplete text', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Welcome />
                </BrowserRouter>
            </Provider>
        )

        const profileMsg = screen.getByText('Your profile is incompleted.');
        expect(profileMsg).toBeInTheDocument();

    })

})