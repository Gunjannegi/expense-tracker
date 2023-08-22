import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import store from '../../store/redux';
import { BrowserRouter } from 'react-router-dom';
import ExpenseList from './ExpenseList';

describe('ExpenseList component', () => {
    test('testing first label text', () => {

        //Arrange
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ExpenseList />
                </BrowserRouter>
            </Provider>);

        //Act
        //...nothing

        //Assert
        try {
            const labelElement = screen.getByText('Price');
            expect(labelElement).toBeInTheDocument();
        } catch (error) {
            // Assertion failed, handle the error
            throw error;
        }
    })

    test('testing second label text', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ExpenseList />
                </BrowserRouter>
            </Provider>);
        try {
            const descriptionLabel = screen.getByText('Description');
            expect(descriptionLabel).toBeInTheDocument();
        } catch (error) {
            throw error;
        }
    })

    test('testing third label text', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ExpenseList />
                </BrowserRouter>
            </Provider>);
        try {
            const categoryLabel = screen.getByText('Category');
            expect(categoryLabel).toBeInTheDocument();
        } catch (error) {
            throw error;
        }
    })

    test('testing fourth label text', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ExpenseList />
                </BrowserRouter>
            </Provider>);
        try {
            const editLabel = screen.getByText('Edit');
            expect(editLabel).toBeInTheDocument();
        } catch (error) {
            throw error;
        }
    })

    test('testing fifth label text', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ExpenseList />
                </BrowserRouter>
            </Provider>);
        try {
            const deleteLabel = screen.getByText('Delete');
            expect(deleteLabel).toBeInTheDocument();
        } catch (error) {
            throw error;
        }
    })

    test('testing the async function which show items on screen', async () => {
        window.fetch = jest.fn();
        window.fetch.mockResolvedValueOnce({
            json: async () => [{id: '1', price: 100, description:'Expense 1',category:'Category 1'}]
        })
        render(
            <Provider store={store}>
                    <BrowserRouter>
                        <ExpenseList/>
                    </BrowserRouter>
                </Provider>)
        const listItemElements = await screen.findAllByRole('row');
        expect(listItemElements).not.toHaveLength(0);
    })
})