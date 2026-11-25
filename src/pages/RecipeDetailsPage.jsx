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