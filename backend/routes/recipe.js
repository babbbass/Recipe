import express from "express"
import { getRecipes, addRecipe } from "../controllers/recipe.js"
import { verifyUser } from "../middleware/middleware.js"

const router = express.Router()

router.get("/", getRecipes)
router.post("/create", verifyUser, addRecipe)

export default router
