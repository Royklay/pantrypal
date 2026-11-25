import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addCustomRecipe,
  editCustomRecipe,
  deleteCustomRecipe,
} from "../features/customRecipes/customRecipesSlice";

function CustomRecipesPage() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.customRecipes.items);

  const [form, setForm] = useState({
    name: "",
    category: "",
    ingredients: "",
    instructions: "",
    image: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function resetForm() {
    setForm({
      name: "",
      category: "",
      ingredients: "",
      instructions: "",
      image: "",
    });
    setEditingId(null);
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.category.trim() ||
      !form.ingredients.trim() ||
      !form.instructions.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (form.image.trim()) {
      try {
        const url = new URL(form.image);
        if (!["http:", "https:"].includes(url.protocol)) {
          setError("Image URL must start with http or https.");
          return;
        }
      } catch {
        setError("Please enter a valid image URL.");
        return;
      }
    }

    const recipe = {
      ...form,
      name: form.name.trim(),
      id: editingId || crypto.randomUUID(),
    };

    if (editingId) {
      dispatch(editCustomRecipe(recipe));
    } else {
      dispatch(addCustomRecipe(recipe));
    }

    resetForm();
  }

  function handleEdit(recipe) {
    setForm({
      name: recipe.name,
      category: recipe.category,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      image: recipe.image || "",
    });
    setEditingId(recipe.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      dispatch(deleteCustomRecipe(id));
      if (editingId === id) {
        resetForm();
      }
    }
  }

  return (
    <section>
      <h1 className="mb-2 text-3xl font-bold text-green-900">My Own Recipes</h1>
      <p className="mb-8 text-gray-600">
        Create and manage your own recipes.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mb-10 space-y-5 rounded-2xl bg-white p-6 shadow-sm"
      >
        <h2 className="text-xl font-bold text-green-900">
          {editingId ? "Edit Recipe" : "Create Recipe"}
        </h2>

        <div>
          <label className="mb-2 block font-medium">Recipe Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter recipe name"
            className="w-full rounded-xl border border-green-200 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Category *</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-green-200 bg-white px-4 py-3"
          >
            <option value="">Select Category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
            <option value="Snack">Snack</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">Ingredients *</label>
          <textarea
            name="ingredients"
            value={form.ingredients}
            onChange={handleChange}
            placeholder="Enter ingredients and quantities"
            rows="5"
            className="w-full rounded-xl border border-green-200 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Instructions *</label>
          <textarea
            name="instructions"
            value={form.instructions}
            onChange={handleChange}
            placeholder="Enter cooking instructions"
            rows="5"
            className="w-full rounded-xl border border-green-200 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Image URL (Optional)
          </label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://example.com/recipe.jpg"
            className="w-full rounded-xl border border-green-200 px-4 py-3"
          />
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-red-600">{error}</p>
        )}

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            className="rounded-xl bg-green-700 px-6 py-3 text-white hover:bg-green-800"
          >
            {editingId ? "Save Changes" : "Add Recipe"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-xl border border-gray-300 px-6 py-3"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {recipes.length === 0 ? (
        <p className="rounded-xl bg-white p-6 text-center text-gray-500">
          You have not created any recipes yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <img
                src={
                  recipe.image || "https://placehold.co/600x400?text=My+Recipe"
                }
                alt={recipe.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-bold text-green-900">
                  {recipe.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{recipe.category}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleEdit(recipe)}
                    className="rounded-lg bg-green-700 px-4 py-2 text-sm text-white hover:bg-green-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(recipe.id)}
                    className="rounded-lg border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}