import localFont from "next/font/local";
import { useState,useEffect } from "react";
import WhatCanICookAPI from '../api/WhatCanICookAPI.js';
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

  useEffect(() => {
    const savedIngredient = Cookies.get('ingredient');
    if (savedIngredient) {
      setIngredientValue(savedIngredient);
    }
  }, []);

  const handleIngredientInput = (event) => {
    if (event.key === "Enter") {
      if (ingredientValue) {
        Cookies.set('ingredient', ingredientValue);
        console.log("Cookie: ",Cookies.get('ingredient'));
        WhatCanICookAPI.getRecipeList(ingredientValue)
          .then(( data ) => {
            const response = data;
            console.log("recipe list: ", response)
          })
    
        // Uncomment code below if we want to clear the input after submission
        // setInputValue(""); 
      }
      else {
        // Do nothing if no input text
        console.log("No ingredient inputted!")
        return;
      }
    }
  };

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <header className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="text-xl text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <div className="mb-2">
            I want to cook but my ingredients are only{" "}
            <div className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold text-dark inline-block">
              <div className="relative inline-block">
                <input
                  className="bg-[var(--background)] text-dark border-b-2 border-white focus:outline-none pb-1"
                  type="text"
                  value={ingredientValue}
                  onChange={(e) => setIngredientValue(e.target.value)}
                  onKeyDown={handleIngredientInput}
                />
                <div className="absolute bottom-0 left-0 w-full border-b-2 border-white pointer-events-none" />
              </div>
            </div>
            .
          </div>
        </div>
      </header>

      <main className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <div></div>
      </main>
    </div>
  );
}
