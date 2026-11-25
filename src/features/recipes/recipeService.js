const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

// Search recipes using their names
export async function searchRecipes(searchTerm) {

  const response = await fetch(
    `${BASE_URL}/search.php?s=${encodeURIComponent(searchTerm)}`
  );

  if (!response.ok) {
    throw new Error("Failed to load recipes");
  }

  const data = await response.json();

  return data.meals || [];
}

// Get recipes belonging to a particular category
export async function getRecipesByCategory(category) {

  const response = await fetch(
    `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`
  );

  if (!response.ok) {
    throw new Error("Failed to load category");
  }

  const data = await response.json();

  return data.meals || [];
}

// Get all available recipe categories
export async function getCategories() {

  const response = await fetch(
    `${BASE_URL}/list.php?c=list`
  );

  if (!response.ok) {
    throw new Error("Failed to load categories");
  }

  const data = await response.json();

  return data.meals || [];
}

// Get one recipe using its ID
export async function getRecipeById(id) {

  const response = await fetch(
    `${BASE_URL}/lookup.php?i=${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to load recipe details");
  }

  const data = await response.json();

  return data.meals?.[0] || null;
}

// Get featured recipes for the HomePage
export async function getFeaturedRecipes() {
  const recipes = await getRecipesByCategory("Chicken");

  return recipes.slice(0, 6);
}