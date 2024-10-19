import express from "express"
import cors from "cors"
import authRouter from "./routes/auth.js"
import { connectDB } from "./db/db.js"

const app = express()
app.use(cors())

app.use("/api/signup", authRouter)

app.listen(3000, () => {
  connectDB()
  console.log("Server running on port 3000")
})
