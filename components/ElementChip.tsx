interface Props {
	element: IElement;
	handleRemoveElement: Function;
}

const ElementChip = ({ element, handleRemoveElement }: Props) => {
	return (
		<div className="relative max-w-fit min-w-min inline-flex items-center justify-between box-border whitespace-nowrap px-1 mb-2 h-8 text-small rounded-full bg-[#D4D4D8] text-gray-700">
			<span className="flex-1 pr-1 px-2 text-base overflow-hidden pointer-events-none text-ellipsis max-w-[200px]">{element.headline_en}</span>
			<span
				role="button"
				onClick={() => handleRemoveElement && handleRemoveElement(element)}
				className="z-10 flex justify-center items-center w-6 h-6 appearance-none outline-none select-none transition-opacity opacity-70 hover:opacity-100 cursor-pointer active:opacity-disabled tap-highlight-transparent text-large"
			>
				<svg aria-hidden="true" focusable="false" height="1em" role="presentation" viewBox="0 0 24 24" width="1em">
					<path
						d="M12 2a10 10 0 1010 10A10.016 10.016 0 0012 2zm3.36 12.3a.754.754 0 010 1.06.748.748 0 01-1.06 0l-2.3-2.3-2.3 2.3a.748.748 0 01-1.06 0 .754.754 0 010-1.06l2.3-2.3-2.3-2.3A.75.75 0 019.7 8.64l2.3 2.3 2.3-2.3a.75.75 0 011.06 1.06l-2.3 2.3z"
						fill="currentColor"
					></path>
				</svg>
			</span>
		</div>
	);
};
export default ElementChip;
