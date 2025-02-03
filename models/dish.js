import { Schema, model } from "mongoose";

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    ingredients: {
        type: [String],  // Array of strings since we are converting ingredients into an array
        required: true
    },
    diet: {
        type: String,
        enum: ["vegetarian", "non-vegetarian", "vegan"],
        required: true
    },
    prep_time: {
        type: Number, // Time in minutes
        required: true,
        min: 0
    },
    cook_time: {
        type: Number, // Time in minutes
        required: true,
        min: 0
    },
    flavor_profile: {
        type: String,
        enum: ["sweet", "spicy", "sour", "bitter", "salty"],
        required: true
    },
    course: {
        type: String,
        enum: ["appetizer", "main course", "dessert", "snack"],
        required: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    },
    region: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

export default model("Dish", dishSchema);