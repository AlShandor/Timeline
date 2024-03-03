import { useSearchParams } from "next/navigation";

const titleParam = "title";
const tagParam = "tag";
const startYearParam = "startYear";
const endYearParam = "endYear";

export const useHandleSearch = (
	setSearchTitle,
    setSearchTag,
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
		updatedSearchParams.set(titleParam, title);
		updatedSearchParams.delete(tagParam);
		updatedSearchParams.delete(startYearParam);
		updatedSearchParams.delete(endYearParam);

		window.history.pushState( null, "", "?" + updatedSearchParams.toString() );
	};

    const handleSearchTag = (e) => {
		const tag = e.target.value;
		setSearchTag(tag);

		// Shallow search params update
		const updatedSearchParams = new URLSearchParams(
			searchParams.toString()
		);
		updatedSearchParams.set(tagParam, tag);
		updatedSearchParams.delete(titleParam);
		updatedSearchParams.delete(startYearParam);
		updatedSearchParams.delete(endYearParam);

		window.history.pushState( null, "", "?" + updatedSearchParams.toString() );
	};

    const handleTagClick = (tag) => {
		setSearchTag(tag);
        setSortBy("searchTag");

		// Shallow search params update
		const updatedSearchParams = new URLSearchParams(
			searchParams.toString()
		);
		updatedSearchParams.set(tagParam, tag);
		updatedSearchParams.delete(titleParam);
		updatedSearchParams.delete(startYearParam);
		updatedSearchParams.delete(endYearParam);

		window.history.pushState( null, "", "?" + updatedSearchParams.toString() );
	};

	const handleSearchStartYear = (e) => {
		const year = e.target.value;
		setStartYear(year);

		// Shallow search params update
		const updatedSearchParams = new URLSearchParams(
			searchParams.toString()
		);
		updatedSearchParams.set(startYearParam, year);
		updatedSearchParams.delete(titleParam);
		updatedSearchParams.delete(tagParam);

		window.history.pushState( null, "", "?" + updatedSearchParams.toString() );
	};

	const handleSearchEndYear = (e) => {
		const year = e.target.value;
		setEndYear(year);

		// Shallow search params update
		const updatedSearchParams = new URLSearchParams(
			searchParams.toString()
		);
		updatedSearchParams.set(endYearParam, year);
		updatedSearchParams.delete(titleParam);
		updatedSearchParams.delete(tagParam);

		window.history.pushState( null, "", "?" + updatedSearchParams.toString() );
	};

	const handleSortBy = (e) => {
		setSortBy(e.target.value);
		setSearchTitle("");
        setSearchTag("");
		setStartYear("");
		setEndYear("");

		// Shallow search params update
		const updatedSearchParams = new URLSearchParams(
			searchParams.toString()
		);
		updatedSearchParams.delete(titleParam);
		updatedSearchParams.delete(tagParam);
		updatedSearchParams.delete(startYearParam);
		updatedSearchParams.delete(endYearParam);

		window.history.pushState( null, "", "?" + updatedSearchParams.toString() );
	};

	return {
		handleSearchTitle,
        handleSearchTag, 
        handleTagClick,
		handleSearchStartYear,
		handleSearchEndYear,
		handleSortBy,
	};
};
