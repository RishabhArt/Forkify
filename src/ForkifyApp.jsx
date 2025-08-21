import React, { useState, useEffect } from "react";
import {
  Search,
  Users,
  Clock,
  Bookmark,
  BookmarkCheck,
  Plus,
  Sun,
  Moon,
  ChefHat,
  Star,
  Heart,
} from "lucide-react";

const ForkifyApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [servings, setServings] = useState(4);
  const [bookmarks, setBookmarks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [currentView, setCurrentView] = useState("search");

  // Sample recipe data with working SVG images
  const sampleRecipes = [
    {
      id: 1,
      title: "Classic Margherita Pizza",
      cookTime: 25,
      servings: 4,
      image:
        "data:image/svg+xml,%3Csvg width='400' height='300' viewBox='0 0 400 300' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%23FF6B35'/%3E%3Ccircle cx='200' cy='150' r='100' fill='%23FFD700'/%3E%3Ccircle cx='170' cy='130' r='15' fill='%23FFFFFF'/%3E%3Ccircle cx='230' cy='140' r='12' fill='%23FFFFFF'/%3E%3Ccircle cx='190' cy='170' r='10' fill='%23FFFFFF'/%3E%3Cpath d='M180 120 Q185 115 190 120 L185 125 Z' fill='%2322C55B'/%3E%3C/svg%3E",
      ingredients: [
        { quantity: 500, unit: "g", description: "pizza dough" },
        { quantity: 200, unit: "ml", description: "tomato sauce" },
        { quantity: 200, unit: "g", description: "fresh mozzarella" },
        { quantity: 0.25, unit: "cup", description: "fresh basil leaves" },
        { quantity: 2, unit: "tbsp", description: "olive oil" },
      ],
      instructions: [
        "Preheat oven to 475°F (245°C)",
        "Roll out pizza dough on floured surface",
        "Spread tomato sauce evenly over dough",
        "Add torn mozzarella pieces",
        "Drizzle with olive oil",
        "Bake for 12-15 minutes until golden",
        "Top with fresh basil before serving",
      ],
      author: "Chef Mario",
      category: "Italian",
    },
    {
      id: 2,
      title: "Creamy Chicken Alfredo",
      cookTime: 30,
      servings: 4,
      image:
        "data:image/svg+xml,%3Csvg width='400' height='300' viewBox='0 0 400 300' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%23FFF0E6'/%3E%3Cellipse cx='200' cy='180' rx='120' ry='40' fill='%23FFFFFF'/%3E%3Cpath d='M100 120 Q150 100 200 120 T300 120' stroke='%23FFDB4C' stroke-width='8' fill='none'/%3E%3Cpath d='M120 130 Q170 110 220 130 T320 130' stroke='%23FFDB4C' stroke-width='6' fill='none'/%3E%3C/svg%3E",
      ingredients: [
        { quantity: 400, unit: "g", description: "fettuccine pasta" },
        { quantity: 500, unit: "g", description: "chicken breast, sliced" },
        { quantity: 300, unit: "ml", description: "heavy cream" },
        { quantity: 100, unit: "g", description: "parmesan cheese, grated" },
        { quantity: 3, unit: "cloves", description: "garlic, minced" },
        { quantity: 2, unit: "tbsp", description: "butter" },
      ],
      instructions: [
        "Cook pasta according to package directions",
        "Season chicken and cook in butter until golden",
        "Add garlic and cook for 1 minute",
        "Pour in cream and simmer",
        "Add parmesan and stir until melted",
        "Toss with cooked pasta",
        "Serve immediately with extra cheese",
      ],
      author: "Chef Isabella",
      category: "Italian",
    },
    {
      id: 3,
      title: "Chocolate Chip Cookies",
      cookTime: 15,
      servings: 24,
      image:
        "data:image/svg+xml,%3Csvg width='400' height='300' viewBox='0 0 400 300' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%238B4513'/%3E%3Ccircle cx='150' cy='100' r='40' fill='%23D2691E'/%3E%3Ccircle cx='280' cy='120' r='35' fill='%23D2691E'/%3E%3Ccircle cx='200' cy='200' r='45' fill='%23D2691E'/%3E%3Ccircle cx='140' cy='90' r='4' fill='%23392A0F'/%3E%3Ccircle cx='160' cy='110' r='3' fill='%23392A0F'/%3E%3C/svg%3E",
      ingredients: [
        { quantity: 2.25, unit: "cups", description: "all-purpose flour" },
        { quantity: 1, unit: "cup", description: "butter, softened" },
        { quantity: 0.75, unit: "cup", description: "brown sugar" },
        { quantity: 0.5, unit: "cup", description: "white sugar" },
        { quantity: 2, unit: "large", description: "eggs" },
        { quantity: 2, unit: "cups", description: "chocolate chips" },
      ],
      instructions: [
        "Preheat oven to 375°F (190°C)",
        "Cream butter and sugars together",
        "Beat in eggs one at a time",
        "Gradually mix in flour",
        "Fold in chocolate chips",
        "Drop spoonfuls on baking sheet",
        "Bake 9-11 minutes until golden",
      ],
      author: "Baker Sarah",
      category: "Dessert",
    },
    {
      id: 4,
      title: "Asian Beef Stir Fry",
      cookTime: 20,
      servings: 4,
      image:
        "data:image/svg+xml,%3Csvg width='400' height='300' viewBox='0 0 400 300' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%231F4737'/%3E%3Cellipse cx='200' cy='200' rx='140' ry='50' fill='%2366BB36'/%3E%3Crect x='100' y='120' width='20' height='40' rx='5' fill='%23EF4444'/%3E%3Crect x='140' y='130' width='18' height='35' rx='5' fill='%23EF4444'/%3E%3Ccircle cx='160' cy='140' r='8' fill='%23FFCD07'/%3E%3C/svg%3E",
      ingredients: [
        { quantity: 500, unit: "g", description: "beef sirloin, sliced thin" },
        { quantity: 2, unit: "cups", description: "mixed vegetables" },
        { quantity: 3, unit: "tbsp", description: "soy sauce" },
        { quantity: 2, unit: "tbsp", description: "oyster sauce" },
        { quantity: 1, unit: "tbsp", description: "sesame oil" },
        { quantity: 2, unit: "cloves", description: "garlic, minced" },
      ],
      instructions: [
        "Heat oil in wok over high heat",
        "Stir-fry beef until browned",
        "Add vegetables and garlic",
        "Stir-fry for 3-4 minutes",
        "Add sauces and toss to coat",
        "Serve over rice immediately",
      ],
      author: "Chef Lin",
      category: "Asian",
    },
    {
      id: 5,
      title: "Butter Chicken (Murgh Makhani)",
      cookTime: 45,
      servings: 4,
      image:
        "data:image/svg+xml,%3Csvg width='400' height='300' viewBox='0 0 400 300' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%23FF3E27'/%3E%3Cellipse cx='200' cy='180' rx='120' ry='40' fill='%23FF9500'/%3E%3Ccircle cx='170' cy='130' r='15' fill='%23FF9500'/%3E%3Ccircle cx='230' cy='140' r='12' fill='%23FF9500'/%3E%3Ccircle cx='200' cy='150' r='30' fill='%23FFFFFF'/%3E%3C/svg%3E",
      ingredients: [
        { quantity: 1, unit: "kg", description: "chicken, cut into pieces" },
        { quantity: 1, unit: "cup", description: "tomato puree" },
        { quantity: 0.5, unit: "cup", description: "heavy cream" },
        { quantity: 2, unit: "tbsp", description: "butter" },
        { quantity: 1, unit: "tbsp", description: "garam masala" },
        { quantity: 1, unit: "tsp", description: "red chili powder" },
        { quantity: 1, unit: "tbsp", description: "ginger-garlic paste" },
        { quantity: 2, unit: "medium", description: "onions, chopped" },
      ],
      instructions: [
        "Marinate chicken with yogurt and spices for 30 minutes",
        "Cook chicken pieces until golden, set aside",
        "Sauté onions until golden brown",
        "Add ginger-garlic paste and cook for 1 minute",
        "Add tomato puree and cook until oil separates",
        "Add cooked chicken and simmer",
        "Stir in cream and butter",
        "Garnish with coriander and serve with naan",
      ],
      author: "Chef Priya",
      category: "Indian",
    },
    {
      id: 6,
      title: "Dal Tadka (Lentil Curry)",
      cookTime: 30,
      servings: 4,
      image:
        "data:image/svg+xml,%3Csvg width='400' height='300' viewBox='0 0 400 300' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%23FFBF00'/%3E%3Cellipse cx='200' cy='180' rx='140' ry='60' fill='%23FFD700'/%3E%3Ccircle cx='140' cy='120' r='3' fill='%23EF4444'/%3E%3Ccircle cx='260' cy='130' r='2' fill='%23EF4444'/%3E%3Ccircle cx='180' cy='140' r='4' fill='%23EF4444'/%3E%3C/svg%3E",
      ingredients: [
        { quantity: 1, unit: "cup", description: "yellow lentils (toor dal)" },
        { quantity: 1, unit: "medium", description: "onion, chopped" },
        { quantity: 2, unit: "medium", description: "tomatoes, chopped" },
        { quantity: 1, unit: "tbsp", description: "ginger-garlic paste" },
        { quantity: 1, unit: "tsp", description: "turmeric powder" },
        { quantity: 1, unit: "tsp", description: "cumin seeds" },
        { quantity: 2, unit: "tbsp", description: "ghee or oil" },
        { quantity: 0.25, unit: "cup", description: "fresh coriander leaves" },
      ],
      instructions: [
        "Wash and cook lentils with turmeric until soft",
        "Heat ghee in pan, add cumin seeds",
        "Add chopped onions, cook until golden",
        "Add ginger-garlic paste, cook for 1 minute",
        "Add tomatoes and cook until soft",
        "Add cooked lentils and simmer",
        "Season with salt and spices",
        "Garnish with coriander and serve hot",
      ],
      author: "Grandma Kamala",
      category: "Indian",
    },
    {
      id: 7,
      title: "Aloo Gobi (Potato Cauliflower)",
      cookTime: 25,
      servings: 4,
      image:
        "data:image/svg+xml,%3Csvg width='400' height='300' viewBox='0 0 400 300' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%23FF9500'/%3E%3Ccircle cx='150' cy='120' r='25' fill='%23FFFFFF'/%3E%3Ccircle cx='250' cy='130' r='20' fill='%23FFFFFF'/%3E%3Cellipse cx='130' cy='200' rx='25' ry='15' fill='%23FFDB4C'/%3E%3Cellipse cx='220' cy='220' rx='30' ry='18' fill='%23FFDB4C'/%3E%3C/svg%3E",
      ingredients: [
        { quantity: 3, unit: "medium", description: "potatoes, cubed" },
        {
          quantity: 1,
          unit: "medium",
          description: "cauliflower, cut into florets",
        },
        { quantity: 1, unit: "large", description: "onion, sliced" },
        { quantity: 2, unit: "tbsp", description: "oil" },
        { quantity: 1, unit: "tsp", description: "cumin seeds" },
        { quantity: 1, unit: "tsp", description: "turmeric powder" },
        { quantity: 1, unit: "tsp", description: "coriander powder" },
        { quantity: 0.5, unit: "tsp", description: "garam masala" },
      ],
      instructions: [
        "Heat oil in large pan",
        "Add cumin seeds and let them splutter",
        "Add sliced onions, cook until translucent",
        "Add potatoes and cook for 5 minutes",
        "Add cauliflower florets",
        "Add all spices and mix well",
        "Cover and cook until vegetables are tender",
        "Garnish with fresh coriander",
      ],
      author: "Chef Rajesh",
      category: "Indian",
    },
    {
      id: 8,
      title: "Palak Paneer (Spinach Cottage Cheese)",
      cookTime: 35,
      servings: 4,
      image:
        "data:image/svg+xml,%3Csvg width='400' height='300' viewBox='0 0 400 300' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%2316803D'/%3E%3Cellipse cx='200' cy='180' rx='130' ry='50' fill='%2322C55B'/%3E%3Crect x='140' y='120' width='25' height='20' rx='5' fill='%23FFFFFF'/%3E%3Crect x='200' y='130' width='20' height='18' rx='5' fill='%23FFFFFF'/%3E%3Crect x='170' y='155' width='18' height='22' rx='5' fill='%23FFFFFF'/%3E%3C/svg%3E",
      ingredients: [
        { quantity: 500, unit: "g", description: "fresh spinach, chopped" },
        { quantity: 200, unit: "g", description: "paneer, cubed" },
        { quantity: 1, unit: "large", description: "onion, chopped" },
        { quantity: 2, unit: "medium", description: "tomatoes, chopped" },
        { quantity: 1, unit: "tbsp", description: "ginger-garlic paste" },
        { quantity: 0.5, unit: "cup", description: "cream" },
        { quantity: 1, unit: "tsp", description: "garam masala" },
        { quantity: 2, unit: "tbsp", description: "oil" },
      ],
      instructions: [
        "Blanch spinach in boiling water for 2 minutes",
        "Blend spinach into smooth puree",
        "Heat oil and lightly fry paneer cubes",
        "Sauté onions until golden",
        "Add ginger-garlic paste and tomatoes",
        "Cook until tomatoes are soft",
        "Add spinach puree and spices",
        "Add paneer and cream, simmer for 5 minutes",
        "Serve hot with roti or rice",
      ],
      author: "Chef Meera",
      category: "Indian",
    },
    {
      id: 9,
      title: "Rajma (Kidney Bean Curry)",
      cookTime: 40,
      servings: 4,
      image:
        "data:image/svg+xml,%3Csvg width='400' height='300' viewBox='0 0 400 300' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%23B45309'/%3E%3Cellipse cx='200' cy='180' rx='120' ry='45' fill='%23EF4444'/%3E%3Cellipse cx='140' cy='130' rx='8' ry='12' fill='%23721506'/%3E%3Cellipse cx='170' cy='140' rx='6' ry='10' fill='%23721506'/%3E%3Cellipse cx='230' cy='135' rx='7' ry='11' fill='%23721506'/%3E%3C/svg%3E",
      ingredients: [
        {
          quantity: 1,
          unit: "cup",
          description: "kidney beans, soaked overnight",
        },
        { quantity: 2, unit: "medium", description: "onions, chopped" },
        { quantity: 3, unit: "medium", description: "tomatoes, chopped" },
        { quantity: 1, unit: "tbsp", description: "ginger-garlic paste" },
        { quantity: 1, unit: "tsp", description: "cumin powder" },
        { quantity: 1, unit: "tsp", description: "coriander powder" },
        { quantity: 0.5, unit: "tsp", description: "red chili powder" },
        { quantity: 2, unit: "tbsp", description: "oil" },
      ],
      instructions: [
        "Pressure cook soaked kidney beans until soft",
        "Heat oil in pan, add chopped onions",
        "Cook onions until golden brown",
        "Add ginger-garlic paste, cook for 1 minute",
        "Add tomatoes and cook until soft",
        "Add all spices and cook for 2 minutes",
        "Add cooked kidney beans with water",
        "Simmer for 15-20 minutes until thick",
        "Garnish with coriander, serve with rice",
      ],
      author: "Aunty Sunita",
      category: "Indian",
    },
    {
      id: 10,
      title: "Masala Chai (Spiced Tea)",
      cookTime: 10,
      servings: 2,
      image:
        "data:image/svg+xml,%3Csvg width='400' height='300' viewBox='0 0 400 300' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%23721506'/%3E%3Crect x='140' y='140' width='120' height='100' rx='10' fill='%23FFFFFF'/%3E%3Crect x='145' y='145' width='110' height='90' rx='5' fill='%23D69441'/%3E%3Crect x='260' y='160' width='15' height='40' rx='7' fill='%23FFFFFF'/%3E%3C/svg%3E",
      ingredients: [
        { quantity: 2, unit: "cups", description: "water" },
        { quantity: 1, unit: "cup", description: "whole milk" },
        { quantity: 2, unit: "tsp", description: "black tea leaves" },
        { quantity: 4, unit: "green", description: "cardamom pods, crushed" },
        { quantity: 1, unit: "inch", description: "fresh ginger, grated" },
        { quantity: 1, unit: "stick", description: "cinnamon" },
        { quantity: 3, unit: "tbsp", description: "sugar (adjust to taste)" },
      ],
      instructions: [
        "Boil water with ginger, cardamom, and cinnamon",
        "Add tea leaves and boil for 2 minutes",
        "Add milk and bring to boil",
        "Let it simmer for 2-3 minutes",
        "Add sugar and stir well",
        "Strain and serve hot",
        "Enjoy with biscuits or snacks",
      ],
      author: "Chai Wallah Uncle",
      category: "Indian",
    },
    {
      id: 11,
      title: "Chole (Chickpea Curry)",
      cookTime: 35,
      servings: 4,
      image:
        "data:image/svg+xml,%3Csvg width='400' height='300' viewBox='0 0 400 300' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%23FF8C00'/%3E%3Cellipse cx='200' cy='180' rx='120' ry='45' fill='%23FFF5DB'/%3E%3Ccircle cx='150' cy='130' r='8' fill='%23FFDB4C'/%3E%3Ccircle cx='180' cy='140' r='7' fill='%23FFDB4C'/%3E%3Ccircle cx='220' cy='135' r='9' fill='%23FFDB1C'/%3E%3Ccircle cx='170' cy='160' r='8' fill='%23FFDB4C'/%3E%3C/svg%3E",
      ingredients: [
        {
          quantity: 1,
          unit: "cup",
          description: "chickpeas, soaked overnight",
        },
        { quantity: 2, unit: "medium", description: "onions, finely chopped" },
        { quantity: 3, unit: "medium", description: "tomatoes, chopped" },
        { quantity: 1, unit: "tbsp", description: "ginger-garlic paste" },
        { quantity: 2, unit: "tsp", description: "chole masala" },
        { quantity: 1, unit: "tsp", description: "cumin powder" },
        { quantity: 0.5, unit: "tsp", description: "turmeric powder" },
        { quantity: 2, unit: "tbsp", description: "oil" },
      ],
      instructions: [
        "Pressure cook soaked chickpeas until soft",
        "Heat oil in pan, add chopped onions",
        "Cook until onions turn golden brown",
        "Add ginger-garlic paste, cook for 1 minute",
        "Add chopped tomatoes and cook until soft",
        "Add all spices and cook for 2 minutes",
        "Add cooked chickpeas with cooking water",
        "Simmer for 15 minutes until gravy thickens",
        "Serve hot with bhature or rice",
      ],
      author: "Chef Amit",
      category: "Indian",
    },
    {
      id: 12,
      title: "Samosas (Crispy Fried Pastries)",
      cookTime: 45,
      servings: 12,
      image:
        "data:image/svg+xml,%3Csvg width='400' height='300' viewBox='0 0 400 300' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%23FFA500'/%3E%3Cpolygon points='120,100 200,100 240,160 160,160' fill='%23FFDB1C'/%3E%3Cpolygon points='200,120 280,120 320,180 240,180' fill='%23FFDB4C'/%3E%3Cpolygon points='140,180 220,180 260,240 200,240' fill='%23FFDB1C'/%3E%3C/svg%3E",
      ingredients: [
        { quantity: 2, unit: "cups", description: "all-purpose flour" },
        {
          quantity: 4,
          unit: "medium",
          description: "potatoes, boiled and diced",
        },
        { quantity: 1, unit: "cup", description: "green peas" },
        { quantity: 1, unit: "tsp", description: "cumin seeds" },
        { quantity: 1, unit: "tsp", description: "coriander seeds, crushed" },
        { quantity: 0.5, unit: "tsp", description: "turmeric powder" },
        { quantity: 2, unit: "green", description: "chilies, chopped" },
        {
          quantity: 3,
          unit: "tbsp",
          description: "oil for dough + oil for frying",
        },
      ],
      instructions: [
        "Make dough with flour, oil, and water. Rest for 30 minutes",
        "Heat oil, add cumin seeds",
        "Add potatoes, peas, and all spices",
        "Cook filling until well combined, let cool",
        "Roll dough into small circles, cut in half",
        "Make cone shape, fill with potato mixture",
        "Seal edges with water",
        "Deep fry until golden and crispy",
        "Serve hot with mint or tamarind chutney",
      ],
      author: "Street Food King",
      category: "Indian",
    },
  ];

  const [customRecipes, setCustomRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({
    title: "",
    cookTime: "",
    servings: 4,
    ingredients: [""],
    instructions: [""],
    category: "Custom",
  });

  // Initialize recipes
  useEffect(() => {
    setRecipes(sampleRecipes);
  }, []);

  // Filter recipes based on search
  const filteredRecipes = [...recipes, ...customRecipes].filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate adjusted ingredients based on servings
  const getAdjustedIngredients = (
    ingredients,
    originalServings,
    newServings
  ) => {
    const ratio = newServings / originalServings;
    return ingredients.map((ingredient) => ({
      ...ingredient,
      quantity: (ingredient.quantity * ratio).toFixed(2),
    }));
  };

  // Toggle bookmark
  const toggleBookmark = (recipeId) => {
    setBookmarks((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  // Add custom recipe
  const addCustomRecipe = () => {
    if (
      newRecipe.title &&
      newRecipe.ingredients[0] &&
      newRecipe.instructions[0]
    ) {
      const recipe = {
        ...newRecipe,
        id: Date.now(),
        author: "You",
        image:
          "data:image/svg+xml,%3Csvg width='400' height='300' viewBox='0 0 400 300' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='400' height='300' fill='%23FF6B35'/%3E%3Ccircle cx='200' cy='150' r='80' fill='%23FFFFFF'/%3E%3Ctext x='200' y='160' font-family='Arial' font-size='40' fill='%23FF6437' text-anchor='middle'%3E👨‍🍳%3C/text%3E%3C/svg%3E",
        ingredients: newRecipe.ingredients.map((ing) => ({
          quantity: 1,
          unit: "unit",
          description: ing,
        })),
      };
      setCustomRecipes((prev) => [...prev, recipe]);
      setNewRecipe({
        title: "",
        cookTime: "",
        servings: 4,
        ingredients: [""],
        instructions: [""],
        category: "Custom",
      });
      setShowAddRecipe(false);
    }
  };

  const addIngredient = () => {
    setNewRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  const addInstruction = () => {
    setNewRecipe((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }));
  };

  const updateIngredient = (index, value) => {
    setNewRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, idx) =>
        idx === index ? value : ing
      ),
    }));
  };

  const updateInstruction = (index, value) => {
    setNewRecipe((prev) => ({
      ...prev,
      instructions: prev.instructions.map((inst, idx) =>
        idx === index ? value : inst
      ),
    }));
  };

  const RecipeCard = ({ recipe }) => (
    <div
      className={`${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } 
                  border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 
                  cursor-pointer transform hover:scale-105`}
      onClick={() => {
        setSelectedRecipe(recipe);
        setServings(recipe.servings);
        setCurrentView("recipe");
      }}
    >
      <div className="relative">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleBookmark(recipe.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          {bookmarks.includes(recipe.id) ? (
            <BookmarkCheck className="w-5 h-5 text-red-500" />
          ) : (
            <Bookmark className="w-5 h-5 text-gray-600" />
          )}
        </button>
        <div className="absolute bottom-3 left-3">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              darkMode
                ? "bg-gray-900/80 text-white"
                : "bg-white/80 text-gray-800"
            }`}
          >
            {recipe.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3
          className={`font-bold text-lg mb-2 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          {recipe.title}
        </h3>
        <div className="flex items-center justify-between text-sm">
          <div
            className={`flex items-center ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <Clock className="w-4 h-4 mr-1" />
            {recipe.cookTime} min
          </div>
          <div
            className={`flex items-center ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <Users className="w-4 h-4 mr-1" />
            {recipe.servings} servings
          </div>
        </div>
        <p
          className={`text-sm mt-2 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          by {recipe.author}
        </p>
      </div>
    </div>
  );

  const RecipeDetail = ({ recipe }) => {
    const adjustedIngredients = getAdjustedIngredients(
      recipe.ingredients,
      recipe.servings,
      servings
    );

    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setCurrentView("search")}
          className={`mb-6 px-4 py-2 rounded-lg ${
            darkMode
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          } transition-colors`}
        >
          ← Back to Search
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-64 object-cover rounded-xl shadow-lg"
            />
            <div className="mt-4">
              <h1
                className={`text-3xl font-bold mb-2 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {recipe.title}
              </h1>
              <p
                className={`${
                  darkMode ? "text-gray-300" : "text-gray-600"
                } mb-4`}
              >
                by {recipe.author}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div
                  className={`flex items-center ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <Clock className="w-5 h-5 mr-2" />
                  {recipe.cookTime} minutes
                </div>
                <button
                  onClick={() => toggleBookmark(recipe.id)}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    bookmarks.includes(recipe.id)
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : darkMode
                      ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {bookmarks.includes(recipe.id) ? (
                    <BookmarkCheck className="w-4 h-4 mr-1" />
                  ) : (
                    <Bookmark className="w-4 h-4 mr-1" />
                  )}
                  {bookmarks.includes(recipe.id) ? "Bookmarked" : "Bookmark"}
                </button>
              </div>

              <div
                className={`p-4 rounded-lg ${
                  darkMode ? "bg-gray-800" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`font-medium ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Servings
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setServings(Math.max(1, servings - 1))}
                      className={`w-8 h-8 rounded-full ${
                        darkMode
                          ? "bg-gray-700 text-white hover:bg-gray-600"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      } transition-colors flex items-center justify-center font-bold`}
                    >
                      -
                    </button>
                    <span
                      className={`font-bold text-lg ${
                        darkMode ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {servings}
                    </span>
                    <button
                      onClick={() => setServings(servings + 1)}
                      className={`w-8 h-8 rounded-full ${
                        darkMode
                          ? "bg-gray-700 text-white hover:bg-gray-600"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      } transition-colors flex items-center justify-center font-bold`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-6">
              <h2
                className={`text-xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Ingredients
              </h2>
              <ul className="space-y-2">
                {adjustedIngredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className={`flex items-center ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mr-3 ${
                        darkMode ? "bg-orange-500" : "bg-orange-400"
                      }`}
                    ></div>
                    <span className="font-medium mr-2">
                      {ingredient.quantity}
                    </span>
                    <span className="mr-2">{ingredient.unit}</span>
                    <span>{ingredient.description}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2
                className={`text-xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Instructions
              </h2>
              <ol className="space-y-3">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex">
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full ${
                        darkMode ? "bg-orange-500" : "bg-orange-400"
                      } text-white font-bold flex items-center justify-center mr-3 text-sm`}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-700"
                      } leading-relaxed`}
                    >
                      {instruction}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AddRecipeForm = () => (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2
          className={`text-2xl font-bold ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Add Your Recipe
        </h2>
        <button
          onClick={() => setShowAddRecipe(false)}
          className={`px-4 py-2 rounded-lg ${
            darkMode
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          } transition-colors`}
        >
          Cancel
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Recipe Title
          </label>
          <input
            type="text"
            value={newRecipe.title}
            onChange={(e) =>
              setNewRecipe((prev) => ({ ...prev, title: e.target.value }))
            }
            className={`w-full p-3 rounded-lg border ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
            } focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
            placeholder="Enter recipe title"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Cook Time (minutes)
            </label>
            <input
              type="number"
              value={newRecipe.cookTime}
              onChange={(e) =>
                setNewRecipe((prev) => ({ ...prev, cookTime: e.target.value }))
              }
              className={`w-full p-3 rounded-lg border ${
                darkMode
                  ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
              } focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
              placeholder="30"
            />
          </div>
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Servings
            </label>
            <input
              type="number"
              value={newRecipe.servings}
              onChange={(e) =>
                setNewRecipe((prev) => ({
                  ...prev,
                  servings: parseInt(e.target.value) || 1,
                }))
              }
              className={`w-full p-3 rounded-lg border ${
                darkMode
                  ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
              } focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
              placeholder="4"
            />
          </div>
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Ingredients
          </label>
          {newRecipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              value={ingredient}
              onChange={(e) => updateIngredient(index, e.target.value)}
              className={`w-full p-3 rounded-lg border mb-2 ${
                darkMode
                  ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
              } focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
              placeholder={`Ingredient ${index + 1}`}
            />
          ))}
          <button
            onClick={addIngredient}
            className="text-orange-500 hover:text-orange-600 font-medium text-sm"
          >
            + Add Ingredient
          </button>
        </div>

        <div>
          <label
            className={`block text-sm font-medium mb-2 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Instructions
          </label>
          {newRecipe.instructions.map((instruction, index) => (
            <textarea
              key={index}
              value={instruction}
              onChange={(e) => updateInstruction(index, e.target.value)}
              className={`w-full p-3 rounded-lg border mb-2 ${
                darkMode
                  ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
              } focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
              placeholder={`Step ${index + 1}`}
              rows="2"
            />
          ))}
          <button
            onClick={addInstruction}
            className="text-orange-500 hover:text-orange-600 font-medium text-sm"
          >
            + Add Step
          </button>
        </div>

        <button
          onClick={addCustomRecipe}
          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium"
        >
          Add Recipe
        </button>
      </div>
    </div>
  );

  const BookmarksList = () => {
    const bookmarkedRecipes = [...recipes, ...customRecipes].filter((recipe) =>
      bookmarks.includes(recipe.id)
    );

    return (
      <div>
        <h2
          className={`text-2xl font-bold mb-6 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Your Bookmarks ({bookmarkedRecipes.length})
        </h2>
        {bookmarkedRecipes.length === 0 ? (
          <div
            className={`text-center py-12 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No bookmarked recipes yet</p>
            <p className="text-sm">Start bookmarking your favorite recipes!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : "bg-gradient-to-br from-orange-50 to-red-50"
      }`}
    >
      {/* Header */}
      <header
        className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } 
                          border-b shadow-sm sticky top-0 z-50`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ChefHat className="w-8 h-8 text-orange-500 mr-3" />
              <h1
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Forkify
              </h1>
            </div>

            <nav className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView("search")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === "search"
                    ? "bg-orange-500 text-white"
                    : darkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                Recipes
              </button>
              <button
                onClick={() => setCurrentView("bookmarks")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentView === "bookmarks"
                    ? "bg-orange-500 text-white"
                    : darkMode
                    ? "text-gray-300 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }`}
              >
                Bookmarks ({bookmarks.length})
              </button>
              <button
                onClick={() => setShowAddRecipe(true)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  darkMode
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Recipe
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode
                    ? "bg-gray-700 text-yellow-400 hover:bg-gray-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {showAddRecipe ? (
          <AddRecipeForm />
        ) : currentView === "recipe" && selectedRecipe ? (
          <RecipeDetail recipe={selectedRecipe} />
        ) : currentView === "bookmarks" ? (
          <BookmarksList />
        ) : (
          <>
            {/* Search Section */}
            <div className="text-center mb-12">
              <h2
                className={`text-4xl font-bold mb-4 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Discover Amazing Recipes
              </h2>
              <p
                className={`text-xl mb-8 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Find the perfect recipe for any occasion
              </p>

              <div className="max-w-md mx-auto relative">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-full border ${
                    darkMode
                      ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      : "bg-white border-gray-300 text-gray-800 placeholder-gray-500"
                  } focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-lg`}
                />
              </div>
            </div>

            {/* Recipe Grid */}
            <div>
              <h3
                className={`text-2xl font-bold mb-6 ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                {searchTerm
                  ? `Search Results (${filteredRecipes.length})`
                  : "Featured Recipes"}
              </h3>

              {filteredRecipes.length === 0 ? (
                <div
                  className={`text-center py-12 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No recipes found</p>
                  <p className="text-sm">Try a different search term</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
              )}
            </div>

            {/* Categories Section */}
            {!searchTerm && (
              <div className="mt-12">
                <h3
                  className={`text-2xl font-bold mb-6 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  Browse by Category
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {["Italian", "Asian", "Dessert", "Indian", "Custom"].map(
                    (category) => {
                      const categoryCount = [
                        ...recipes,
                        ...customRecipes,
                      ].filter((r) => r.category === category).length;
                      return (
                        <button
                          key={category}
                          onClick={() => setSearchTerm(category)}
                          className={`p-4 rounded-xl text-center transition-all duration-300 hover:scale-105 ${
                            darkMode
                              ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                              : "bg-white border-gray-200 text-gray-800 hover:bg-gray-50"
                          } border shadow-md`}
                        >
                          <div className="text-2xl mb-2">
                            {category === "Italian" && "🍝"}
                            {category === "Asian" && "🍜"}
                            {category === "Dessert" && "🍰"}
                            {category === "Indian" && "🍛"}
                            {category === "Custom" && "👨‍🍳"}
                          </div>
                          <h4 className="font-semibold">{category}</h4>
                          <p
                            className={`text-sm ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {categoryCount} recipes
                          </p>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            {/* Features Section */}
            {!searchTerm && (
              <div className="mt-12 grid md:grid-cols-3 gap-6">
                <div
                  className={`p-6 rounded-xl ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } shadow-lg`}
                >
                  <Users className="w-8 h-8 text-orange-500 mb-4" />
                  <h3
                    className={`font-bold text-lg mb-2 ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Adjust Servings
                  </h3>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Automatically calculate ingredient quantities for any number
                    of people
                  </p>
                </div>

                <div
                  className={`p-6 rounded-xl ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } shadow-lg`}
                >
                  <Bookmark className="w-8 h-8 text-orange-500 mb-4" />
                  <h3
                    className={`font-bold text-lg mb-2 ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Save Favorites
                  </h3>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Bookmark your favorite recipes for quick access later
                  </p>
                </div>

                <div
                  className={`p-6 rounded-xl ${
                    darkMode ? "bg-gray-800" : "bg-white"
                  } shadow-lg`}
                >
                  <Plus className="w-8 h-8 text-orange-500 mb-4" />
                  <h3
                    className={`font-bold text-lg mb-2 ${
                      darkMode ? "text-white" : "text-gray-800"
                    }`}
                  >
                    Add Your Own
                  </h3>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Share your favorite recipes with the community
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Add Recipe Modal */}
      {showAddRecipe && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div
            className={`${
              darkMode ? "bg-gray-900" : "bg-white"
            } rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto`}
          >
            <AddRecipeForm />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        } 
                          border-t mt-16`}
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <ChefHat className="w-6 h-6 text-orange-500 mr-2" />
              <span
                className={`font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Forkify
              </span>
            </div>
            <p className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Your ultimate recipe companion for delicious meals
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ForkifyApp;
