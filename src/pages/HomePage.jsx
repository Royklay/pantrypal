import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import RecipeCard from "../components/RecipeCard";
import { getFeaturedRecipes } from "../features/recipes/recipeService";

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecipes() {
      try {
        const data = await getFeaturedRecipes();
        setRecipes(data.slice(0, 6));
      } catch (error) {
        console.error("Unable to load featured recipes:", error);
      } finally {
        setLoading(false);
      }
    }

    loadRecipes();
  }, []);

  return (
    <div>

      {/* HERO SECTION */}

      <section className="mb-12 overflow-hidden rounded-3xl bg-green-800 text-white">

        <div className="grid items-center gap-8 p-8 md:grid-cols-2 md:p-12">

          <div>

            <p className="mb-3 font-semibold text-green-200">
              Welcome to PantryPal
            </p>

            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Find Recipes.
              <br />
              Plan Meals.
              <br />
              Organize Shopping.
            </h1>

            <p className="mt-5 leading-7 text-green-100">
              Discover delicious recipes, organize your weekly meals
              and create shopping lists with ease.
            </p>

            <Link
              to="/recipes"
              className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-green-800 hover:bg-green-100"
            >
              Explore Recipes
            </Link>

          </div>

          <div>

            
            <img
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=900&q=80"
              alt="Fresh healthy meals"
              className="h-64 w-full rounded-2xl object-cover md:h-80"
            />

          </div>

        </div>

      </section>

      {/* FEATURES */}

      <section className="mb-12">

        <h2 className="mb-6 text-2xl font-bold text-green-900">
          What You Can Do
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {[
            {
              title: "Discover Recipes",
              description: "Find meals from different categories.",
              link: "/recipes",
            },
            {
              title: "Save Favorites",
              description: "Keep your favorite recipes in one place.",
              link: "/favorites",
            },
            {
              title: "Plan Your Week",
              description: "Organize meals from Monday to Sunday.",
              link: "/planner",
            },
            {
              title: "Shopping List",
              description: "Organize the items you need to buy.",
              link: "/shopping",
            },
          ].map((feature) => (
            <Link
              key={feature.title}
              to={feature.link}
              className="rounded-2xl border border-green-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >

              <h3 className="mb-3 text-lg font-bold text-green-800">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.description}
              </p>

            </Link>
          ))}

        </div>

      </section>

      {/* FEATURED RECIPES */}

      <section>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

          <h2 className="text-2xl font-bold text-green-900">
            Featured Recipes
          </h2>

          <Link
            to="/recipes"
            className="font-medium text-green-700 hover:text-green-900"
          >
            View All Recipes
          </Link>

        </div>

        {loading ? (
          <p>Loading featured recipes...</p>
        ) : recipes.length === 0 ? (
          <p className="rounded-xl bg-white p-5">
            Featured recipes are currently unavailable.
          </p>
        ) : (

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

    </div>
  );
}

export default HomePage;