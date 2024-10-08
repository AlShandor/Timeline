import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import Image from "next/image";

import localFont from "next/font/local";

const myFont = localFont({ src: "../public/fonts/Handlee-Regular.ttf" });

interface Props {
	collection: IElementCollection;
	handleEdit: Function;
	handleDelete: Function;
	handleView: Function;
}

const ElementCollectionCard = ({ collection, handleEdit, handleDelete, handleView }: Props) => {
	const pathName = usePathname();
    const t = useTranslations("elementCollectionCard");
	const locale = useLocale();
	const title = locale === "en" ? collection.title_en : collection.title_bg;

	return (
		<div className="element_card bg-white/70">
			<h2 className={`${myFont.className} collection-header`}>{t("collection")}</h2>
			<div className="flex justify-between items-start gap-5">
				<div className="flex-1 flex justify-start items-center gap-4">
					<div className="min-w-[90px] w-[90px] h-[90px] relative">
						<Image
							src={collection.img_url}
							alt={title}
							className="rounded-[5px] object-cover relative border border-gray-300"
							sizes="15vw"
							fill
						/>
					</div>

					<div className="w-full flex flex-col">
						<h3 className="font-noto font-semibold text-center text-gray-900 line-clamp-3 leading-[22px]">
							{title}
						</h3>
					</div>
				</div>
			</div>
			{/* Edit/Delete buttons */}
			{pathName.includes("/edit-elementCollection") && (
				<div className="mt-5 flex-center gap-4 border-t border-gray-300 pt-3">
					<p className="font-inter yellow_btn cursor-pointer" onClick={() => handleEdit(collection)}>
						{t("edit")}
					</p>
					<p className="font-inter text-sm text-red-500 cursor-pointer" onClick={() => handleDelete(collection)}>
						{t("delete")}
					</p>
				</div>
			)}
			{!pathName.includes("/edit-elementCollection") && (
				<div className="mt-5 flex-center gap-4 border-t border-gray-300 pt-3">
					<p
						className="font-inter text-sm select_btn bg-primary-green cursor-pointer"
						onClick={() => handleView(collection)}
					>
						{t("view")}
					</p>
				</div>
			)}
		</div>
	);
};
export default ElementCollectionCard;
