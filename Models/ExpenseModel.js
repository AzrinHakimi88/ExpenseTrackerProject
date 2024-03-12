import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    type: String,
    amount: Number
});

export const ExpenseModel = mongoose.models.Expense || mongoose.model('Expense', expenseSchema);