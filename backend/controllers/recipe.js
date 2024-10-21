import { Recipe } from "../models/Recipe.js"

export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
    res.status(200).json({ success: true, recipes })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const addRecipe = async (req, res) => {
  try {
    const { name, description } = req.body
    const newRecipe = new Recipe({
      name,
      description,
      createdBy: req.user.id,
    })
    const recipe = await newRecipe.save()
    res.status(201).json({ success: true, message: "Recipe created", recipe })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "Internal server error in addRecipe" })
  }
}
