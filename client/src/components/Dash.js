import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import { CardContent, Toolbar, Typography } from '@mui/material'
import {Button} from '@mui/material'
import {Card, Paper} from '@mui/material'
import { color } from '@mui/system'
const Dash = (props) => {
    const navigate = useNavigate()
    const {user, setUser} = props
    

    const searchHandler = (e) =>{
      navigate('/search')
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
    const updateStepTWo = (id, newPrice) =>{
      console.log('step2 with' + newPrice)
      axios.put(`http://localhost:8000/update/${id}`,{
          currentValue : newPrice
        }, {withCredentials:true})
      .then((res)=>{
          console.log(res)
          window.location.reload(true)
        })
      .catch((err)=>{
          console.log('innerFailed')
          console.log(err)
        })
  }
    const updateCurrentVal = ()=>
      user.stocks?
      
      user.stocks.forEach((stock)=>{
        console.log(stock)
        const ticker = stock.ticker
        const id = stock._id
       
        axios.get(`http://localhost:8000/getPrice/${ticker}`, {withCredentials:true})

        .then((res)=>{
          console.log('the new price is:' ,res.data.c)
          
          updateStepTWo(id, res.data.c)
        })
        .catch(err=>console.log(err))
    
      })
      :
      null
    
    
  
    useEffect(()=>{
        console.log('test')
        updateCurrentVal()
        axios.get('http://localhost:8000/getLoggedUser', {withCredentials:true})
        .then((res)=>{
            setUser(res.data)
        })
        .catch((err)=>{console.log(err)})
    },[])
    
    
  return (
    <div>
      <AppBar position='static' sx={{color:'black'}}>
        <h1 sx={{color:'black'}}>Trader Trainer</h1>
      </AppBar>
      <Toolbar position='static' sx={{justifyContent: 'space-between', backgroundColor: 'secondary.main'}}>
        <Button sx={{color:'black'}}onClick={updateCurrentVal}>update</Button>
        <Button sx={{color:'black'}}onClick={searchHandler}>Browse Stocks</Button>
        <Button sx={{color:'black'}}onClick={logOutHandler}>Logout</Button>
      </Toolbar>
      <Paper sx={{height:'100vh',backgroundColor:'info.main'}}>
        {
          user.stocks?
          user.stocks.map((stock, index)=>(
            <Card sx={{backgroundColor:'info.main'}}>
              <CardContent>
                <Typography>
                  {stock.ticker}
                </Typography>
                {/* <Typography>
                  {stock.initialPrice}
                </Typography> */}
                <Typography>
                  Current Price: {stock.currentValue}
                </Typography>
                <Link to={`/${stock._id}`} ><Button sx={{color:'black'}}>View Details</Button></Link>
              </CardContent>
            </Card>
          ))
          :
          null
        }
      </Paper>
    </div>
    
  )
}

export default Dash