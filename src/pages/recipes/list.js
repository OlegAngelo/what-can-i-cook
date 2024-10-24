import RecipesListItem from "./list-item.js";

const RecipesList = ({ recipes, onRecipeClick }) => {
	if (!recipes || !Array.isArray(recipes))
		return <div>No recipes available</div>;

	const renderedList = recipes.map((recipe) => (
		<div
			key={recipe.recipe_id}
			onClick={() => onRecipeClick(recipe)}
			className="cursor-pointer"
		>
			<RecipesListItem recipe={recipe} />
		</div>
	));

	return (
		<div className="w-full max-w-md mx-auto px-4 sm:px-0">{renderedList}</div>
	);
};

export default RecipesList;
