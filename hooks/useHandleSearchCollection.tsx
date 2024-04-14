import { useSearchParams } from "next/navigation";

export const useHandleSearchCollection = (setSearchCollectionTitle) => {
	const searchParams = useSearchParams();

	const handleSearchCollectionTitle = (e) => {
		const title = e.target.value;
		setSearchCollectionTitle(title);

		// Shallow search params update
		const updatedSearchParams = new URLSearchParams(searchParams.toString());
		updatedSearchParams.set("title", title);

		window.history.pushState(null, "", "?" + updatedSearchParams.toString());
	};

	return {
		handleSearchCollectionTitle,
	};
};
