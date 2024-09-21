import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
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

const ElementCard = ({
	element,
	handleEdit,
	handleDelete,
	handleTagClick,
	handleSelectElement,
	handleRemoveElement,
	isSelected,
}: Props) => {
	const pathName = usePathname();
	const t = useTranslations("elementCard");
	const locale = useLocale();
	const headline = locale === "en" ? element.headline_en : element.headline_bg;
	const text = locale === "en" ? element.text_en.replace(/<\/br>|<i>|<\/i>|<\/a>|<a.+\">/g, '') : element.text_bg.replace(/<\/br>|<i>|<\/i>|<\/a>|<a.+\">/g, '');
	const displayDate = locale === "en" ? element.display_date_en : element.display_date_bg;

	return (
		<div className={isSelected(element) ? "element_card bg-selected-green" : "element_card bg-white/70"}>
			<div className="flex justify-between items-start gap-5">
				<div className="flex-1 flex justify-start items-center gap-4">
					<div className="min-w-[90px] w-[90px] h-[90px] relative">
						<Image
							src={element.media_url}
							alt={headline}
							className="rounded-[5px] object-cover relative border border-gray-300"
							sizes="15vw"
							fill
						/>
					</div>

					<div className="flex flex-col">
						<h3 className="font-noto font-semibold text-gray-900 line-clamp-3 leading-[22px]">
							{headline}
						</h3>
						<p className="font-noto text-sm text-gray-500">
							{displayDate
								? displayDate
								: (element.start_year < 0
										? Math.abs(element.start_year) + t("bce")
										: element.start_year + t("ce")) +
								  " " +
								  (element.end_year
										? " - " +
										  (element.end_year < 0
												? Math.abs(element.end_year) + t("bce")
												: element.end_year + t("ce"))
										: "")}
						</p>
					</div>
				</div>
			</div>

			<p className="line-clamp-3 mt-4 mb-2 h-[60px] font-noto text-sm text-gray-700">{text}</p>

			{/* Tags */}
			{element.tags && (
				<div className="flex gap-1 mb-4 min-h-[28px]">
					{element.tags.map((tag) => (
						<p
							key={tag}
							className="inline-block font-inter p-1 text-sm text-cyan-500 cursor-pointer"
							onClick={() => handleTagClick && handleTagClick(tag)}
						>
							#{tag}
						</p>
					))}
				</div>
			)}

			{/* Select/Remove buttons */}
			{!pathName.includes("/edit-element") &&
				(!isSelected(element) ? (
					<div className="border-t border-gray-300 pt-3">
						<p
							className="font-inter text-sm select_btn bg-primary-green cursor-pointer"
							onClick={() => handleSelectElement && handleSelectElement(element)}
						>
							{t("select")}
						</p>
					</div>
				) : (
					<div className="border-t border-gray-300 pt-3">
						<p
							className="font-inter text-sm select_btn bg-remove-red cursor-pointer"
							onClick={() => handleRemoveElement && handleRemoveElement(element)}
						>
							{t("remove")}
						</p>
					</div>
				))}

			{/* Edit/Delete buttons */}
			{pathName.includes("/edit-element") && (
				<div className="mt-5 flex-center gap-4 border-t border-gray-300 pt-3">
					<p className="font-inter yellow_btn cursor-pointer" onClick={() => handleEdit(element)}>
						{t("edit")}
					</p>
					<p className="font-inter text-sm text-red-500 cursor-pointer" onClick={() => handleDelete(element)}>
						{t("delete")}
					</p>
				</div>
			)}
		</div>
	);
};

export default ElementCard;
