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
export const updateRecipe = async (req, res) => {
  try {
    const { id, ...rest } = req.body
    const recipeUpdated = await Recipe.findByIdAndUpdate(id, rest, {
      new: true,
    })
    if (!recipeUpdated) {
      return res
        .status(404)
        .json({ success: false, message: "Recipe not found" })
    }
    res
      .status(201)
      .json({ success: true, message: "Recipe updated", recipeUpdated })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "Internal server error in addRecipe" })
  }
}

export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params
    const recipeUpdated = await Recipe.findByIdAndDelete(id)
    if (!recipeUpdated) {
      return res
        .status(404)
        .json({ success: false, message: "Delete - Recipe not found" })
    }
    res
      .status(201)
      .json({ success: true, message: "Recipe deleted", recipeUpdated })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "Internal server error in addRecipe" })
  }
}
