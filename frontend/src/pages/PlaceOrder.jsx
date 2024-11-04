import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');

  const {navigate, cartItems,setCartItems, products, getCartAmount, delivery_fee, backendUrl, token} = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onchangHandler = (event)=>{
    const name = event.target.name
    const value = event.target.value

    setFormData(data => ({...data, [name]:value}))
  }


  const onsubmitHandler = async (e) =>{
    e.preventDefault();
    // console.log(formData)

    try {
      let orderItems = [] 
      for(const items in cartItems){
        for(const item in cartItems[items]){
            if(cartItems[items][item] > 0){
              const itemInfo = structuredClone(products.find(product => product._id === items))
              if(itemInfo){
                itemInfo.size = item
                itemInfo.quantity = cartItems[items][item]
                orderItems.push(itemInfo)
              }
            }
        }
      }
      // console.log(orderItems)
      
      let orderData = {
        address:formData, 
        items:orderItems,
        amount:getCartAmount() + delivery_fee
      }

      switch (method){

        // Api calls for COD
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers:{token}})
          // console.log(response)
          if(response.data.success){
            toast.success(response.data.message)
            setCartItems({})
            navigate('/orders')
          }
          else{
            toast.error(response.data.message)
          }
          break;

        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData,{headers:{token}})
          console.log(responseStripe)
          if(responseStripe.data.success){
            const {session_url} = responseStripe.data
            window.location.replace(session_url)
          }
          else{
            console.log(responseStripe.data.message)
            toast.error(responseStripe.data.message)
          }
          break;
        
        default:
          break;
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  

  return (
    <form onSubmit={onsubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

      {/* ---  Left Side  ----- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
          
          <div className='text-xl sm:text-2xl my-3'>
            <Title text1={"DELIVERY"} text2={'INFORMATION'}/>
          </div>
          <div className='flex gap-3'>
            <input required onChange={onchangHandler} name='firstName' value={formData.firstName} className='text-black border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name'/>
            <input required onChange={onchangHandler} name='lastName' value={formData.lastName} className='text-black border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name'/>
          </div>
          <input required onChange={onchangHandler} name='email' value={formData.email} className='text-black border border-gray-300 rounded py-1.5 px-3.5 w-full ' type="email" placeholder='Email Address'/>
          <input required onChange={onchangHandler} name='street' value={formData.street} className='text-black border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
          <div className='flex gap-3'>
            <input required onChange={onchangHandler} name='city' value={formData.city} className='text-black border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City'/>
            <input required onChange={onchangHandler} name='state' value={formData.state} className='text-black border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State'/>
          </div>
          <div className='flex gap-3'>
            <input required onChange={onchangHandler} name='zipcode' value={formData.zipcode} className='text-black border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode'/>
            <input required onChange={onchangHandler} name='country' value={formData.country} className='text-black border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='country'/>
          </div>
          <input required onChange={onchangHandler} name='phone' value={formData.phone} className='text-black border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone'/>
      </div> 


      {/* ---------- Right Side --------*/}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
            <CartTotal/>
        </div>

        <div className='mt-12'>
            <Title text1={'PAYMENT'} text2={'METHOD'}/>
            {/* ------------Payment Method Selection-------- */}

            <div className="flex  gap-3 flex-col lg:flex-row">
                <div onClick={()=> setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                      <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe'? 'bg-green-400' : ''}`}></p>
                      <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
                </div>

                <div onClick={()=> setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                      <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay'? 'bg-green-400' : ''}`}></p>
                      <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
                </div>

                <div onClick={()=> setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                      <p className={`${method === 'cod'? 'bg-green-400' : ''} min-w-3.5 h-3.5 border rounded-full`}></p>
                      
                      <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                </div>
            </div>

            <div className='w-full text-end mt-8'>
                  <button  className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
            </div>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder
