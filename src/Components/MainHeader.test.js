import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import MainHeader from './MainHeader';
import { Provider } from 'react-redux';
import store from '../store/redux';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('MainHeader component', () => {
    test('testing signup text', () => {

        //Arrange
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <MainHeader />
                </BrowserRouter>
            </Provider>);

        //Act
        //...nothing

        //Assert
        try {
            const signUpElement = screen.getByText('Sign Up');
            expect(signUpElement).toBeInTheDocument();
        } catch (error) {
            // Assertion failed, handle the error
            throw error;
        }
    })

    test('testing login text if it is not clicked', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <MainHeader />
                </BrowserRouter>
            </Provider>);
        try {
            const LoginElement = screen.getByText('Login');
            expect(LoginElement).toBeInTheDocument();
        } catch (error) {
            throw error;
        }
    })

})
