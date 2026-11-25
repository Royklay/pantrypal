import { Link } from "react-router-dom";

function RecipeCard({ recipe }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">

    

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="h-52 w-full object-cover"
      />

      <div className="p-5">

        <h2 className="mb-4 text-lg font-bold text-green-900">
          {recipe.strMeal}
        </h2>

        <Link
          to={`/recipes/${recipe.idMeal}`}
          className="inline-block rounded-lg bg-green-700 px-5 py-2 text-white hover:bg-green-800"
        >
          View Recipe
        </Link>

      </div>

    </div>
  );
}

export default RecipeCard;