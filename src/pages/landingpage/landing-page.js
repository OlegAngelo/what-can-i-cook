import localFont from "next/font/local";
import { useState,useEffect } from "react";
import WhatCanICookAPI from '../api/WhatCanICookAPI.js';
import RecipesList from '../recipes/list.js';
import Cookies from 'js-cookie';

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const [ingredientValue, setIngredientValue] = useState("");
  const [recipes, setRecipes] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedIngredient = Cookies.get('ingredient');
    if (savedIngredient) {
      setIngredientValue(savedIngredient);
    }
  }, []);

  const handleIngredientInput = (event) => {
  if (event.key === "Enter") {
    if (ingredientValue) {
      Cookies.set('ingredient', ingredientValue, { expires: 7 });
      WhatCanICookAPI.getRecipeList(ingredientValue)
        .then((data) => {
          if (data.error) {
            setMessage(data.error); // Handle error
            setRecipes(null); // Clear recipes if there's an error
          } else if (data.message) {
            setMessage(data.message); // Handle no recipes found message
            setRecipes(null); // Clear recipes if no recipes found
          } else {
            setMessage(""); // Clear message if recipes found
            setRecipes(data); // Set the retrieved recipes
          }
        });
    } else {
      // Do nothing if no ingredient inputted
      setMessage(""); // Clear message if recipes found
      return;
    }
  }
};

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid
        ${recipes ? 'grid-rows-[auto_auto_1fr]' : 'grid-rows-[1fr_auto]'}
        justify-items-center min-h-screen p-4 pb-20 max-2-full overflow-hidden
        font-[family-name:var(--font-geist-sans)]`}
    >
      <header className={`flex flex-col row-start-1 items-center sm:items-start 
          ${recipes ? 'self-start' : 'self-center'}`}
      >
        <div className="text-xl text-center sm:text-center font-[family-name:var(--font-geist-mono)]">
          <div className="mb-2">
            I want to cook but my ingredients are only{" "}
            <div className="px-1 py-0.5 rounded font-semibold text-dark inline-block">
              <div className="relative inline-block w-full">
                <input
                  className="bg-[var(--background)] placeholder-white border-b-2 border-white focus:outline-none pl-1 w-full"
                  type="text"
                  value={ingredientValue}
                  onChange={(e) => setIngredientValue(e.target.value)}
                  onKeyDown={handleIngredientInput}
                  placeholder={`"apple potato carrots"`}
                />
                <div className="absolute bottom-0 left-0 w-full border-b-2 border-white pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {message && (
        <div className="row-start-2 text-center text-red-500">
          {message}
        </div>
      )}


      {recipes && (
        <main className="row-start-2 flex flex-col gap-6 items-center justify-center">
          <div>
            <RecipesList recipes={recipes} />
          </div>
        </main>
      )}
    </div>
  );
}
