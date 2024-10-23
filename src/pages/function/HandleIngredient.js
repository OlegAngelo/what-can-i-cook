import React, { startTransition, useCallback } from "react";
import WhatCanICookAPI from "../api/WhatCanICookAPI.js";
import Cookies from "js-cookie";

const HandleIngredientInput = ({
	ingredientValue,
	setIngredientValue,
	setMessage,
	setRecipes,
	setIsLoading,
}) => {
	const fetchRecipes = useCallback(
		async (ingredient) => {
			try {
				setIsLoading(true);
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
		},
		[setMessage, setRecipes, setIsLoading]
	);

	const handleFocus = useCallback((event) => {
		event.target.placeholder = "";
	}, []);

	const handleBlur = useCallback((event) => {
		event.target.placeholder = '"apple potato carrots"';
	}, []);

	const handleKeyPress = useCallback(
		(event) => {
			if (event.key === "Enter") {
				startTransition(() => {
					if (ingredientValue) {
						Cookies.set("ingredient", ingredientValue, { expires: 1 });
						// Call the memoized fetchRecipes function
						fetchRecipes(ingredientValue);
					} else {
						setMessage("");
						setRecipes(null);
					}
				});
			}
		},
		[ingredientValue, fetchRecipes, setMessage, setRecipes]
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
};

export default React.memo(HandleIngredientInput);
