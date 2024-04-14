"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";

interface Props {
	collection: IElementCollection;
	handleEdit: Function;
	handleDelete: Function;
}

const ElementCollectionCard = ({ collection, handleEdit, handleDelete }: Props) => {
    const pathName = usePathname();

	return (
		<div className="element_card bg-white/70">
			<div className="flex justify-between items-start gap-5">
				<div className="flex-1 flex justify-start items-center gap-4">
					<div className="min-w-[90px] w-[90px] h-[90px] relative">
						<Image
							src={collection.img_url}
							alt={collection.title_en}
							className="rounded-[5px] object-cover relative border border-gray-300"
							sizes="15vw"
							fill
						/>
					</div>

					<div className="flex flex-col">
						<h3 className="font-satoshi font-semibold text-gray-900 break-all line-clamp-3 leading-[22px]">
							{collection.title_en}
						</h3>
					</div>
				</div>
			</div>

			{/* Edit/Delete buttons */}
			{pathName === "/edit-elementCollection" && (
				<div className="mt-5 flex-center gap-4 border-t border-gray-300 pt-3">
					<p className="font-inter yellow_btn cursor-pointer" onClick={() => handleEdit(collection)}>
						Edit
					</p>
					<p className="font-inter text-sm text-red-500 cursor-pointer" onClick={() => handleDelete(collection)}>
						Delete
					</p>
				</div>
			)}
		</div>
	);
};
export default ElementCollectionCard;
