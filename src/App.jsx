import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RecipePage from "./pages/RecipePage";

// Temporary pages until the other members finish their features
function PlaceholderPage({ title }) {
  return (
    <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
      <h1 className="text-3xl font-bold text-green-800">
        {title}
      </h1>

      <p className="mt-3 text-gray-500">
        This section is currently being developed.
      </p>
    </div>
  );
}

function App() {
  return (
    <div className="flex min-h-screen flex-col">

      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">

        <Routes>

          <Route
            path="/"
            element={<PlaceholderPage title="Welcome to PantryPal" />}
          />

          <Route
            path="/recipes"
            element={<RecipePage />}
          />

          <Route
            path="/favorites"
            element={<PlaceholderPage title="My Favorites" />}
          />

          <Route
            path="/planner"
            element={<PlaceholderPage title="Weekly Meal Planner" />}
          />

          <Route
            path="/shopping"
            element={<PlaceholderPage title="Shopping List" />}
          />

          <Route
            path="/my-recipes"
            element={<PlaceholderPage title="My Recipes" />}
          />

          <Route
            path="*"
            element={<PlaceholderPage title="Page Not Found" />}
          />

        </Routes>

      </main>

      <Footer />

    </div>
  );
}

export default App;