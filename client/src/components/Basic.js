import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {AppBar, Toolbar, Typography, FormControl, FormLabel, Input, Button, InputLabel, Paper} from '@mui/material'
const Basic = (props) => {
  const {user, setUser} = props
 
  const [ticker, setTicker] = useState('')
  const [price, setPrice] = useState()
  const navigate = useNavigate()
 
  const submitHandler = (e) =>{
    e.preventDefault()
    
    axios.get(`http://localhost:8000/getPrice/${ticker}`, {withCredentials:true})
  
      .then((res)=>{
        console.log('front end API' +res.data.c)
        setPrice(res.data.c)
      })
      .catch(err=>console.log('front end API' +err))
  }
  const addStock = (e) =>{
    e.preventDefault()
    axios.post('http://localhost:8000/addStock',{
      
      
        ticker:ticker,
        initialPrice: price,
        currentValue: price
      
      
    }, {withCredentials:true})
    .then((res)=>{
      console.log(res)
      console.log(ticker)
      console.log(price)
      navigate('/dashboard')
    })
    .catch(err=>console.log(err))
  }
  const logOutHandler = (e) =>{
    axios.get('http://localhost:8000/logout',{withCredentials:true})
    .then((res)=>{
        console.log(res)
        console.log('cookie gone')
        setUser(null)
        navigate('/')
    })
    .catch((err)=>{
      console.log(err)
    })
}
 
  const goHome = (e) =>{
    navigate('/dashboard')
  }
  useEffect(()=>{
    axios.get('http://localhost:8000/getLoggedUser', {withCredentials:true})
    .then((res)=>{
      setUser(res.data)
      // console.log(user)
    })
    .catch((err)=>{console.log(err)})
},[]) 

  return (
    <div>
      <AppBar position='static' sx={{color:'black'}}>
        <h1 sx={{color:'black'}}>Trader Trainer</h1>
      </AppBar>
      <Toolbar position='static' sx={{justifyContent: 'space-between', backgroundColor: 'secondary.main'}}>
        <Button sx={{color: 'black'}}onClick={goHome}>Back to Dash</Button>
        <div sx={{flexDirection: 'column'}}>
          <Typography>Search for the next big win!</Typography>
          <Typography>Note: Please be sure that you have entered a valid ticker</Typography>
        </div>
        <Button sx={{color: 'black'}} onClick={logOutHandler}>Log Out</Button>
      </Toolbar>
      <Paper sx={{backgroundColor:'info.main', height:'100vh'}}>
      {/* <FormControl> */}
        <form onSubmit={submitHandler}>
          <FormControl>
            <InputLabel htmlFor='search'>Sticker:</InputLabel>
            <Input name='search' onChange={(e)=>setTicker(e.target.value)}></Input>
            <Button type='submit' sx={{color:'black'}}>Search</Button>
          </FormControl>
        </form>
      {/* </FormControl> */}
        <h2>Current Price:</h2>
        <h2>{price}</h2>
        {
          price?
          <button onClick={addStock}>Add stock to portfolio</button>:
          null
        }
        {/* {
          user.stocks?
          user.stocks.map((stock, index)=>(
            <div>
              <h2 key={index}>{stock.ticker}{stock.initialPrice}</h2>
            </div>
          ))
          :
          null
        } */}
        </Paper>
     
    </div>

  )
}

export default Basic