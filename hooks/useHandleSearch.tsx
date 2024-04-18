import { useSearchParams } from "next/navigation";

const TITLE_PARAM = "title";
const TAG_PARAM = "tag";
const START_YEAR_PARAM = "startYear";
const END_YEAR_PARAM = "endYear";

export const useHandleSearch = (setSearchTitle, setSearchTag, setStartYear, setEndYear, setSortBy, setIsCollection) => {
	const searchParams = useSearchParams();

	const handleSearchTitle = (e) => {
		const title = e.target.value;
		setSearchTitle(title);
        setIsCollection(false);

		// Shallow search params update
		const updatedSearchParams = new URLSearchParams(searchParams.toString());
		updatedSearchParams.set(TITLE_PARAM, title);
		updatedSearchParams.delete(TAG_PARAM);
		updatedSearchParams.delete(START_YEAR_PARAM);
		updatedSearchParams.delete(END_YEAR_PARAM);

		window.history.pushState(null, "", "?" + updatedSearchParams.toString());
	};

	const handleSearchTag = (e) => {
		const tag = e.target.value;
		setSearchTag(tag);

		// Shallow search params update
		const updatedSearchParams = new URLSearchParams(searchParams.toString());
		updatedSearchParams.set(TAG_PARAM, tag);
		updatedSearchParams.delete(TITLE_PARAM);
		updatedSearchParams.delete(START_YEAR_PARAM);
		updatedSearchParams.delete(END_YEAR_PARAM);

		window.history.pushState(null, "", "?" + updatedSearchParams.toString());
	};

	const handleTagClick = (tag) => {
		setSearchTag(tag);
		setSortBy("searchTag");

		// Shallow search params update
		const updatedSearchParams = new URLSearchParams(searchParams.toString());
		updatedSearchParams.set(TAG_PARAM, tag);
		updatedSearchParams.delete(TITLE_PARAM);
		updatedSearchParams.delete(START_YEAR_PARAM);
		updatedSearchParams.delete(END_YEAR_PARAM);

		window.history.pushState(null, "", "?" + updatedSearchParams.toString());
	};

	const handleSearchStartYear = (e) => {
		const year = e.target.value;
		setStartYear(year);

		// Shallow search params update
		const updatedSearchParams = new URLSearchParams(searchParams.toString());
		updatedSearchParams.set(START_YEAR_PARAM, year);
		updatedSearchParams.delete(TITLE_PARAM);
		updatedSearchParams.delete(TAG_PARAM);

		window.history.pushState(null, "", "?" + updatedSearchParams.toString());
	};

	const handleSearchEndYear = (e) => {
		const year = e.target.value;
		setEndYear(year);

		// Shallow search params update
		const updatedSearchParams = new URLSearchParams(searchParams.toString());
		updatedSearchParams.set(END_YEAR_PARAM, year);
		updatedSearchParams.delete(TITLE_PARAM);
		updatedSearchParams.delete(TAG_PARAM);

		window.history.pushState(null, "", "?" + updatedSearchParams.toString());
	};

	const handleSortBy = (e) => {
		setSortBy(e.target.value);
		setSearchTitle("");
		setSearchTag("");
		setStartYear("");
		setEndYear("");
        setIsCollection(false);

		// Shallow search params update
		const updatedSearchParams = new URLSearchParams(searchParams.toString());
		updatedSearchParams.delete(TITLE_PARAM);
		updatedSearchParams.delete(TAG_PARAM);
		updatedSearchParams.delete(START_YEAR_PARAM);
		updatedSearchParams.delete(END_YEAR_PARAM);

		window.history.pushState(null, "", "?" + updatedSearchParams.toString());
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
