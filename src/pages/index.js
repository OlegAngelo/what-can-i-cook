import React, { Suspense, useState, useEffect } from "react";
// import Cookies from 'js-cookie';

const HandleIngredientInputComponent = React.lazy(() =>
	import("./function/HandleIngredient.js")
);
const LazyRecipesList = React.lazy(() => import("./recipes/list.js"));
const Modal = React.lazy(() => import("./recipes/detail.js"));

const Home = () => {
	// State hooks first
	const [ingredientValue, setIngredientValue] = useState("");
	const [recipes, setRecipes] = useState(null);
	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);
	// Modal states
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedRecipe, setSelectedRecipe] = useState(null);
	const [easterEggClick, setEasterEggClick] = useState(0);
	// Food icon loader state
	const foodIcons = ["🍔", "🍕", "🍣"];
	const [foodIconIndex, setFoodIconIndex] = useState(0);

	useEffect(() => {
		let interval;
		if (loading) {
			interval = setInterval(() => {
				setFoodIconIndex((prev) => (prev + 1) % foodIcons.length);
			}, 1000); // 1s matches spin duration
		} else {
			setFoodIconIndex(0);
		}
		return () => clearInterval(interval);
	}, [loading]);

	useEffect(() => {
		const savedIngredient = localStorage.getItem("ingredients");
		if (savedIngredient) {
			setIngredientValue(savedIngredient);
		}
	}, []);

	const handleEasterEggClick = () => {
		setEasterEggClick((prevCount) => prevCount + 1);

		// Check if click count reaches 10
		if (easterEggClick + 1 === 10) {
			window.open(
				"https://olegangelo.github.io/easter-egg/portfolio.mp4",
				"_blank"
			);

			setEasterEggClick(0);
		}
	};

	// Function to open the modal
	const onRecipeClick = (recipe) => {
		setSelectedRecipe(recipe);
		setIsModalOpen(true);
	};

	// Function to close the modal
	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedRecipe(null);
	};

	return (
		<div
			className={`font-geist font-geistMono grid
        grid-auto-rows-auto
        justify-items-center min-h-screen p-4 pb-20 max-w-full overflow-hidden font-geist`}
		>
			<header
				className={`flex flex-col row-start-1 items-center sm:items-start 
          ${recipes ? "self-start" : "self-center"}`}
			>
				<div className="text-xl text-center font-geistMono mb-2">
					I want to cook but my{" "}
					<span onClick={handleEasterEggClick}>ingredients</span> are only{" "}
					<Suspense fallback={<div></div>}>
						<HandleIngredientInputComponent
							ingredientValue={ingredientValue}
							setIngredientValue={setIngredientValue}
							setMessage={setMessage}
							setRecipes={setRecipes}
							loading={loading}
							setLoading={setLoading}
						/>
					</Suspense>
				</div>
			</header>

			{loading && (
				<div className="w-full max-w-lg flex flex-col items-center mt-4">
					{/* Animated spinning food icon loader */}
					<div className="flex justify-center items-center w-full h-20 mb-2">
						<span
							className="text-6xl food-spin scale-125 transition-transform duration-300"
							style={{ display: "inline-block" }}
						>
							{foodIcons[foodIconIndex]}
						</span>
					</div>
					{/* Custom spinning animation for emoji */}
					<style>{`
						@keyframes food-spin {
							0% { transform: rotate(0deg) scale(1.25); }
							100% { transform: rotate(360deg) scale(1.25); }
						}
						.food-spin {
							animation: food-spin 1s linear infinite;
							display: inline-block;
						}
					`}</style>
					<div className="text-blue-500 text-lg text-center">
						Cooking up something tasty... hang tight!
					</div>
				</div>
			)}

			{message && !loading && (
				<div className="row-start-2 text-center text-red-500">{message}</div>
			)}

			{recipes && !loading && (
				<main className="row-start-2 gap-6 items-center justify-center w-full">
					<Suspense fallback={<div></div>}>
						<LazyRecipesList recipes={recipes} onRecipeClick={onRecipeClick} />
					</Suspense>
				</main>
			)}

			{/* Modal component */}
			<Modal isOpen={isModalOpen} onClose={closeModal} recipe={selectedRecipe} />
		</div>
	);
};

export default Home;
