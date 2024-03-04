"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "@utilities/fetcher";
import { useDebounceSingle, useDebounceDouble } from "@hooks/useDebounce";
import { useCustomParams } from "@hooks/useCustomParams";
import ElementCardList from "@components/ElementCardList";
import { useHandleSearch } from "@hooks/useHandleSearch";

interface Props {
	elements: Array<IElement>;
	setElements: Function;
	handleSelectElement: Function;
}

const Feed = ({ elements, setElements, handleSelectElement }: Props) => {
	const { title, start, end, tag, sort } = useCustomParams();
	const [searchTitle, setSearchTitle] = useState(title);
	const [searchTag, setSearchTag] = useState(tag);
	const [startYear, setStartYear] = useState(start);
	const [endYear, setEndYear] = useState(end);
	const [sortBy, setSortBy] = useState(sort);

	/* Handle Functions */
	const {
		handleSearchTitle,
		handleSearchTag,
        handleTagClick,
		handleSearchStartYear,
		handleSearchEndYear,
		handleSortBy,
	} = useHandleSearch( setSearchTitle, setSearchTag, setStartYear, setEndYear, setSortBy );

	/* Search Title */
	const debouncedTitle = useDebounceSingle(searchTitle, 700);
	const { data: searchedTitleElements } = useSWR(
		() =>
			debouncedTitle
				? `/api/${sortBy}?title=${debouncedTitle}`
				: `/api/${sortBy}`,
		fetcher
	);

	useEffect(() => {
		setElements(searchedTitleElements);
	}, [searchedTitleElements]);

	/* Search Tag */
	const debouncedTag = useDebounceSingle(searchTag, 700);
	const { data: searchedTagElements } = useSWR(
		() =>
			debouncedTag
				? `/api/${sortBy}?tag=${debouncedTag}`
				: `/api/${sortBy}`,
		fetcher
	);

	useEffect(() => {
		setElements(searchedTagElements);
	}, [searchedTagElements]);

	/* Search Year */
	const { debouncedStartYear, debouncedEndYear } = useDebounceDouble( startYear, endYear, 700 );
	const { data: searchedYearElements } = useSWR(
		() =>
			debouncedStartYear || debouncedEndYear
				? `/api/${sortBy}?startYear=${debouncedStartYear}&endYear=${debouncedEndYear}`
				: `/api/${sortBy}`,
		fetcher
	);

	useEffect(() => {
		setElements(searchedYearElements);
	}, [searchedYearElements]);

	return (
		<section className="feed">
			<form className="relative w-full flex-center leading-5">
				<div
					className={
						sortBy != "searchYear"
							? "flex w-full max-w-xl relative"
							: "flex w-full max-w-xl relative justify-center gap-4"
					}
				>
					<div className="select_wrapper">
						<span className="select_arrow"></span>
						<select
							name="searchBy"
							className={
								sortBy != "searchYear"
									? "select-by rounded-md rounded-e-none"
									: "select-by rounded-md"
							}
							value={sortBy}
							onChange={handleSortBy}
						>
							<option className="select_option" value="searchTitle">Title</option>
							<option className="select_option" value="searchTag">Tag</option>
							<option className="select_option" value="searchYear">Year</option>
						</select>
					</div>

					{/* Search Title */}
					{sortBy && sortBy == "searchTitle" && (
						<input
							type="text"
							placeholder="Search for timeline elements"
							value={searchTitle}
							onChange={handleSearchTitle}
							className="search_input"
						/>
					)}

					{/* Search Tag */}
					{sortBy && sortBy == "searchTag" && (
						<input
							type="text"
							placeholder="Search for timeline elements"
							value={searchTag}
							onChange={handleSearchTag}
							className="search_input"
						/>
					)}

					{/* Search Start Year */}
					{sortBy && sortBy == "searchYear" && (
						<input
							type="number"
							placeholder="Start Year"
							value={startYear}
							onChange={handleSearchStartYear}
							className="search_year"
						/>
					)}

					{/* Search End Year */}
					{sortBy && sortBy == "searchYear" && (
						<input
							type="number"
							placeholder="End Year"
							value={endYear}
							onChange={handleSearchEndYear}
							className={
								startYear.length > 0
									? "search_year"
									: "search_year invisible"
							}
						/>
					)}
				</div>
			</form>
			{elements && elements.length > 0 && (
				<ElementCardList
					elements={elements}
					setElements={setElements}
					handleTagClick={handleTagClick}
					handleSelectElement={handleSelectElement}
				/>
			)}
		</section>
	);
};

export default Feed;
