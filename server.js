import express from 'express'
import dotenv from 'dotenv'
import contactRoutes from './routes/contactRoutes.js'
import userRoutes from './routes/userRoutes.js'
import { errorHandler } from './middlewares/errorhandler.js'
import { connectdb } from './config/DBconnection.js'


const app=express()
dotenv.config()
const PORT=process.env.PORT
connectdb()

app.use(express.json())
app.use("/api/contacts",contactRoutes)
app.use("/api/users",userRoutes)
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`Server listening on Port ${PORT}.`)
})