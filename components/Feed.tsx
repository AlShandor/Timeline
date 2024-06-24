"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useSWRInfinite from "swr/infinite";
import fetcher from "@utilities/fetcher";
import { useInView } from "react-intersection-observer";
import { useDebounceSingle, useDebounceDouble } from "@hooks/useDebounce";
import { useCustomParams } from "@hooks/useCustomParams";
import { useHandleSearch } from "@hooks/useHandleSearch";
import ElementCardList from "@components/ElementCardList";
import CollectionCardList from "./CollectionCardList";
import ElementChip from "@components/ElementChip";
import Loader from "./Loader";
import { useHandleSearchCollection } from "@hooks/useHandleSearchCollection";
import localFont from "next/font/local";
import { useTranslations } from "next-intl";

const myFont = localFont({ src: "../public/fonts/Handlee-Regular.ttf" });

interface Props {
	elements;
	setElements: Function;
	elementCollections: Array<IElementCollection>;
	setElementCollections: Function;
	handleSelectElement: Function;
	handleSelectAllElements: Function;
	handleRemoveElement: Function;
	handleRemoveAllElements: Function;
	selected: Array<IElement>;
	isSelected: Function;
}

const PAGE_SIZE = 9;
const PAGE_SIZE_COLLECTION = 12;

const Feed = ({
	elements,
	setElements,
    elementCollections,
    setElementCollections,
	handleSelectElement,
	handleSelectAllElements,
	handleRemoveElement,
	handleRemoveAllElements,
	selected,
	isSelected,
}: Props) => {
	const pathName = usePathname();
	const { title, start, end, tag, sort } = useCustomParams();
	const { ref, inView } = useInView();
	const t = useTranslations("feed");

	const [searchTitle, setSearchTitle] = useState(title);
	const [searchCollectionTitle, setSearchCollectionTitle] = useState(title);
	const [searchTag, setSearchTag] = useState(tag);
	const [startYear, setStartYear] = useState(start);
	const [endYear, setEndYear] = useState(end);
	const [sortBy, setSortBy] = useState(sort);

	const [isCollection, setIsCollection] = useState(false);
	const [selectedCollectionTitle, setSelectedCollectionTitle] = useState("");

	/* Handle Functions */
	const { handleSearchCollectionTitle } = useHandleSearchCollection(setSearchCollectionTitle);
	const { handleSearchTitle, handleSearchTag, handleTagClick, handleSearchStartYear, handleSearchEndYear, handleSortBy } =
		useHandleSearch(setSearchTitle, setSearchTag, setStartYear, setEndYear, setSortBy, setIsCollection);

	const debouncedTitle = useDebounceSingle(searchTitle, 700);
	const debouncedTag = useDebounceSingle(searchTag, 700);
	const { debouncedStartYear, debouncedEndYear } = useDebounceDouble(startYear, endYear, 700);
	const debouncedCollectionTitle = useDebounceSingle(searchCollectionTitle, 700);

	// Infinite scroll
	const {
		data: searchedElements,
		size,
		setSize,
		isLoading,
	} = useSWRInfinite((index) => {
		if (sortBy == "searchCollection" && debouncedCollectionTitle) {
			return `/api/element-collection?title=${debouncedCollectionTitle}&page=${index + 1}&size=${PAGE_SIZE_COLLECTION}`;
		}

		if (sortBy == "searchCollection") {
			return `/api/element-collection?page=${index + 1}&size=${PAGE_SIZE_COLLECTION}`;
		}

		// Search Title
		if (sortBy == "searchTitle" && debouncedTitle) {
			return `/api/${sortBy}?title=${debouncedTitle}&page=${index + 1}&size=${PAGE_SIZE}`;
		}

		// Search Tag
		if (sortBy == "searchTag" && debouncedTag) {
			return `/api/${sortBy}?tag=${debouncedTag}&page=${index + 1}&size=${PAGE_SIZE}`;
		}

		// Search Year
		if (sortBy == "searchYear" && debouncedStartYear && debouncedEndYear) {
			return `/api/${sortBy}?startYear=${debouncedStartYear}&endYear=${debouncedEndYear}&page=${ index + 1 }&size=${PAGE_SIZE}`;
		}

		if (sortBy == "searchYear" && debouncedStartYear) {
			return `/api/${sortBy}?startYear=${debouncedStartYear}&page=${index + 1}&size=${PAGE_SIZE}`;
		}

		return `/api/${sortBy}?page=${index + 1}&size=${PAGE_SIZE}`;
	}, fetcher);

	const isEmpty = searchedElements?.[0]?.length === 0;
	const isReachingEnd =
		isEmpty ||
		(sortBy !== "searchCollection" &&
			searchedElements &&
			searchedElements[searchedElements.length - 1]?.length < PAGE_SIZE) ||
		(sortBy === "searchCollection" &&
			searchedElements &&
			searchedElements[searchedElements.length - 1]?.length < PAGE_SIZE_COLLECTION);

    const handleView = async (collection) => {     
        try {
            fetch(`/api/element-collection/${collection._id}`)
            .then((res) => res.json())
            .then((data) => {
                setElements(data.elements);
                setSelectedCollectionTitle(data.title_en);
            });
        } catch (error) {
            console.log(error);
        }

        setIsCollection(true);
        setSortBy("searchTitle");
	};

	// activate infinite scroll when Loader is in view
	useEffect(() => {
		if (inView && !isLoading && !isCollection) {
			setSize(size + 1);
		}
	}, [inView]);

	// infinite scroll adds new batch of elements
	useEffect(() => {
		const allElements = searchedElements ? [].concat(...searchedElements) : [];
		if (sortBy != "searchCollection") {
			setElements(allElements);
		} else {
			setElementCollections(allElements);
		}
	}, [searchedElements]);

	return (
		<section className="feed">
			<form className="relative w-full flex-center leading-5 mb-16 px-6">
				<div
					className={
						sortBy != "searchYear"
							? "flex w-full max-w-xl relative"
							: "flex w-full max-w-xl relative justify-center gap-4"
					}
				>
					<div className={sortBy == "searchCollection" ? "select_wrapper_collection" : "select_wrapper"}>
						<span className="select_arrow"></span>
						<select
							name="searchBy"
							className={sortBy != "searchYear" ? "select-by rounded-md rounded-e-none" : "select-by rounded-md"}
							value={sortBy}
							onChange={handleSortBy}
						>
							{pathName.includes("/edit-elementCollection") ? (
								<option className="select_option" value="searchCollection">
									{t("collection")}
								</option>
							) : (
								<>
									<option className="select_option" value="searchTitle">
										{t("title")}
									</option>
									<option className="select_option" value="searchTag">
										{t("tag")}
									</option>
									<option className="select_option" value="searchYear">
										{t("year")}
									</option>
									<option className="select_option" value="searchCollection">
										{t("collection")}
									</option>
								</>
							)}
						</select>
					</div>

					{/* Search Title */}
					{sortBy && sortBy == "searchTitle" && (
						<input
							type="text"
							placeholder={t("placeholder")}
							value={searchTitle}
							onChange={handleSearchTitle}
							className="search_input"
						/>
					)}

					{/* Search Tag */}
					{sortBy && sortBy == "searchTag" && (
						<input
							type="text"
							placeholder={t("placeholder")}
							value={searchTag}
							onChange={handleSearchTag}
							className="search_input"
						/>
					)}

					{/* Search Start Year */}
					{sortBy && sortBy == "searchYear" && (
						<input
							type="number"
							placeholder={t("start-year")}
							value={startYear}
							onChange={handleSearchStartYear}
							className="search_year"
						/>
					)}

					{/* Search End Year */}
					{sortBy && sortBy == "searchYear" && (
						<input
							type="number"
							placeholder={t("end-year")}
							value={endYear}
							onChange={handleSearchEndYear}
							className={startYear.length > 0 ? "search_year" : "search_year invisible"}
						/>
					)}

					{/* Search Collection */}
					{sortBy && sortBy == "searchCollection" && (
						<input
							type="text"
							placeholder={t("placeholderCollection")}
							value={searchCollectionTitle}
							onChange={handleSearchCollectionTitle}
							className="search_input"
						/>
					)}
				</div>
			</form>

			{!pathName.includes("/edit-element") && (
				<p
					className="font-inter text-sm select_btn bg-primary-green cursor-pointer mx-auto mb-4"
					onClick={() => handleSelectAllElements()}
				>
					{t("select-all")}
				</p>
			)}

			{isCollection && (
				<div className="flex flex-col min-w-[300px]">
					<h2 className={`${myFont.className} collection-header max-w-[300px] mx-auto`}>{t("collection")}</h2>
					<p className="text-xl font-semibold mb-5 leading-[1.15] text-[#1b1b1b] text-center">
						{selectedCollectionTitle}
					</p>
				</div>
			)}

			<div className="flex flex-col sm:flex-row">
				{sortBy == "searchCollection" ? (
					elementCollections && elementCollections.length > 0 ? (
						<CollectionCardList
							elementCollections={elementCollections}
							setElementCollections={setElementCollections}
							handleView={handleView}
						/>
					) : (
						<div className="w-[1130px]"></div>
					)
				) : elements && elements.length > 0 ? (
					<ElementCardList
						elements={elements}
						setElements={setElements}
						handleTagClick={handleTagClick}
						handleSelectElement={handleSelectElement}
						handleRemoveElement={handleRemoveElement}
						isSelected={isSelected}
					/>
				) : (
					<div className="w-[1130px]"></div>
				)}

				{!pathName.includes("/edit-element") && !pathName.includes("/edit-elementCollection") && (
					<div className="mx-auto sm:ml-4 h-auto w-full sm:w-[115px] lg:w-[200px] order-1 sm:order-2">
						<div className="sticky top-0 flex flex-col">
							<p className="font-noto text-xl text-center border-b border-gray-300 pb-1 mb-4 font-semibold text-gray-600">
								{t("selected-elements")}
							</p>
							{selected && selected.length > 0 && (
								<p
									className="font-inter text-sm select_btn bg-remove-red cursor-pointer mx-auto mb-4"
									onClick={() => handleRemoveAllElements()}
								>
									{t("remove-all")}
								</p>
							)}
							{selected &&
								selected.length > 0 &&
								selected
									.sort((a, b) => a.start_year - b.start_year)
									.map((el) => (
										<ElementChip key={el._id} element={el} handleRemoveElement={handleRemoveElement} />
									))}
						</div>
					</div>
				)}
			</div>

			{(!isReachingEnd && !isCollection) ? (
				<div ref={ref} className="mt-10">
					<Loader />
				</div>
			) : (
				<div className="font-noto font-medium text-gray-900 my-8 mx-auto">{t("no-results")}</div>
			)}
		</section>
	);
};

export default Feed;
