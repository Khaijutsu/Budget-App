import db from "../db/db.js";

const addExpense = (req,res) => {
  const q = "INSERT INTO EXPENSE (`title`, `amount`, `category`, `desc`, `date`) VALUES (?)"
  const values = [
    req.body.title,
    req.body.amount,
    req.body.category,
    req.body.desc,
    req.body.date
  ]; 

  db.query(q,[values], (err,data)=> {
    if(err) return res.json(err)
    return res.json("Expense has been created sucessfully")
  })
}


const getExpenses = (req,res) => {
  const q = "SELECT * FROM EXPENSE"
  db.query(q,(err,data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
}

const deleteExpense = (req,res) => {
  const expenseId = req.params.id;
  const q = "DELETE FROM EXPENSE WHERE EXPENSE_ID = ?"
  db.query(q,[expenseId], (err,data)=> {
    if (err) return res.json(err)
    return res.json("Expense has been deleted sucessfully")
  })
}


export { addExpense, getExpenses, deleteExpense }