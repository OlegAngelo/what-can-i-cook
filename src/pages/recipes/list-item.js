import { ClockIcon, BellIcon } from "@heroicons/react/24/outline"
import Image from "next/image"

const RecipesListItem = ({ recipe }) => {
    if (!recipe) return <div></div>

    return (
        <div className="flex flex-col sm:flex-row border border-white rounded mb-5">
            <div className="flex-none w-[140px]">
                <Image
                    src={recipe.image}
                    alt={recipe.name}
                    width={100}
                    height={500}
                    quality={100}
                    style={{
                        maxWidth: '140px',
                        minWidth: '140px',
                        width: '100%',
                        height: 'auto',
                    }}
                    loading="lazy"
                    className="rounded m-2 rounded"
                />
            </div>
            <div className="flex-grow flex flex-col m-4">
                <p className="flex-1 text-left xs:text-sm sm:text-base max-h-[6rem] overflow-hidden font-bold text-white font-geist">
                    {recipe.name}
                </p>
                <div className="flex-2 flex-col justify-evenly overflow-hidden">
                    <div className="flex items-center text-sm text-white">
                        <ClockIcon className="w-5 h-5 mr-2" />
                        <span className="italic">{recipe.total_time} mins</span>
                    </div>
                    <div className="flex items-center text-sm text-white">
                        <BellIcon className="w-5 h-5 mr-2" />
                        <span className="italic">{recipe.meal_type}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecipesListItem;
