import React from "react";

const Loading = () => {
	return (
		<>
			{[...Array(10)].map((recipes, index) => (
				<div
					key={index}
					className="relative flex flex-col sm:flex-row shadow-md p-3 animate-pulse"
				>
					{/* Placeholder for Image */}
					<div className="flex-none w-[140px] h-[140px] bg-gray-200 rounded-md mb-3 sm:mb-0 sm:mr-3"></div>
					<div className="flex-grow flex flex-col">
						<div className="h-4 bg-gray-200 rounded mb-2"></div>{" "}
						{/* Placeholder for title */}
						<div className="flex items-center mb-1">
							<div className="w-4 h-4 bg-gray-200 rounded-full mr-2"></div>{" "}
							{/* Placeholder for clock icon */}
							<div className="h-4 bg-gray-200 rounded w-20"></div>{" "}
							{/* Placeholder for total time */}
						</div>
						<div className="flex items-center">
							<div className="w-4 h-4 bg-gray-200 rounded-full mr-2"></div>{" "}
							{/* Placeholder for bell icon */}
							<div className="h-4 bg-gray-200 rounded w-24"></div>{" "}
							{/* Placeholder for meal type */}
						</div>
					</div>
				</div>
			))}
		</>
	);
};

export default Loading;
