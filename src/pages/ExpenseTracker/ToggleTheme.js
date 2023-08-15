import { themeActions } from '../../store/theme';
import classes from './ToggleTheme.module.css';
import { useDispatch, useSelector } from 'react-redux';
const ToggleTheme = () => {
    const theme = useSelector(state => state.theme.theme)
    const list = JSON.stringify(useSelector(state => state.expenses.items))
    const dispatch = useDispatch()
    const changeToDarkMode = () => {
        dispatch(themeActions.toggleTheme())
    }
    const changeToLightMode = () => {
        dispatch(themeActions.toggleTheme())
    }

    const downloadExpenseList = () => {
        
        const blob1 = new Blob([list], { type: 'text/plain' })
        const url = URL.createObjectURL(blob1);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'downloadedFile.csv';
        a.style.display = 'none';

        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    return (
        <div className={classes.inline}>
            {theme==='dark' ?
                (<button className={classes.buttonlight} onClick={changeToLightMode}>light mode</button>) :
                (<button className={classes.buttondark} onClick={changeToDarkMode}>dark mode</button>)}
            <button id='button' download="file1.csv" className={classes.buttondownload} onClick={downloadExpenseList}> download </button> 
        </div>
    )
};
export default ToggleTheme;