import React, { useEffect, useState } from 'react'
import { backendUrl } from '../App'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler = async (event) =>{
        try {
            event.preventDefault()
            console.log(email, password)

            const response = await axios.post(backendUrl + '/api/user/admin', {email, password});
            console.log(response)

            if(response.data.success){
                setToken(response.data.token)
            }
            else{
                console.log(response.data.message)
                toast.error(response.data.message);
            }
            

        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }


  return (
    <div className='min-h-screen flex item-center justify-center w-full'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
        <h1 className='text-2xl text-gray-700 font-bold mb-4'>Admin panel</h1>
        <form onSubmit={onSubmitHandler}>
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='text-black rounded-md w-full px-3 py-2 border border-gray-300 ouline-none' type="email" placeholder='youremail.com' required name="" id="" />
            </div>
            <div className='mb-3 min-w-72'>
                <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='text-black rounded-md w-full px-3 py-2 border border-gray-300 ouline-none' type="password" placeholder='Enter your password' required />
            </div>
            <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login