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
}

const Feed = ({ elements, setElements }: Props) => {
    const { title, start, end, sort } = useCustomParams();
	const [searchTitle, setSearchTitle] = useState(title);
    const [startYear, setStartYear] = useState(start);
	const [endYear, setEndYear] = useState(end);
	const [sortBy, setSortBy] = useState(sort); 

    /* Handle Functions */
    const {
		handleSearchTitle,
		handleSearchStartYear,
		handleSearchEndYear,
		handleSortBy,
	} = useHandleSearch(setSearchTitle, setStartYear, setEndYear, setSortBy);

	/* Search Title */
	const debouncedTitle = useDebounceSingle(searchTitle, 700);
	const { data: searchedResults } = useSWR(
		() =>
			debouncedTitle
				? `/api/${sortBy}?title=${debouncedTitle}`
				: `/api/${sortBy}`,
		fetcher
	);

	useEffect(() => {
		setElements(searchedResults);
	}, [searchedResults]);

	/* Search Year */
	const { debouncedStartYear, debouncedEndYear } = useDebounceDouble( startYear, endYear, 700 );
	const { data: searchedResultsStartYear } = useSWR(
		() =>
			debouncedStartYear || debouncedEndYear
				? `/api/${sortBy}?startYear=${debouncedStartYear}&endYear=${debouncedEndYear}`
				: `/api/${sortBy}`,
		fetcher
	);

	useEffect(() => {
		setElements(searchedResultsStartYear);
	}, [searchedResultsStartYear]);

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
					{sortBy && sortBy != "searchYear" && (
						<input
							type="text"
							placeholder="Search for timeline elements"
							value={searchTitle}
							onChange={handleSearchTitle}
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
				/>
			)}
		</section>
	);
};

export default Feed;
