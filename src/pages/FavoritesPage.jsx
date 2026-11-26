import { useSelector, useDispatch } from "react-redux";

import RecipeCard from "../components/RecipeCard";
import { removeFavorite } from "../features/favorites/favoritesSlice";

function FavoritesPage() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  return (
    <section>
      <h1 className="mb-2 text-3xl font-bold text-green-900">My Favorites</h1>
      <p className="mb-8 text-gray-600">Your saved recipes in one place.</p>

      {favorites.length === 0 ? (
        <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <p className="text-gray-500">
            You have not saved any favorite recipes yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe}>
              <button
                onClick={() => dispatch(removeFavorite(recipe.idMeal))}
                className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Remove
              </button>
            </RecipeCard>
          ))}
        </div>
      )}
    </section>
  );
}

export default FavoritesPage;