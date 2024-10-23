import React, { Suspense, useState, useEffect } from "react";
import Cookies from "js-cookie";

const HandleIngredientInputComponent = React.lazy(() =>
	import("./function/HandleIngredient.js")
);
const LazyRecipesList = React.lazy(() => import("./recipes/list.js"));
const Loading = React.lazy(() => import("./recipes/loading.js"));

const Home = () => {
	const [ingredientValue, setIngredientValue] = useState(
		Cookies.get("ingredient") || ""
	);
	const [recipes, setRecipes] = useState(null);
	const [message, setMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	return (
		<div
			className={`font-geist font-geistMono grid
      grid-auto-rows-auto justify-items-center
      min-h-screen p-4 pb-20 max-w-full overflow-hidden font-geist`}
		>
			<header
				className={`flex flex-col row-start-1 items-center sm:items-start ${
					recipes ? "self-start" : "self-center"
				}`}
			>
				<div className="text-xl text-center font-geistMono mb-2">
					I want to cook but my ingredients are only{" "}
					<Suspense fallback={<Loading />}>
						<HandleIngredientInputComponent
							ingredientValue={ingredientValue}
							setIngredientValue={setIngredientValue}
							setMessage={setMessage}
							setRecipes={setRecipes}
							setIsLoading={setIsLoading}
						/>
					</Suspense>
				</div>
			</header>

			{message && (
				<div className="row-start-2 text-center text-red-500">{message}</div>
			)}

			{recipes && (
				<main className="row-start-2 gap-6 items-center justify-center w-full">
					<Suspense fallback={<Loading />}>
						<LazyRecipesList
							setIsLoading={setIsLoading}
							isLoading={isLoading}
							recipes={recipes}
						/>
					</Suspense>
				</main>
			)}
		</div>
	);
};

export default Home;
