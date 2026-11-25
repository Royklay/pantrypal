import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getRecipeById } from "../features/recipes/recipeService";
import { addFavorite, removeFavorite } from "../features/favorites/favoritesSlice";
import { addItem } from "../features/shopping/shoppingSlice";