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

	// search
	const [searchText, setSearchText] = useState(query);
	const debouncedSearch = useDebounce(searchText, 500);
	const { data: searchedResults } = useSWR(
		() => debouncedSearch
				? `/api/searchTitle?query=${debouncedSearch}`
				: `/api/searchTitle?query=`,
		fetcher
	);

	useEffect(() => {
		setElements(searchedResults);
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

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for timeline elements"
					defaultValue={searchParams.get("query")?.toString()}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
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
