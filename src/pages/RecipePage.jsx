import { useEffect, useState } from "react";

import RecipeCard from "../components/RecipeCard";

import {
  searchRecipes,
  getRecipesByCategory,
  getCategories,
} from "../features/recipes/recipeService";

function RecipePage() {

  // Store recipes returned by the API
  const [recipes, setRecipes] = useState([]);

  // Store available categories
  const [categories, setCategories] = useState([]);

  // Manage search and category selection
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  // Manage loading and error messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load categories when the page opens
  useEffect(() => {

    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch {
        setError("Unable to load recipe categories.");
      }
    }

    loadCategories();

  }, []);

  // Fetch recipes whenever the search or category changes
  useEffect(() => {

    async function loadRecipes() {

      setLoading(true);
      setError("");

      try {

        let data;

        if (category) {
          data = await getRecipesByCategory(category);
        } else {
          data = await searchRecipes(searchTerm);
        }

        setRecipes(data);

      } catch {
        setError("Something went wrong while loading recipes.");
        setRecipes([]);
      } finally {
        setLoading(false);
      }

    }

    loadRecipes();

  }, [searchTerm, category]);

  return (
    <section>

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-green-900 md:text-4xl">
          Discover Recipes
        </h1>

        <p className="mt-2 text-gray-600">
          Find delicious meals for your next cooking adventure.
        </p>

      </div>

      {/* SEARCH FORM */}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          setCategory("");
        }}
        className="mb-6 flex flex-wrap gap-3"
      >

        <input
          type="search"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setCategory("");
          }}
          placeholder="Search for a recipe..."
          className="min-w-[220px] flex-1 rounded-xl border border-green-200 bg-white px-4 py-3 outline-none focus:border-green-600"
        />

        <button
          type="submit"
          className="rounded-xl bg-green-700 px-6 py-3 text-white hover:bg-green-800"
        >
          Search
        </button>

      </form>

      {/* CATEGORY FILTER */}

      <div className="mb-8">

        <label className="mb-2 block font-medium text-green-900">
          Filter by Category
        </label>

        <select
          value={category}
          onChange={(event) => {
            setCategory(event.target.value);
            setSearchTerm("");
          }}
          className="w-full rounded-xl border border-green-200 bg-white px-4 py-3 md:max-w-sm"
        >

          <option value="">All Categories</option>

          {categories.map((item) => (
            <option
              key={item.strCategory}
              value={item.strCategory}
            >
              {item.strCategory}
            </option>
          ))}

        </select>

      </div>

      {/* LOADING MESSAGE */}

      {loading && (
        <p className="py-10 text-center text-green-800">
          Loading recipes...
        </p>
      )}

      {/* ERROR MESSAGE */}

      {error && (
        <p className="rounded-xl bg-red-50 p-4 text-red-600">
          {error}
        </p>
      )}

      {/* EMPTY STATE */}

      {!loading && !error && recipes.length === 0 && (
        <p className="rounded-xl bg-white p-6 text-center text-gray-500">
          No recipes found. Try another search.
        </p>
      )}

      {/* DISPLAY RECIPES */}

      {!loading && recipes.length > 0 && (

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.idMeal}
              recipe={recipe}
            />
          ))}

        </div>

      )}

    </section>
  );
}

export default RecipePage;