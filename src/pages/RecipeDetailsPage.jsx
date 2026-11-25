import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getRecipeById } from "../features/recipes/recipeService";
import { addFavorite, removeFavorite } from "../features/favorites/favoritesSlice";
import { addItem } from "../features/shopping/shoppingSlice";

function RecipeDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedMessage, setAddedMessage] = useState("");

  useEffect(() => {
    async function loadRecipe() {
      setLoading(true);
      setError("");
      try {
        const data = await getRecipeById(id);
        setRecipe(data);
      } catch {
        setError("Unable to load recipe.");
      } finally {
        setLoading(false);
      }
    }

    loadRecipe();
  }, [id]);

  if (loading) {
    return <p className="py-10 text-center text-green-800">Loading recipe...</p>;
  }

  if (error || !recipe) {
    return (
      <p className="py-10 text-center text-red-600">
        {error || "Recipe not found."}
      </p>
    );
  }

  const isFavorite = favorites.some((item) => item.idMeal === recipe.idMeal);

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measurement = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        quantity: measurement ? measurement.trim() : "",
      });
    }
  }

  function addIngredientsToShoppingList() {
    ingredients.forEach((ingredient) => {
      dispatch(
        addItem({
          id: crypto.randomUUID(),
          name: ingredient.name,
          quantity: ingredient.quantity || "1",
          category: "Other",
          bought: false,
        })
      );
    });

    setAddedMessage("Ingredients added to your shopping list!");
    setTimeout(() => setAddedMessage(""), 3000);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-3xl font-bold text-green-900">
        {recipe.strMeal}
      </h1>

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="mb-8 h-72 w-full rounded-2xl object-cover md:h-96"
      />

      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={() =>
            isFavorite
              ? dispatch(removeFavorite(recipe.idMeal))
              : dispatch(addFavorite(recipe))
          }
          className="rounded-xl bg-green-700 px-5 py-3 text-white hover:bg-green-800"
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>

        <button
          onClick={addIngredientsToShoppingList}
          className="rounded-xl border border-green-700 px-5 py-3 text-green-800 hover:bg-green-50"
        >
          Add Ingredients to Shopping List
        </button>
      </div>

      {addedMessage && (
        <p className="mb-6 rounded-xl bg-green-100 px-4 py-3 text-sm font-medium text-green-900">
          {addedMessage}
        </p>
      )}

      <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-green-900">Ingredients</h2>
        <ul className="space-y-3">
          {ingredients.map((ingredient, index) => (
            <li
              key={index}
              className="flex items-center justify-between gap-4 border-b border-green-100 pb-2"
            >
              <span>{ingredient.name}</span>
              <span className="text-gray-500">{ingredient.quantity}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-green-900">
          Instructions
        </h2>
        <p className="whitespace-pre-line leading-8 text-gray-700">
          {recipe.strInstructions}
        </p>
      </div>
    </div>
  );
}
