import express from "express"
import cors from "cors"
import authRouter from "./routes/auth.js"
import recipeRouter from "./routes/recipe.js"
import { connectDB } from "./db/db.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/recipes", recipeRouter)

app.listen(3001, () => {
  connectDB()
  console.log("Server running on port 3001")
})
