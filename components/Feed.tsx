"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import fetcher from "@utilities/fetcher";
import { useDebounceSingle, useDebounceDouble } from "@hooks/useDebounce";
import ElementCardList from "@components/ElementCardList";

interface Props {
	elements: Array<IElement>;
	setElements: Function;
	title: string;
	start: string;
	end: string;
    sort: string
}

const Feed = ({ elements, setElements, title, start, end, sort }: Props) => {
	const searchParams = useSearchParams();
	const [sortBy, setSortBy] = useState(sort);

	/* Search Title */
	const [searchTitle, setSearchTitle] = useState(title);
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
	const [startYear, setStartYear] = useState(start);
	const [endYear, setEndYear] = useState(end);
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

	/* Handle Functions */
	const handleSearchChange = (e) => {
		const title = e.target.value;
		setSearchTitle(title);

		// Shallow search params update
		const updatedSearchParams = new URLSearchParams(
			searchParams.toString()
		);
		updatedSearchParams.set("title", title);
		updatedSearchParams.delete("startYear");
		updatedSearchParams.delete("endYear");

		window.history.pushState( null, "", "?" + updatedSearchParams.toString() );
	};

	const handleSearchStartYear = (e) => {
		const year = e.target.value;
		setStartYear(year);

		// Shallow search params update
		const updatedSearchParams = new URLSearchParams(
			searchParams.toString()
		);
		updatedSearchParams.set("startYear", year);
		updatedSearchParams.delete("title");

		window.history.pushState( null, "", "?" + updatedSearchParams.toString() );
	};

	const handleSearchEndYear = (e) => {
		const year = e.target.value;
		setEndYear(year);

		// Shallow search params update
		const updatedSearchParams = new URLSearchParams(
			searchParams.toString()
		);
		updatedSearchParams.set("endYear", year);
		updatedSearchParams.delete("title");

		window.history.pushState( null, "", "?" + updatedSearchParams.toString() );
	};

	const handleSortBy = (e) => {
		setSortBy(e.target.value);
		setSearchTitle("");
		setStartYear("");
		setEndYear("");

		// Shallow search params update
		const updatedSearchParams = new URLSearchParams(
			searchParams.toString()
		);
		updatedSearchParams.delete("title");
		updatedSearchParams.delete("startYear");
		updatedSearchParams.delete("endYear");

		window.history.pushState( null, "", "?" + updatedSearchParams.toString() );
	};

	return (
		<section className="feed">
			<form className="relative w-full flex-center leading-5">
				<div
					className={
						sortBy != "searchYear"
							? "flex w-full max-w-xl"
							: "flex w-full max-w-xl justify-center gap-4"
					}
				>
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
						<option value="searchTitle">Title</option>
						<option value="searchTag">Tag</option>
						<option value="searchYear">Year</option>
					</select>

					{/* Search Text */}
					{sortBy && sortBy != "searchYear" && (
						<input
							type="text"
							placeholder="Search for timeline elements"
							value={searchTitle}
							onChange={handleSearchChange}
							className="search_input"
						/>
					)}

					{/* Search Star Year */}
					{sortBy && sortBy == "searchYear" && (
						<input
							type="text"
							placeholder="Start Year"
							value={startYear}
							onChange={handleSearchStartYear}
							className="search_year"
						/>
					)}

					{/* Search End Year */}
					{sortBy && sortBy == "searchYear" && (
						<input
							type="text"
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
