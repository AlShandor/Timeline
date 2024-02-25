import { useSearchParams } from "next/navigation";

export const useHandleSearch = (
	setSearchTitle,
	setStartYear,
	setEndYear,
	setSortBy
) => {
	const searchParams = useSearchParams();

	const handleSearchTitle = (e) => {
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

	return {
		handleSearchTitle,
		handleSearchStartYear,
		handleSearchEndYear,
		handleSortBy,
	};
};
