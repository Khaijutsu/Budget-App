import React, { useContext, useState } from "react";
import axios from 'axios';

const BASE_URL = "http://localhost:3060/api/v1/";


const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

  const [incomes, setIncomes] = useState([])
  const [expenses, setExpenses] = useState([])
  const [error, setError] = useState(null)

  // INCOME Stuff

  const addIncome = async (income) => {
    await axios.post(`${BASE_URL}add-income`, income)
    .catch((err) => {
      setError(err.response.data.message)
      })
    getIncomes()
  }

  const getIncomes = async () => {
    const response = await axios.get(`${BASE_URL}get-incomes`)
    setIncomes(response.data)
    console.log(response.data)
  }

  const deleteIncome = async (id) => {
    try{
      await axios.delete(`${BASE_URL}delete-income/${id}`)
    }catch(err){
      console.log(err)
    }
    getIncomes()
  } 

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome += income.amount
    })

    return totalIncome.toFixed(2);
  }

   // Expense Stuff

  const addExpense = async (expense) => {
    await axios.post(`${BASE_URL}add-expense`, expense)
    .catch((err) => {
      setError(err.response.data.message)
      })
    getExpenses()
  }

  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}get-expenses`)
    setExpenses(response.data)
    console.log(response.data)
  }

  const deleteExpense = async (id) => {
    try{
      await axios.delete(`${BASE_URL}delete-expense/${id}`)
    }catch(err){
      console.log(err)
    }
    getExpenses()
  } 

  const totalExpense = () => {
    let expenseTotal = 0;
    expenses.forEach((expense) => {
      expenseTotal += expense.amount
    })
    return expenseTotal.toFixed(2)
  }

  const totalBalance = () => {
    return (totalIncome() - totalExpense()).toFixed(2)
  }

  const transactionHistory = () => {
    const history = [...incomes, ...expenses]
    history.sort((a,b) => {
      return new Date(b.created_at) - new Date(a.created_at)
    })

    return history.slice(0,3)
  }
  
  return (
    <GlobalContext.Provider value={
      {addIncome,
       getIncomes,
       deleteIncome,
       totalIncome,
       incomes, 
       addExpense,
       getExpenses,
       deleteExpense,
       totalExpense, 
       expenses,
       totalBalance,
       transactionHistory,
       error,
       setError
      }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GlobalContext)
}