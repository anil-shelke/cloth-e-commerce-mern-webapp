import jwt from 'jsonwebtoken'

const adminAuth = async (req, res, next) => {
    try {
        const {token} = req.headers
        console.log(token)

        if(!token){
            return res.json({success:false, message:"Not given token add token"})
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log(token_decode)
        if(token_decode.id !== (process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD)){
            return res.json({success:false, message:"Not Authorized Login Again"})
        }
        next()

    } catch (error) {
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}

export default adminAuth