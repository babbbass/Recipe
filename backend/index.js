import express from "express"
import cors from "cors"
import authRouter from "./routes/auth.js"

const app = express()
app.use(cors())

app.use("/api/signup", authRouter)

app.listen(3000, () => console.log("Server running on port 3000"))
s
