import Dish from "../models/dish.js";
import { devLogger, errorLogger, infoLogger } from "../utils/logger/index.js";
import { badRequest, internalServer, successResponse } from "../utils/response/index.js";

export const getDishes = async (req, res) => {
    try {
        infoLogger("Dishes", "getDishes", req.query, "Request received for fetching dishes");
        const { skip = 0, name, ingredients } = req.query;
        let filter = {};

        if (name) {
            filter.name = { $regex: name, $options: "i" };
        }

        if (ingredients) {
            const ingredientsArray = ingredients.split(",").map(ing => ing.trim()); // Convert comma-separated string to array
            filter.ingredients = { $all: ingredientsArray };
        }

        const [dishes, totalCount] = await Promise.allSettled([
            Dish.find(filter).skip(skip).limit(10),
            Dish.find(filter).countDocuments()
        ]);

        devLogger("Dishes", "getDishes", dishes, "Data received for DB");

        return successResponse(res, "Dishes fetched successfully", { dishes: dishes.value, totalCount: totalCount.value });
    } catch (err) {
        errorLogger("Dishes", "getDishes", err, "Error in fetching dishes");
        return internalServer(res, err.message);
    }
};

export const getSuggestions = async (req, res) => {
    try {
        infoLogger("Dishes", "getSuggestions", req.query, "Request received for fetching suggestions");
        const { query } = req.query;
        if (!query) return badRequest("Invalid request");

        const dishes = await Dish.find(
            { name: { $regex: query, $options: "i" } },
            { name: 1, _id: 0 }
        ).limit(10);

        console.log("JSON", JSON.stringify({ name: { $regex: query, $options: "i" } }));
        devLogger("Dishes", "getSuggestions", dishes, "Data received for DB");

        let suggestions = dishes.map((dish) => dish.name);
        return successResponse(res, "Suggestions", { suggestions });
    } catch (err) {
        errorLogger("Dishes", "getSuggestions", err, "Error in fetching suggestions");
        return internalServer(res, err.message)
    }
};