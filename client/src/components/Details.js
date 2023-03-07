import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppBar, Toolbar, Button, Typography, Paper, Card, CardContent, CardHeader } from '@mui/material'
const Details = (props) => {
    const {user, setUser} = props
    const[thisStock, setThisStock] = useState({})
    const valueChange = Math.round((thisStock.currentValue - thisStock.initialPrice)*100)/100
    const {id} = useParams()
    const navigate = useNavigate()
    
    useEffect(()=>{
      axios.get(`http://localhost:8000/stock/${id}`, {withCredentials:true})
      .then((res) => {
          console.log(res.data.stocks[0])
          setThisStock(res.data.stocks[0])
          
          
      })
      .catch((err)=> {console.log(err)})
  },[])
    const deleteStock = () =>{
      axios.delete(`http://localhost:8000/deleteStock/${id}`, {withCredentials:true})
      .then((res) => {
        console.log(res)
        navigate('/dashboard')
      })
      .catch(err => console.log(err))
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
  return (
    <div>
        <AppBar position='static' sx={{color:'black'}}>
          <h1 sx={{color:'black'}}>Trader Trainer</h1>
        </AppBar>
        <Toolbar position='static' sx={{justifyContent: 'space-between', backgroundColor: 'secondary.main'}}>
        <Button sx={{color: 'black'}}onClick={goHome}>Back to Dash</Button>
        
        <Button sx={{color: 'black'}} onClick={logOutHandler}>Log Out</Button>
        </Toolbar>
        <Paper>
          <Card sx={{backgroundColor:'info.main'}}>
            <CardContent>
              <Typography>{thisStock.ticker}</Typography>
              <Typography>You bought this stock for {thisStock.initialPrice}</Typography>
              <Typography>The current market value is {thisStock.currentValue}</Typography>
              <Typography>Total return is {valueChange}</Typography>
              <Button sx={{color: 'black'}} onClick={()=>{deleteStock()}}>Delete Me</Button>

            </CardContent>
          </Card>
        </Paper>
      
    </div>
  )
}

export default Details