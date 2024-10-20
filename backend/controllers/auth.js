import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User doesn't existed" })
    }

    const isMatchPassword = await bcrypt.compare(password, user.password)
    if (!isMatchPassword) {
      res
        .status(401)
        .json({ success: false, message: "Email or password false" })
    }

    const token = jwt.sign({ id: user._id }, "secretkeyMustChange", {
      expiresIn: "1d",
    })

    return res
      .status(200)
      .json({
        success: true,
        token,
        user: { user: user.username },
        message: "Login success",
      })
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "error in login server" })
  }
}
