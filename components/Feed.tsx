"use client";

import { useState } from "react";
import ElementCardList from "@components/ElementCardList";
import useDebounce from "@hooks/useDebounce";
import fetcher from "@utilities/fetcher";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";

interface Props {
	elements: IElement[];
	queryParam: string;
}

const Feed = ({ elements, queryParam }: Props) => {
    // router
	const searchParams = useSearchParams();
    const initialQuery = queryParam ? queryParam : "";

    // search
	const [searchText, setSearchText] = useState(initialQuery);
	const debouncedSearch = useDebounce(searchText, 500);
	const { data: searchedResults } = useSWR(() => 
        debouncedSearch ? `/api/searchTitle?query=${debouncedSearch}` : null,
		fetcher
	);

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

			{searchText ? (
				searchedResults && searchedResults.length > 0 && (
					<ElementCardList elements={searchedResults} />
				)
			) : (
				<ElementCardList elements={elements} />
			)}
		</section>
	);
};

export default Feed;
