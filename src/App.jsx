import { Routes, Route } from "react-router-dom";

// Shared components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import all completed pages
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import PlannerPage from "./pages/PlannerPage";
import ShoppingListPage from "./pages/ShoppingListPage";
import MyRecipesPage from "./pages/MyRecipesPage";

// Temporary Not Found page
function NotFoundPage() {
  return (
    <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
      <h1 className="text-3xl font-bold text-green-800">
        404 - Page Not Found
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
          {/* Home page */}
          <Route path="/" element={<HomePage />} />

          {/* Recipes */}
          <Route path="/recipes" element={<RecipePage />} />

          {/* Individual recipe details */}
          <Route path="/recipes/:id" element={<RecipeDetailsPage />} />

          {/* Favorites */}
          <Route path="/favorites" element={<FavoritesPage />} />

          {/* Weekly meal planner */}
          <Route path="/planner" element={<PlannerPage />} />

          {/* Shopping list */}
          <Route path="/shopping" element={<ShoppingListPage />} />

          {/* Alternative shopping list URL */}
          <Route path="/shopping-list" element={<ShoppingListPage />} />

          {/* Unknown pages */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        <Route path="/my-recipes" element={<MyRecipesPage />} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
