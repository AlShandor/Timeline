"use client";

import { useState } from "react";
import ElementCardList from "@components/ElementCardList";

interface Props {
	elements: IElement[];
}

const Feed = ({ elements }: Props) => {
	// Search states
	const [searchText, setSearchText] = useState<string | null>("");
	const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | number | null>(null);
	const [searchedResults, setSearchedResults] = useState<IElement[]>([]);

	const filterElements = (searchtext) => {
		const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
		return elements.filter((item) => regex.test(item.headline_en));
	};

	const handleSearchChange = (e) => {
		clearTimeout(searchTimeout);
		setSearchText(e.target.value);

		// debounce method
		setSearchTimeout(
			setTimeout(() => {
				const searchResult = filterElements(e.target.value);
				setSearchedResults(searchResult);
			}, 500)
		);
	};

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
