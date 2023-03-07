import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = (props) => {
    // const [user, setuser] = useState({
    //     firstName:'',
    //     lastName:'',
    //     email: '',
    //     password:'',
    //     confirmPassword: ''
    // })
    const navigate = useNavigate()
    const {user, setUser} = props
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const regHandler = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:8000/register',{
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            confirmPassword: confirmPass
        }, {withCredentials: true})
        .then((res)=>{
            console.log(res)
            setUser(res)
        })
        .catch(err=>console.log(err))
    }

    const loginHandler = (e) =>{
        e.preventDefault()
        axios.post('http://localhost:8000/login',{
            email: email,
            password: password
        }, {withCredentials:true})
        .then((res)=>{
            console.log(res)
            setUser(res)
            navigate('/dashboard')
            
        })
        .catch((err)=>{
            console.log(err)
            console.log('wrong pass')
        })
    }
  return (
    <div>
        <div id='reg'>
            <h2>Register</h2>
            <form onSubmit={regHandler}>
                <div>
                    <label htmlFor='first_name'>First Name: </label>
                    <input type='text' name='first_name' onChange={(e)=> {setFirstName(e.target.value)}}></input>
                </div>
                <div>
                    <label htmlFor='last_name'>Last Name: </label>
                    <input type='text' name='last_name' onChange={(e)=> {setLastName(e.target.value)}}></input>
                </div>
                <div>
                    <label htmlFor='email'>Email: </label>
                    <input type='text' name='email' onChange={(e)=> {setEmail(e.target.value)}}></input>
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input type='text' name='password' onChange={(e)=> {setPassword(e.target.value)}}></input>
                </div>
                <div>
                    <label htmlFor='confirm_pass'>Confirm Password: </label>
                    <input type='text' name='confirm_pass' onChange={(e)=> {setConfirmPass(e.target.value)}}></input>
                </div>
                <button type='submit'>Register</button>
            </form>
        </div>
        <div id='login'>
            <h2>Login</h2>
            <form onSubmit={loginHandler}>
                <div>
                    <label htmlFor='email'>Email: </label>
                    <input type='text' name='email' onChange={(e)=> {setEmail(e.target.value)}}></input>
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input type='text' name='password' onChange={(e)=> {setPassword(e.target.value)}}></input>
                </div>
                <button type='submit'>Log In</button>
            </form>
        </div>
    </div>
  )
}

export default Register