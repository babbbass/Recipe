import express from "express"
import { getRecipes, addRecipe, updateRecipe } from "../controllers/recipe.js"
import { verifyUser } from "../middleware/middleware.js"

const router = express.Router()

router.get("/", getRecipes)
router.post("/create", verifyUser, addRecipe)
router.put("/update", verifyUser, updateRecipe)

export default router
