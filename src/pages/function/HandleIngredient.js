import React, {useCallback, startTransition } from 'react';
import WhatCanICookAPI from '../api/WhatCanICookAPI.js';

const HandleIngredientInput = ({ ingredientValue, setIngredientValue, setMessage, setRecipes }) => {

  const fetchRecipes = useCallback(async (ingredient) => {
    try {
      const data = await WhatCanICookAPI.getRecipeList(ingredient);
      if (data.error) {
        setMessage(data.error);
        setRecipes(null);
      } else if (data.message) {
        setMessage(data.message);
        setRecipes(null);
      } else {
        setMessage("");
        setRecipes(data);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setMessage("An error occurred. Please try again.");
      setRecipes(null);
    }
  }, [setMessage, setRecipes]);

  const handleFocus = useCallback((event) => {
    event.target.placeholder = '';
  }, []);

  const handleBlur = useCallback((event) => {
    event.target.placeholder = '"apple potato carrots"';
  }, []);

  const handleKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        startTransition(() => {
          if (ingredientValue) {
            localStorage.setItem("ingredients", ingredientValue)
            fetchRecipes(ingredientValue);
          } else {
            setMessage("");
            setRecipes(null);
          }
        });
      }
    }, [ingredientValue, fetchRecipes, setMessage, setRecipes] // Added missing dependencies
  );

  return (
    <>
      <input
        className="relative inline-block placeholder-opacity-50
                  font-bold text-center font-geist bg-[var(--background)]
                  placeholder-[var(--foreground)] border-b-2 border-[var(--foreground)]
                  focus:outline-none w-full max-w-lg"
        type="text"
        value={ingredientValue}
        onChange={(e) => setIngredientValue(e.target.value)}
        onKeyDown={handleKeyPress}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={`"apple potato carrots"`}
      />
    </>
  );
}

export default React.memo(HandleIngredientInput);
