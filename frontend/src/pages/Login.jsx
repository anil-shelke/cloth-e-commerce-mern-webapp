import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const [currentState, setCurrentState] = useState("Login")
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)


  const onSubmitHandler = async (event) => {

    event.preventDefault()
    // console.log(name, email, password)

    try {

      if (currentState == "Sign Up") {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        // console.log(response.data)
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }
        else {
          toast.error(response.data.message)
        }
      }
      else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password })
        console.log(response.data.token)

        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }
        else {
          toast.error(response.data.message)
        }
      }

    } catch (error) {

    }
  }


  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800' action="">
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-black prata-rugular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Login' ? '' : <input onChange={(e) => setName(e.target.value)} value={name} className='w-full px-3 py-2 border border-gray-800' type="text" placeholder='Enter your Name' required />}
      <input onChange={(e) => setEmail((e.target.value))} value={email} className='w-full px-3 py-2 border border-gray-800' type="email" placeholder='Email' required />
      <input onChange={(e) => setPassword(e.target.value)} value={password} className='w-full px-3 py-2 border border-gray-800' type='password' placeholder='password' required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>forgot your password</p>
        {
          currentState == "Login" ?
            <p onClick={() => setCurrentState("Sign Up")} className='cursor-pointer'>create account</p> :
            <p onClick={() => setCurrentState("Login")} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button className='text-white bg-black font-light px-8 py-2 mt-4'>{currentState === "Login" ? "Login" : "Sign UP"}</button>
    </form>
  )
}

export default Login
