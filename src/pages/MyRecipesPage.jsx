import { useSelector, useDispatch } from "react-redux";
import { deleteCustomRecipe } from "../features/customRecipes/customRecipesSlice";

function MyRecipesPage() {
  const dispatch = useDispatch();

  // Get custom recipes from Redux
  const recipes = useSelector(
    (state) => state.customRecipes.items
  );

  // Delete a recipe
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );

    if (confirmDelete) {
      dispatch(deleteCustomRecipe(id));
    }
  };

  return (
    <section>

      {/* PAGE HEADER */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-green-900">
            My Recipes
          </h1>

          <p className="mt-2 text-gray-600">
            Your personally created recipes in one place.
          </p>
        </div>

        <span className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-800">
          {recipes.length} Recipes
        </span>

      </div>

      {/* EMPTY STATE */}
      {recipes.length === 0 ? (

        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

          <h2 className="text-xl font-bold text-green-800">
            No recipes yet!
          </h2>

          <p className="mt-3 text-gray-500">
            You haven't created any recipes yet.
            Your recipes will appear here once you add them.
          </p>

        </div>

      ) : (

        /* DISPLAY CUSTOM RECIPES */
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {recipes.map((recipe) => (

            <div
              key={recipe.id}
              className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm"
            >

              { (recipe.image || recipe.imageUrl || recipe.strMealThumb) && (
                <img
                  src={recipe.image || recipe.imageUrl || recipe.strMealThumb}
                  alt={recipe.name || recipe.title || "My recipe"}
                  className="h-48 w-full object-cover"
                />
              )}

              <div className="p-5">

                <h2 className="mb-2 text-xl font-bold text-green-900">
                  {recipe.name || recipe.title || recipe.strMeal || "Untitled Recipe"}
                </h2>

                <p className="mb-4 text-sm text-gray-600">
                  {recipe.description || "Your personal recipe."}
                </p>

                <button
                  onClick={() => handleDelete(recipe.id)}
                  className="rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  Delete Recipe
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default MyRecipesPage;