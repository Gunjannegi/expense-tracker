import { createSlice } from '@reduxjs/toolkit';

const initialExpensesState = { items: [], totalValue: 0, showPremiumButton: false }

const expenseSlice = createSlice({
	name: 'expenses',
	initialState: initialExpensesState,
	reducers: {
		itemList(state, action) {
			state.items = action.payload
		},
		totalExpenses(state) {
			let totalExpense = state.totalValue
			state.items.forEach(item => {
				totalExpense = totalExpense + Number(item.price)
			})
			if (totalExpense > 10000) {
				state.showPremiumButton = true;
			}
		}
	}
})

export const expensesActions = expenseSlice.actions

export default expenseSlice.reducer;