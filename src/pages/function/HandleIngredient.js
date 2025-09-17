import React, { useCallback, startTransition, useRef } from "react";
import WhatCanICookAPI from "../api/WhatCanICookAPI.js";

const HandleIngredientInput = ({
	ingredientValue,
	setIngredientValue,
	setMessage,
	setRecipes,
	loading,
	setLoading,
}) => {
	const isSearchingRef = useRef(false);

	const fetchRecipes = useCallback(
		async (ingredient) => {
			if (isSearchingRef.current) return;
			isSearchingRef.current = true;
			setLoading(true);
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
			} finally {
				setLoading(false);
				isSearchingRef.current = false;
			}
		},
		[setMessage, setRecipes, setLoading]
	);

	const handleFocus = useCallback((event) => {
		event.target.placeholder = "";
	}, []);

	const handleBlur = useCallback((event) => {
		event.target.placeholder = '"apple potato carrots"';
	}, []);

	const handleKeyPress = useCallback(
		(event) => {
			if (event.key === "Enter" && !loading) {
				startTransition(() => {
					if (ingredientValue) {
						localStorage.setItem("ingredients", ingredientValue);
						fetchRecipes(ingredientValue);
					} else {
						setMessage("");
						setRecipes(null);
					}
				});
			}
		},
		[ingredientValue, fetchRecipes, setMessage, setRecipes, loading]
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
				disabled={loading}
				style={loading ? { opacity: 0.5, cursor: "not-allowed" } : {}}
			/>
		</>
	);
};

export default React.memo(HandleIngredientInput);
