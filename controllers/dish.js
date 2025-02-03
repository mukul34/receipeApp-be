import Dish from "../models/dish.js";
import { devLogger, errorLogger, infoLogger } from "../utils/logger/index.js";
import { internalServer, successResponse } from "../utils/response/index.js";

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