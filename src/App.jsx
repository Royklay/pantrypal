import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import PlannerPage from "./pages/PlannerPage";
import ShoppingListPage from "./pages/ShoppingListPage";

// Temporary placeholder for missing pages
function NotFoundPage() {
  return (
    <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
      <h1 className="text-3xl font-bold text-green-800">
        Page Not Found
      </h1>

      <p className="mt-3 text-gray-500">
        Sorry, the page you are looking for does not exist.
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

          <Route path="/" element={<HomePage />} />

          <Route path="/recipes" element={<RecipePage />} />

          <Route
            path="/recipes/:id"
            element={<RecipeDetailsPage />}
          />

          <Route path="/favorites" element={<FavoritesPage />} />

          <Route path="/planner" element={<PlannerPage />} />

          <Route path="/shopping" element={<ShoppingListPage />} />

          <Route path="/shopping-list" element={<ShoppingListPage />} />

          <Route path="*" element={<NotFoundPage />} />

        </Routes>

      </main>

      <Footer />

    </div>
  );
}

export default App;