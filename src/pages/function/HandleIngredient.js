import { startTransition } from 'react';
import WhatCanICookAPI from '../api/WhatCanICookAPI.js';
import Cookies from 'js-cookie';

export default function HandleIngredientInput({ ingredientValue, setIngredientValue, setMessage, setRecipes }) {
  const handleFocus = (event) => {
    event.target.placeholder = '';
  };

  const handleBlur = (event) => {
    event.target.placeholder = '"apple potato carrots"';
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {

      startTransition(() => {
        if (ingredientValue) {
          // Set ingredient in cookies
          Cookies.set('ingredient', ingredientValue, { expires: 1 });

          // Call API to get recipe list
          WhatCanICookAPI.getRecipeList(ingredientValue)
            .then((data) => {
              if (data.error) {
                setMessage(data.error); // Display error message
                setRecipes(null); // Clear recipes if there's an error
              } else if (data.message) {
                setMessage(data.message); // Handle no recipes found message
                setRecipes(null); // Clear recipes if no recipes found
              } else {
                setMessage(""); // Clear any previous messages
                setRecipes(data); // Set the retrieved recipes
              }
            })
            .catch((error) => {
              console.error("Error fetching recipes:", error);
              setMessage("An error occurred. Please try again.");
              setRecipes(null);
            });
        } else {
          setMessage(""); // Do nothing if no input
          setRecipes(null);
        }
      })
    }
  };

  return (
    <>
      <input
        className="placeholder-opacity-50 text-center font-geist bg-[var(--background)] placeholder-white border-b-2 border-white focus:outline-none pl-1 w-full"
        type="text"
        value={ingredientValue}
        onChange={(e) => setIngredientValue(e.target.value)}
        onKeyDown={handleKeyPress}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={`"apple potato carrots"`}
      />
      <div className="absolute bottom-0 left-0 w-full border-b-2 border-white pointer-events-none" />
    </>
  );
}
