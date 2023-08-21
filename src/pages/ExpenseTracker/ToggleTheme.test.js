import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import store from '../../store/redux';
import { BrowserRouter } from 'react-router-dom';
import ToggleTheme from './ToggleTheme';

describe('toggleThemeComponent', () => {
    test('renders download button text', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ToggleTheme/>
                </BrowserRouter>
            </Provider>
        )

        const downloadElement = screen.getByText('download');
        expect(downloadElement).toBeInTheDocument();

    })
    test('renders dark mode text', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <ToggleTheme />
                </BrowserRouter>
            </Provider>
        )
        const lightModeElement = screen.getByText('dark mode');
        expect(lightModeElement).toBeInTheDocument();
    })
})