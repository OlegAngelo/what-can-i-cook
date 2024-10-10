import { ClockIcon, BellIcon } from "@heroicons/react/24/outline"
import Image from "next/image"

export default function RecipesListItem ({ recipe }) {
    if (!recipe) return <div></div>

    return (
        <div>
            <div className="hover:shadow-lg hover:shadow-white-500/50 border border-white rounded mb-5 flex max-h-[9rem] overflow-hidden">
                <Image
                    src={recipe.image}
                    alt={recipe.name}
                    width={100}
                    height={500}
                    quality={100}
                    style={{
                        maxWidth: '150px',
                        width: '100%',
                        height: 'auto',
                    }}
                    loading="lazy"
                    className="flex-1 m-2 rounded"
                />
                <div className="flex-2 flex flex-col m-4">
                    <p className="flex-1 text-left sm:text-sm md:text-base max-h-[6rem] overflow-hidden font-bold text-white font-[family-name:var(--font-geist-mono)]">
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
        </div>
    )
}
