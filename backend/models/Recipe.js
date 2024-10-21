import mongoose from "mongoose"

const RecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    //required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    //required: true,
  },
  instructions: {
    type: String,
    //required: true,
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})

export const Recipe = mongoose.model("Recipe", RecipeSchema)
