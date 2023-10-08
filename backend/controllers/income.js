import db from "../db/db.js";

const addIncome = (req,res) => {
  const q = "INSERT INTO INCOME (`title`, `amount`, `category`, `desc`, `date`) VALUES (?)"
  const values = [
    req.body.title,
    req.body.amount,
    req.body.category,
    req.body.desc,
    req.body.date
  ]; 

  db.query(q,[values], (err,data)=> {
    if(err) return res.json(err)
    return res.json("Income has been created sucessfully")
  })
}


const getIncomes = (req,res) => {
  const q = "SELECT * FROM INCOME"
  db.query(q,(err,data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
}

const deleteIncome = (req,res) => {
  const incomeId = req.params.id
  const q = "DELETE FROM INCOME WHERE INCOME_ID = ?"
  db.query(q,[incomeId], (err,data)=> {
    if (err) return res.json(err)
    return res.json("Income has been deleted sucessfully")
  })
}

export { addIncome, getIncomes, deleteIncome }


