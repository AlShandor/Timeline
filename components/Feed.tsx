"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ElementCardList from "@components/ElementCardList";

interface Props {
	setHomepageElements: Function;
}

const Feed = ({ setHomepageElements }: Props) => {
	const pathName = usePathname();
	const [elements, setElements] = useState<IElement[]>([]);

	// Search states
	const [searchText, setSearchText] = useState<string | null>("");
	const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | number | null>(null);
	const [searchedResults, setSearchedResults] = useState<IElement[]>([]);

	const fetchElements = async () => {
		const response = await fetch("/api/element");
		const data = await response.json();

		setElements(data);
		if (pathName === "/") {
			setHomepageElements(data);
		}
	};

	useEffect(() => {
		fetchElements();
	}, []);

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

    function updateElements(elementsList) {
		setElements(elementsList);
        if (pathName === "/") {
			setHomepageElements(elementsList);
		}
	}

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
				<ElementCardList
					elements={searchedResults}
					updateElements={updateElements}
				/>
			) : (
				<ElementCardList
					elements={elements}
					updateElements={updateElements}
				/>
			)}
		</section>
	);
};

export default Feed;
