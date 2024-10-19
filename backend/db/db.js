import mongoose from "mongoose"
console.log(process.env.MONGO_URI)
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/recipes")
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`)
  }
}
