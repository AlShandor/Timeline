"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCustomParams } from "@hooks/useCustomParams";
import useSWRInfinite from "swr/infinite";
import fetcher from "@utilities/fetcher";
import { useInView } from "react-intersection-observer";
import { useDebounceSingle } from "@hooks/useDebounce";
import { useHandleSearchCollection } from "@hooks/useHandleSearchCollection";

import CollectionCardList from "@components/CollectionCardList";
import Loader from "./Loader";

const PAGE_SIZE = 12;

const FeedCollections = ({ elementCollections, setElementCollections }) => {
	const pathName = usePathname();
	const { title } = useCustomParams();
	const { ref, inView } = useInView();

	const [searchCollectionTitle, setSearchCollectionTitle] = useState(title);
	const { handleSearchCollectionTitle } = useHandleSearchCollection(setSearchCollectionTitle);
	const debouncedCollectionTitle = useDebounceSingle(searchCollectionTitle, 700);

	// Infinite scroll
	const {
		data: searchedCollections,
		size,
		setSize,
		isLoading,
	} = useSWRInfinite((index) => {
		if (debouncedCollectionTitle) {
			return `/api/element-collection?title=${debouncedCollectionTitle}&page=${index + 1}&size=${PAGE_SIZE}`;
		}

		return `/api/element-collection?page=${index + 1}&size=${PAGE_SIZE}`;
	}, fetcher);

	const isEmpty = searchedCollections?.[0]?.length === 0;
	const isEnd = isEmpty || (searchedCollections && searchedCollections[searchedCollections.length - 1]?.length < PAGE_SIZE);

	// activate infinite scroll when Loader is in view
	useEffect(() => {
		if (inView && !isLoading) {
			setSize(size + 1);
		}
	}, [inView]);

	// infinite scroll adds new batch of elements
	useEffect(() => {
		const allCollections = searchedCollections ? [].concat(...searchedCollections) : [];
		setElementCollections(allCollections);
	}, [searchedCollections]);

	return (
		<section className="feed">
			<form className="relative w-full flex-center leading-5 mb-16">
				<div className="w-full max-w-xl relative">
					<input
						type="text"
						placeholder="Search for timeline elements"
						value={searchCollectionTitle}
						onChange={handleSearchCollectionTitle}
						className="search_input"
					/>
				</div>
			</form>

			<div className="flex flex-row">
				{elementCollections && elementCollections.length > 0 && (
					<CollectionCardList elementCollections={elementCollections} setElementCollections={setElementCollections} />
				)}
			</div>

			{!isEnd ? (
				<div ref={ref} className="mt-10">
					<Loader />
				</div>
			) : (
				<div className="font-noto font-medium text-gray-900 my-8 mx-auto">No more results</div>
			)}
		</section>
	);
};
export default FeedCollections;
