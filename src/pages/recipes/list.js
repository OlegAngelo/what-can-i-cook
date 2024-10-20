//import Link from 'next/link';
import RecipesListItem from './list-item.js';

const RecipesList = ({ recipes }) => {
    if (!recipes) return <div>Loading...</div>;
export default function RecipesList ({ recipes, onRecipeClick  }) {
    const renderedList = recipes.map((recipe) => {
        return (
            <div key={recipe.recipe_id} onClick={() => onRecipeClick(recipe)}> {/* Handle click here */}
                <RecipesListItem recipe={recipe} />
            </div>
        );
    });

    const renderedList = recipes.map((recipe) => (
        <Link
            href={`/recipes/${recipe.recipe_id}`}
            key={recipe.recipe_id}
        >
            <RecipesListItem recipe={recipe} />
        </Link>
    ));

    return (
        <div className="w-full max-w-md mx-auto px-4 sm:px-0">
            {renderedList}
        </div>
    );
};

export default RecipesList;
