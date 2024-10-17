import Link from "next/link";
import RecipesListItem from "./list-item.js";

const RecipesList = ({ setIsLoading, isLoading, recipes }) => {
	if (!recipes) return <div />;

	const renderedList = recipes.map((recipe) => (
		<Link href={`/recipes/${recipe.recipe_id}`} key={recipe.recipe_id}>
			<RecipesListItem
				setIsLoading={setIsLoading}
				isLoading={isLoading}
				recipe={recipe}
			/>
		</Link>
	));

	return (
		<div className="w-full max-w-md mx-auto px-4 sm:px-0">{renderedList}</div>
	);
};

export default RecipesList;
