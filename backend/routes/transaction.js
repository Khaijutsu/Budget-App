import express from 'express';
import { addIncome, deleteIncome, getIncomes } from '../controllers/income.js';
import { addExpense, deleteExpense, getExpenses } from '../controllers/expense.js';

const router = express.Router();

// CRUD - post(create), get(read), put(update), delete(delete)
router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpenses)
    .delete('/delete-expense/:id', deleteExpense)

       


export default router   