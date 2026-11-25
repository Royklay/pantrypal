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