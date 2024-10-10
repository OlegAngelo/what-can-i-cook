import Link from 'next/link';
import RecipesListItem from './list-item.js';

export default function RecipesList ({ recipes }) {
    const renderedList = recipes.map((recipe) => {
        return (
            <Link
                href={`/recipes/${recipe.recipe_id}`}
                key={recipe.recipe_id}
            >
                <RecipesListItem recipe={recipe} />
            </Link>
        )
    })

    if (!recipes) return <div>Loading...</div>

    return (
        <div>
            {renderedList}
        </div>
    )
}
