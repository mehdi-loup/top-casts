import type React from "react";

import { Image } from "./Image";

interface ImageGalleryProps {
	images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
	if (!images || images.length === 0) return null;

	const imageCount = images.length;

	if (imageCount === 1) {
		// Single large image
		return (
			<div className="relative w-full aspect-video rounded-lg overflow-hidden ">
				<Image
					src={images[0]}
					alt="Image"
					className="w-full h-full object-cover hover:opacity-95 transition-opacity"
				/>
			</div>
		);
	}

	if (imageCount === 2) {
		// Two images side by side
		return (
			<div className="grid grid-cols-2 gap-2 aspect-video">
				{images.map((image, index) => (
					<div
						key={index}
						className="relative rounded-lg overflow-hidden cursor-pointer"
					>
						<Image
							src={image}
							alt={`Image ${index + 1}`}
							className="w-full h-full object-cover hover:opacity-95 transition-opacity"
						/>
					</div>
				))}
			</div>
		);
	}

	if (imageCount === 3) {
		// 2x2 grid with one empty spot
		return (
			<div className="grid grid-cols-2 grid-rows-2 gap-2 aspect-video">
				<div className="relative rounded-lg overflow-hidden">
					<Image
						src={images[0]}
						alt="Image 1"
						className="w-full h-full object-cover hover:opacity-95 transition-opacity"
					/>
				</div>
				<div className="relative rounded-lg overflow-hidden">
					<Image
						src={images[1]}
						alt="Image 2"
						className="w-full h-full object-cover hover:opacity-95 transition-opacity"
					/>
				</div>
				<div className="relative rounded-lg overflow-hidden">
					<Image
						src={images[2]}
						alt="Image 3"
						className="w-full h-full object-cover hover:opacity-95 transition-opacity"
					/>
				</div>
				{/* Empty fourth spot */}
				<div className="relative" />
			</div>
		);
	}

	if (imageCount === 4) {
		// Perfect 2x2 grid
		return (
			<div className="grid grid-cols-2 grid-rows-2 gap-2 aspect-video">
				{images.map((image, index) => (
					<div key={index} className="relative rounded-lg overflow-hidden">
						<Image
							src={image}
							alt={`Image ${index + 1}`}
							className="w-full h-full object-cover hover:opacity-95 transition-opacity"
						/>
					</div>
				))}
			</div>
		);
	}

	// 5+ images: Show first 3 with "see more" overlay
	const remainingCount = imageCount - 3;
	return (
		<div className="grid grid-cols-2 grid-rows-2 gap-2 aspect-video">
			<div className="relative rounded-lg overflow-hidden ">
				<Image
					src={images[0]}
					alt="Image 1"
					className="w-full h-full object-cover hover:opacity-95 transition-opacity"
				/>
			</div>
			<div className="relative rounded-lg overflow-hidden ">
				<Image
					src={images[1]}
					alt="Image 2"
					className="w-full h-full object-cover hover:opacity-95 transition-opacity"
				/>
			</div>
			<div className="relative rounded-lg overflow-hidden ">
				<Image
					src={images[2]}
					alt="Image 3"
					className="w-full h-full object-cover hover:opacity-95 transition-opacity"
				/>
				<div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
					<span className="text-white font-semibold text-lg">
						+{remainingCount} more
					</span>
				</div>
			</div>
			{/* Empty fourth spot */}
			<div className="relative" />
		</div>
	);
};

export default ImageGallery;
