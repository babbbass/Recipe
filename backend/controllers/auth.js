import User from "../models/User.js"
import bcrypt from "bcrypt"

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      return res
        .status(401)
        .json({ success: false, message: "User already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    })

    await newUser.save()
    res
      .status(201)
      .json({ success: true, user: newUser, message: "User created" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
