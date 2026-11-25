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