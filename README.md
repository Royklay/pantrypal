# PantryPal

**Discover Recipes. Plan Meals. Organize Shopping.**

PantryPal is a recipe discovery and meal-planning web application designed to make cooking and meal organization easier. Users can explore different recipes, save their favourites, plan weekly meals, manage shopping lists and keep their own custom recipes.

## Features

- **Recipe Discovery:** Search for recipes and browse different food categories.
- **Recipe Details:** View information about individual recipes.
- **Favorites:** Save and manage favourite recipes.
- **Meal Planner:** Organize meals throughout the week.
- **Shopping List:** Add, edit, delete and manage shopping items.
- **My Recipes:** Keep track of personally created recipes.

## Technologies Used

- React.js - Building the user interface.
- JavaScript - Application functionality.
- Tailwind CSS - Styling and responsive layouts.
- Redux Toolkit - Managing application state.
- React Router DOM - Navigation between pages.
- TheMealDB API - Fetching recipe information.
- Vite - Development server and build tool.

## Project Structure

```text
PantryPal/
├── public/
├── src/
│   ├── app/
│   │   └── store.js
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── RecipeCard.jsx
│   ├── features/
│   │   ├── recipes/
│   │   ├── favorites/
│   │   ├── planner/
│   │   ├── shopping/
│   │   └── customRecipes/
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── RecipePage.jsx
│   │   ├── RecipeDetailsPage.jsx
│   │   ├── FavoritesPage.jsx
│   │   ├── PlannerPage.jsx
│   │   ├── ShoppingListPage.jsx
│   │   └── MyRecipesPage.jsx
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── README.md

```

## Getting Started

Follow these steps to run PantryPal locally.

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project Folder

```bash
cd PantryPal
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open in Your Browser

Visit the local URL displayed in your terminal, usually:

```text
http://localhost:5173
```

## Recipe API

PantryPal uses TheMealDB API to retrieve recipe information, including recipe names, images, categories and details.

Website: https://www.themealdb.com/

## Development Team

PantryPal was developed collaboratively by a team of four members, with each member contributing to different application features and components.

## Project Goal

The goal of PantryPal is to provide a simple and convenient platform where users can discover meals, organize their cooking plans and manage their shopping needs in one place.

## License

This project was developed for educational purposes.