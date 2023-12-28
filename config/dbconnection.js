import mongoose from 'mongoose'

export const connectdb=async ()=>{
    try {
        const connect= await mongoose.connect(process.env.MONGO_URL)
        console.log("Database connected",connect.connection.host)
    } catch (error) {
        console.log(error)
    }
}