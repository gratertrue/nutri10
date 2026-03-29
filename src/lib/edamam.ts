const NUTRITION_APP_ID = "5006387d";
const NUTRITION_APP_KEY = "a0b84fa17a95362c2fb8084d5161a5e4";
const RECIPE_APP_ID = "23cc0b56"; // Using meal planner ID for recipe search as well if needed
const RECIPE_APP_KEY = "9ab0df600176dc9baa30d2fae4b945c8";

export const analyzeNutrition = async (ingr: string) => {
  try {
    const response = await fetch(
      `https://api.edamam.com/api/nutrition-data?app_id=${NUTRITION_APP_ID}&app_key=${NUTRITION_APP_KEY}&nutrition-type=logging&ingr=${encodeURIComponent(ingr)}`
    );
    if (!response.ok) throw new Error("API limit reached or invalid input");
    return await response.json();
  } catch (error) {
    console.error("Nutrition Analysis Error:", error);
    return null;
  }
};

export const searchRecipes = async (query: string, health?: string[]) => {
  try {
    let url = `https://api.edamam.com/search?q=${encodeURIComponent(query)}&app_id=${RECIPE_APP_ID}&app_key=${RECIPE_APP_KEY}`;
    if (health && health.length > 0) {
      health.forEach(h => url += `&health=${h}`);
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error("Recipe Search Error");
    return await response.json();
  } catch (error) {
    console.error("Recipe Search Error:", error);
    return null;
  }
};

export const getMealPlan = async (userId: string) => {
  // Note: Edamam Meal Planner API usually requires a subscription and specific user setup.
  // This is a placeholder for the structure as per documentation.
  try {
    const response = await fetch(
      `https://api.edamam.com/api/meal-planner/v1/${RECIPE_APP_ID}/week?app_id=${RECIPE_APP_ID}&app_key=${RECIPE_APP_KEY}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
    );
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
};