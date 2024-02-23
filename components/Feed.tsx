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

		window.history.pushState( null, "", "?" + updatedSearchParams.toString() );
	};

    const handleSortBy = (e) => {
		setSortBy(e.target.value);
        setSearchText("");
    }

	return (
		<section className="feed">
			<form className="relative w-full flex-center leading-5">
				<div className="flex w-full max-w-xl">
					<select
						name="searchBy"
						className="select-by"
						value={sortBy}
						onChange={handleSortBy}
					>
						<option value="searchTitle">Title</option>
						<option value="searchTag">Tag</option>
						<option value="searchYear">Year</option>
					</select>
					<input
						type="text"
						placeholder="Search for timeline elements"
						value={searchText}
						onChange={handleSearchChange}
						required
						className="search_input peer"
					/>
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
