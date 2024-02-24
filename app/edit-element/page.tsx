"use client"

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Feed from "@components/Feed";

const Edit = () => {
	const [elements, setElements] = useState<Array<IElement>>([]);

	// router
	const searchParams = useSearchParams();
	const titleParam = searchParams.get("title");
	const startYearParam = searchParams.get("startYear");
	const endYearParam = searchParams.get("endYear");

	const title = titleParam ? titleParam : "";
	const startYear = startYearParam ? startYearParam : "";
	const endYear = endYearParam ? endYearParam : "";
	const sort = startYear ? "searchYear" : "searchTitle";

	return (
		<Feed
			elements={elements}
			setElements={setElements}
			title={title}
			start={startYear}
			end={endYear}
			sort={sort}
		/>
	);
};

export default Edit;
