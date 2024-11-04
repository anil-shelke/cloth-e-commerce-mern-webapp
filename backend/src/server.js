import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import orderRouter from './routes/orderRoute.js'


// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


// api endpoints
app.use('/api/user', userRouter)
app.use('/api/product',productRouter);
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("hello api is working");
})

app.listen(port, ()=>{
    console.log(`server is started on the ${port} port`)
})