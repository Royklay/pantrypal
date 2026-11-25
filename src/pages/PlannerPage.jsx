import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addMeal, removeMeal } from "../features/planner/plannerSlice";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function PlannerPage() {
  const dispatch = useDispatch();

  const meals = useSelector(
    (state) => state.planner.meals
  );

  const [form, setForm] = useState({
    name: "",
    day: "Monday",
    image: "",
  });

  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim()) {
      setError("Please enter a meal name.");
      return;
    }

    const recipeId = form.name.trim().toLowerCase();

    const duplicate = meals.some(
      (meal) =>
        meal.recipeId === recipeId &&
        meal.day === form.day
    );

    if (duplicate) {
      setError("This meal is already planned for that day.");
      return;
    }

    dispatch(
      addMeal({
        id: crypto.randomUUID(),
        recipeId,
        name: form.name.trim(),
        day: form.day,
        image: form.image.trim(),
      })
    );

    setForm({
      name: "",
      day: "Monday",
      image: "",
    });

    setError("");
  }

  return (
    <section>

      <h1 className="mb-2 text-3xl font-bold text-green-900">
        Weekly Meal Planner
      </h1>

      <p className="mb-8 text-gray-600">
        Plan what you will cook throughout the week.
      </p>

      {/* ADD MEAL FORM */}
      <form
        onSubmit={handleSubmit}
        className="mb-10 space-y-5 rounded-2xl bg-white p-6 shadow-sm"
      >

        <h2 className="text-xl font-bold text-green-900">
          Plan a Meal
        </h2>

        <div>
          <label className="mb-2 block font-medium">
            Meal Name *
          </label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Vegetable Rice"
            className="w-full rounded-xl border border-green-200 px-4 py-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Select Day *
          </label>

          <select
            name="day"
            value={form.day}
            onChange={handleChange}
            className="w-full rounded-xl border border-green-200 bg-white px-4 py-3"
          >
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Image URL (Optional)
          </label>

          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://example.com/meal.jpg"
            className="w-full rounded-xl border border-green-200 px-4 py-3"
          />

          {/* IMAGE PLACEHOLDER:
              Add a URL for the planned meal's photo.
              This can later be connected to recipe discovery.
          */}
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="rounded-xl bg-green-700 px-6 py-3 text-white hover:bg-green-800"
        >
          Add to Planner
        </button>

      </form>

      {/* WEEKLY PLANNER */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {days.map((day) => {

          const dayMeals = meals.filter(
            (meal) => meal.day === day
          );

          return (
            <div
              key={day}
              className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm"
            >

              <h2 className="mb-4 text-xl font-bold text-green-800">
                {day}
              </h2>

              {dayMeals.length === 0 ? (
                <p className="text-sm text-gray-500">
                  No meals planned.
                </p>
              ) : (

                <div className="space-y-4">

                  {dayMeals.map((meal) => (
                    <div
                      key={meal.id}
                      className="rounded-xl bg-green-50 p-3"
                    >

                      {/* IMAGE PLACEHOLDER:
                          Show a meal image if one was supplied.
                      */}

                      {meal.image && (
                        <img
                          src={meal.image}
                          alt={meal.name}
                          className="mb-3 h-32 w-full rounded-lg object-cover"
                        />
                      )}

                      <h3 className="font-semibold text-green-900">
                        {meal.name}
                      </h3>

                      <button
                        onClick={() => dispatch(removeMeal(meal.id))}
                        className="mt-3 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </button>

                    </div>
                  ))}

                </div>

              )}

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default PlannerPage;