import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { plus } from '../../utils/Icons'
import { useGlobalContext } from '../../context/globalContext'
import Button from '../Button/Button';
import format from 'date-fns/format'



const Form = () => {
  const { addIncome, getIncomes } = useGlobalContext()

  const [inputState, setInputState] = useState({
    title: '',
    amount: '',
    category: '',
    desc: '',
    date: null,
  })

  const { title, amount, date, category, desc } = inputState;


  const handleInput = name => e => {
    setInputState((prevState) => ({ ...prevState, [name]: e.target.value }));
    // setError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    // console.log(inputState)
    addIncome(inputState)
    setInputState({
      title: '',
      amount: '',
      category: '',
      desc: '',
      date: null,
    })
    getIncomes()
  }

  const handleDateChange = (selectedDate) => {
    const formattedDate = format(selectedDate, 'yyyy/MM/dd');
    // console.log(formattedDate)
    setInputState((prevState) => ({ ...prevState, date: formattedDate }));
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <div className='input-control'>
        <input type="text" name={'title'}  value={title} placeholder='Title' onChange={handleInput('title')}/>
      </div>
      <div className='input-control'>
        <input type="number" name={'amount'}  value={amount} placeholder='Amount' onChange={handleInput('amount')}/>
      </div>
      <div className='input-control'>
        <DatePicker 
          id='date'
          placeholderText='Enter A Date'
          selected={date ? new Date(date) : null}
          dateFormat='MM/dd/yyyy' 
          onChange={handleDateChange}
        />
        {/* <input type="text" name='date' value={date} placeholder='Date' onChange={handleInput('date')}/> */}
      </div>
      <div className="selects input-control">
        <select required name={'category'} value={category} id="category" onChange={handleInput('category')}>
          <option value=""  disabled >Select Option</option>
          <option value="salary">Salary</option>
          <option value="freelancing">Freelancing</option>
          <option value="investments">investments</option>
          <option value="stocks">Stocks</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="bank">Bank Transfer</option>  
          <option value="youtube">Youtube</option>  
          <option value="other">Other</option>  
        </select>
      </div>
      <div className='input-control'>
        <textarea name={'desc'} value={desc} placeholder='Add A Reference' id="desc" cols="30" rows="4" onChange={handleInput('desc')}></textarea>
      </div>
      <div className='submit-btn'>
        <Button 
            name = {'Add Income'}
            icon = {plus}
            bPad = {'.8rem 1.6rem'}
            bRad={'30px'}
            bg={'var(--color-accent'}
            color={'#fff'}
        />
      </div>
    </FormStyled>
  )
}


const FormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input, textarea, select{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
        }
    }

    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }
`;


export default Form