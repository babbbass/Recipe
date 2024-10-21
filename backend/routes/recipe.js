import express from "express"
import {
  getRecipes,
  addRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipe.js"
import { verifyUser } from "../middleware/middleware.js"

const router = express.Router()

router.get("/", getRecipes)
router.post("/create", verifyUser, addRecipe)
router.put("/update", verifyUser, updateRecipe)
router.delete(`/delete/:id`, verifyUser, deleteRecipe)

export default router
