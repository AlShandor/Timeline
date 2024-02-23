"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import fetcher from "@utilities/fetcher";
import useDebounce from "@hooks/useDebounce";
import ElementCardList from "@components/ElementCardList";

interface Props {
	elements: Array<IElement>;
    setElements: Function;
    query: string
}

const Feed = ( { elements, setElements, query }: Props) => {
	const searchParams = useSearchParams();
    const [sortBy, setSortBy] = useState("searchTitle");

	// search
	const [searchText, setSearchText] = useState(query);
	const [startYear, setStartYear] = useState(query);
	const [endYear, setEndYear] = useState(query);
	const debouncedSearch = useDebounce(searchText, 500);
	const { data: searchedResults } = useSWR(
		() =>
			debouncedSearch
				? `/api/${sortBy}?query=${debouncedSearch}`
				: `/api/${sortBy}`,
		fetcher
	);

	useEffect(() => {
		setElements(searchedResults);
        console.log(searchedResults);
        
	}, [searchedResults]);

	const handleSearchChange = (e) => {
		const query = e.target.value;
		setSearchText(query);

		// Shallow search params update
		const updatedSearchParams = new URLSearchParams(
			searchParams.toString()
		);
		updatedSearchParams.set("query", query);
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
        updatedSearchParams.delete("query");

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
		updatedSearchParams.delete("query");

		window.history.pushState( null, "", "?" + updatedSearchParams.toString() );
	};

    const handleSortBy = (e) => {
		setSortBy(e.target.value);
        setSearchText("");
        setStartYear("");
        setEndYear("");
    }

	return (
		<section className="feed">
			<form className="relative w-full flex-center leading-5">
				<div
					className={ sortBy != "searchYear" ? "flex w-full max-w-xl" : "flex w-full max-w-xl justify-center gap-4" }
				>
					<select
						name="searchBy"
						className={ sortBy != "searchYear" ? "select-by rounded-md rounded-e-none" : "select-by rounded-md" }
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
							value={searchText}
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
							className={ startYear.length > 0 ? "search_year" : "search_year invisible" }
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
