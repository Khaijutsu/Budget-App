import React, { useEffect } from 'react'
import styled from 'styled-components'
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import ExpensesForm from './ExpensesForm';
import ExpenseItem from './ExpensesItem';

const Expenses = () => {
  const { expenses, getExpenses, deleteExpense, totalExpense} = useGlobalContext();

  useEffect(() => {
    getExpenses()
  }, [])

  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>Expenses</h1>
        <h2 className='total-expense'>Total Expense: <span>${totalExpense()}</span></h2>
        <div className='expense-content'>
          <div className='form-container'>
            <ExpensesForm />
          </div>
          <div className='expenses'>
            {expenses.map((expense) => {
              const {expense_id, title, amount, date, category, desc, type} = expense;
              return <ExpenseItem 
                key={expense_id}
                id={expense_id}
                title={title}
                amount={amount}
                category={category}
                desc={desc}
                date={date}
                type={type}
                indicatorColor="red"
                deleteItem={deleteExpense}
                />
              })}
          </div>
        </div> 
      </InnerLayout>
    </ExpenseStyled>
  )
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-expense{
      display: flex;
      justify-content: center;
      align-items: center;
      background: #FCF6F9;
      border: 2px solid #FFFFFF;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      border-radius: 20px;
      padding: 1rem;
      margin: 1rem 0;
      font-size: 2rem;
      gap: .5rem;
      span{
          font-size: 2.5rem;
          font-weight: 800;
          color: red;
      }
  }
    .expense-content{
        display: flex;
        gap: 2rem;
        .expenses{
            flex: 1;
        }
    }
`;

export default Expenses