"use client";

import { useEffect, useState } from "react";
import ElementCardList from "@components/ElementCardList";
import useDebounce from "@hooks/useDebounce";

interface Props {
	elements: IElement[];
}

const Feed = ({ elements }: Props) => {
	const [searchText, setSearchText] = useState("");
    const [searchedResults, setSearchedResults] = useState([]);
	const debouncedSearch = useDebounce(searchText, 500);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    }

	useEffect(() => {
		if (debouncedSearch) {
			const fetchData = async () => {
				const response = await fetch(`http://localhost:3000/api/searchTitle?query=${debouncedSearch}`);
				const data = await response.json();
				setSearchedResults(data);
			};

			fetchData();
		}
	}, [debouncedSearch]);

	return (
		<section className="feed">
			<form className="relative w-full flex-center">
				<input
					type="text"
					placeholder="Search for timeline elements"
					value={searchText}
					onChange={handleSearchChange}
					required
					className="search_input peer"
				/>
			</form>

			{searchText ? (
				<ElementCardList elements={searchedResults} />
			) : (
				<ElementCardList elements={elements} />
			)}
		</section>
	);
};

export default Feed;
