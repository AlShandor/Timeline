"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

interface Props {
	element: IElement;
	handleEdit: Function;
	handleDelete: Function;
	handleTagClick: Function;
	handleSelectElement: Function;
	isSelected: Function;
	handleRemoveElement: Function;
}

const ElementCard = ({ element, handleEdit, handleDelete, handleTagClick, handleSelectElement, handleRemoveElement, isSelected }: Props) => {
	const pathName = usePathname();

	return (
		<div className={ isSelected(element) ? "element_card bg-selected-green" : "element_card bg-white/70" } >
			<div className="flex justify-between items-start gap-5">
				<div className="flex-1 flex justify-start items-center gap-4">
					<div className="min-w-[90px] w-[90px] h-[90px] relative">
						<Image
							src={element.media_url}
							alt={element.headline_en}
							className="rounded-[5px] object-cover relative border border-gray-300"
							sizes="15vw"
							fill
						/>
					</div>

					<div className="flex flex-col">
						<h3 className="font-satoshi font-semibold text-gray-900 break-all line-clamp-3 leading-[22px]">
							{element.headline_en}
						</h3>
						<p className="font-noto text-sm text-gray-500">
							{element.start_year < 0 ? Math.abs(element.start_year) + " BCE" : element.start_year + " CE"}{" "}
							{element.end_year ? " - " + (element.end_year < 0 ? Math.abs(element.end_year) + " BCE" : element.end_year + " CE") : ""}
						</p>
					</div>
				</div>
			</div>

			<p className="line-clamp-3 mt-4 mb-2 h-[60px] font-satoshi text-sm text-gray-700">
				{element.text_en}
			</p>

            {/* Tags */}
			{element.tags && (
				<div className="flex gap-3 mb-4">
					{element.tags.map((tag) => (
						<p
							key={tag}
							className="inline-block font-inter text-sm text-cyan-500 cursor-pointer"
							onClick={() =>
								handleTagClick && handleTagClick(tag)
							}
						>
							#{tag}
						</p>
					))}
				</div>
			)}

            {/* Select button */}
			{pathName === "/" && !isSelected(element) && (
				<p
					className="font-inter text-sm select_btn bg-primary-green cursor-pointer"
					onClick={() =>
						handleSelectElement && handleSelectElement(element)
					}
				>
					Select
				</p>
			)}

            {/* Remove button */}
			{pathName === "/" && isSelected(element) && (
				<p
					className="font-inter text-sm select_btn bg-remove-red cursor-pointer"
					onClick={() =>
						handleRemoveElement && handleRemoveElement(element)
					}
				>
					Remove
				</p>
			)}

            {/* Edit/Delete buttons */}
			{pathName === "/edit-element" && (
				<div className="mt-5 flex-center gap-4 border-t border-gray-300 pt-3">
					<p
						className="font-inter text-sm outline_btn cursor-pointer"
						onClick={() => handleEdit(element)}
					>
						Edit
					</p>
					<p
						className="font-inter text-sm text-red-500 cursor-pointer"
						onClick={() => handleDelete(element)}
					>
						Delete
					</p>
				</div>
			)}
		</div>
	);
};

export default ElementCard;
