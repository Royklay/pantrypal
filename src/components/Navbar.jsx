import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-green-800 text-white shadow-md">

      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4">

        {/* PantryPal logo */}
        <Link to="/" className="text-2xl font-bold">
          PantryPal
        </Link>

        {/* Navigation links */}
        <div className="flex flex-wrap gap-4 text-sm font-medium">

          <Link to="/" className="hover:text-green-200">
            Home
          </Link>

          <Link to="/recipes" className="hover:text-green-200">
            Recipes
          </Link>

          <Link to="/favorites" className="hover:text-green-200">
            Favorites
          </Link>

          <Link to="/planner" className="hover:text-green-200">
            Meal Planner
          </Link>

          <Link to="/shopping" className="hover:text-green-200">
            Shopping List
          </Link>

          <Link to="/my-recipes" className="hover:text-green-200">
            My Recipes
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;