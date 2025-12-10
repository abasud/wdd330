const mealType = JSON.parse(localStorage.getItem("mealType")) || {};

let meal = mealType.mealType;

const API_KEY = "44573a48cecc4dd990c6b28d5b0ab0fe"; 
const URL_COMPLEX_SEARCH = "https://api.spoonacular.com/recipes/complexSearch";

async function searchRecipes(type) {
    const url = `${URL_COMPLEX_SEARCH}?type=${type}&sort=random&number=1&apiKey=${API_KEY}`;


    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.results?.length > 0) {
            const recipe = data.results[0];

            getRecipeDetails(recipe.id);
        } else {
            console.log("No recipes found.");
        }

    } catch (error) {
        console.error("API error:", error);
    }
}

async function getRecipeDetails(id) {
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        renderFullRecipe(data);

    } catch (error) {
        console.error("Error fetching recipe details:", error);
    }
}

function renderFullRecipe(recipe) {
    const container = document.getElementById("recipesContainer");

    container.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}" style="width:300px; border-radius:10px;">

        <h3>Ready in: ${recipe.readyInMinutes} min</h3>
        <h3>Servings: ${recipe.servings}</h3>

        <h3>Ingredients:</h3>
        <ul>
            ${recipe.extendedIngredients
                .map(ing => `<li>${ing.original}</li>`)
                .join("")}
        </ul>

        <h3>Instructions:</h3>
        <p>${recipe.instructions || "No instructions available."}</p>
    `;
}

searchRecipes(meal);