import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import PlannerPage from "./pages/PlannerPage";
import ShoppingListPage from "./pages/ShoppingListPage";
import NotFoundPage from "./pages/NotFoundPage";

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

          <Route path="/planner" element={<PlannerPage />} />

          <Route path="/shopping" element={<ShoppingListPage />} />

          {/* Alternative shopping list URL */}
          <Route
            path="/shopping-list"
            element={<ShoppingListPage />}
          />

          <Route path="*" element={<NotFoundPage />} />

        </Routes>

      </main>

      <Footer />

    </div>
  );
}

export default App;