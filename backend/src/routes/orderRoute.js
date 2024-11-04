import express, {Router} from 'express'

import {placeOrder, placeOrderStripe,placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe} from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/authUser.js'

const orderRouter = Router()


// Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// payment features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

// user  orders feature
orderRouter.post('/userorder',authUser, userOrders)

// verify payment 
orderRouter.post('/verifyStripe',authUser,verifyStripe)

export default orderRouter;