import React, { Suspense, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const HandleIngredientInputComponent = React.lazy(() => import('./function/HandleIngredient.js'));
const LazyRecipesList = React.lazy(() => import('./recipes/list.js'));

const Home = () => {
  const [ingredientValue, setIngredientValue] = useState("");
  const [recipes, setRecipes] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedIngredient = Cookies.get('ingredient');

    if (savedIngredient) {
      setIngredientValue(savedIngredient);
    }
  }, []);

  return (
    <div
      className={`font-geist font-geistMono grid
        grid-auto-rows-auto
        justify-items-center min-h-screen p-4 pb-20 max-w-full overflow-hidden font-geist`}
    >
      <header className={`flex flex-col row-start-1 items-center sm:items-start 
          ${recipes ? 'self-start' : 'self-center'}`}
      >
        <div className="text-xl text-center font-geistMono mb-2">
          I want to cook but my ingredients are only{" "}
            <Suspense fallback={<div>Loading...</div>}>
              <HandleIngredientInputComponent
                ingredientValue={ingredientValue}
                setIngredientValue={setIngredientValue}
                setMessage={setMessage}
                setRecipes={setRecipes}
              />
            </Suspense>
        </div>
      </header>

      {message && (
        <div className="row-start-2 text-center text-red-500">
          {message}
        </div>
      )}

      {recipes && (
        <main className="row-start-2 gap-6 items-center justify-center w-full">
          <Suspense fallback={<div>Loading...</div>}>
            <LazyRecipesList recipes={recipes}/>
          </Suspense>
        </main>
      )}
    </div>
  );
}

export default Home;
