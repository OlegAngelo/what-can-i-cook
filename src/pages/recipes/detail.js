import { ClockIcon, BellIcon, LinkIcon, FireIcon } from "@heroicons/react/24/outline"; 

const Modal = ({ isOpen, onClose, recipe }) => {
    if (!isOpen || !recipe) return null; 
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-90 flex items-center justify-center z-50">
            <div className="bg-black text-white rounded-lg p-8 max-w-lg w-full relative">
                {/* Close button */}
                <button
                    className="absolute top-2 right-2 text-white text-xl"
                    onClick={onClose}
                >
                    &times; {/* Close icon */}
                </button>

                {/* Recipe Image */}
                <div className="flex justify-center mb-4">
                    <img src={recipe.image} alt={recipe.name} className="max-w-full h-auto rounded" />
                </div>

                {/* Recipe Name */}
                <h2 className="text-xl text-center font-bold mb-4">{recipe.name}</h2>

                <div className="flex justify-center gap-4 mb-4">
                    {/* Total Time */}
                    <div className="flex items-center text-sm">
                        <ClockIcon className="w-5 h-5 mr-2" />
                        <span className="italic">{recipe.total_time} mins</span>
                    </div>

                    {/* Meal Type */}
                    <div className="flex items-center text-sm">
                        <BellIcon className="w-5 h-5 mr-2" />
                        <span className="italic">{recipe.meal_type}</span>
                    </div>

                    {/* Calories */}
                    <div className="flex items-center text-sm">
                        <FireIcon className="w-5 h-5 mr-2" />
                        <span className="italic">{recipe.calorie} kcal</span> 
                    </div>
                </div>
                
                <div className="flex flex-col items-center text-sm mb-4">
                    {recipe.cuisine_type && (
                        <span className="italic">Cuisine Type: {recipe.cuisine_type}</span>
                    )}
                    {recipe.dish_type && (
                        <span className="italic">{recipe.dish_type}</span>
                    )}
                </div>
                
                {/* Ingredients List */}
                <h3 className="text-lg font-semibold mb-2">Ingredients</h3>

                <div className="max-h-40 overflow-y-auto mb-4 modal-scrollbar">
                    <ul className="list-disc list-inside">
                        {recipe.ingredient_lines && recipe.ingredient_lines.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>

                {/* Instructions URL */}
                <div className="flex justify-center">
                    <a
                        href={recipe.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-400 hover:text-blue-600 underline"
                    >
                        <LinkIcon className="w-5 h-5 mr-2" />
                        View Full Instructions
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Modal;
