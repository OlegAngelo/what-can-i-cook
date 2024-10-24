import {
	ClockIcon,
	BellIcon,
	LinkIcon,
	FireIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";
import Image from "next/image";

const Modal = ({ isOpen, onClose, recipe }) => {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
			const handleEsc = (event) => {
				if (event.key === "Escape") {
					onClose();
				}
			};
			window.addEventListener("keydown", handleEsc);
			return () => {
				document.body.style.overflow = "";
				window.removeEventListener("keydown", handleEsc);
			};
		}
	}, [isOpen, onClose]);

	if (!isOpen || !recipe) return null;

	return (
		<div
			className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50 p-4 sm:p-8"
			role="dialog"
			aria-modal="true"
		>
			{/*Close Button */}
			<div className="bg-[var(--background)] text-[var(--foreground)] rounded-lg max-w-full sm:max-w-lg w-full max-h-[90vh] overflow-y-auto relative shadow-xl p-6">
				<div className="flex sticky top-0 justify-end z-50">
					<button
						className="text-[var(--foreground)] hover:text-gray-100 transition duration-300 text-2xl"
						onClick={onClose}
						aria-label="Close modal"
					>
						&times;
					</button>
				</div>

				{/*Recipe Name */}
				<p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[var(--foreground)] text-center font-bold">
					{recipe.name}
				</p>

				{/*Recipe Image */}
				<div className="flex justify-center mb-4 p-4">
					<Image
						src={recipe.image}
						alt={recipe.name}
						className="max-w-full h-auto rounded-lg border border-gray-600 shadow-md"
						width={200}
						height={500}
						quality={100}
					/>
				</div>

				{/*TotalTime, MealType, Calorie */}
				<div className="flex flex-wrap justify-center gap-4 mb-4">
					<RecipeDetail icon={ClockIcon} text={`${recipe.total_time} mins`} />
					<RecipeDetail icon={BellIcon} text={recipe.meal_type} />
					<RecipeDetail icon={FireIcon} text={`${recipe.calorie} kcal`} />
				</div>

				{/*CusineType & DishType */}
				<div className="flex flex-col items-center text-sm sm:text-base md:text-lg mb-4 text-center text-[var(--card-heading)]">
					{recipe.cuisine_type && (
						<span className="italic text-[var(--card-heading)] break-words">
							Cuisine Type: {recipe.cuisine_type}
						</span>
					)}
					{recipe.dish_type && (
						<span className="italic text-[var(--card-span)] break-words font-semibold">
							{recipe.dish_type}
						</span>
					)}
				</div>

				{/*Ingredient Line */}
				<h3 className="text-md sm:text-lg md:text-xl font-semibold mb-2 border-b border-[var(--foreground)] pb-2">
					Ingredients
				</h3>
				<div className="max-h-40 overflow-y-auto mb-4 modal-scrollbar">
					<ul className="list-disc list-inside">
						{recipe.ingredient_lines.map((ingredient, index) => (
							<li key={index} className="text-sm sm:text-base md:text-lg">
								{ingredient}
							</li>
						))}
					</ul>
				</div>

				{/*Recipe URL*/}
				<div className="flex justify-center">
					<a
						href={recipe.url}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center text-blue-500 hover:text-blue-300 underline transition duration-300 text-center"
					>
						<LinkIcon className="w-5 h-5 mr-2" />
						View Full Instructions
					</a>
				</div>
			</div>
		</div>
	);
};

const RecipeDetail = ({ icon: Icon, text }) => (
	<div className="flex items-center text-sm sm:text-base md:text-lg text-[var(--foreground)]">
		<Icon className="w-5 h-5 mr-2 text-[var(--card-span)]" />
		<span className="italic">{text}</span>
	</div>
);

export default Modal;
