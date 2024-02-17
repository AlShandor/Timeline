"use client"

import Feed from "@components/Feed";
import { useElements } from "@hooks/useElements";
import { useSearchParams } from "next/navigation";

const Edit = () => {
	// router
	const searchParams = useSearchParams();
	const queryParam = searchParams.get("query");
	const query = queryParam ? queryParam : "";
	const { elements } = useElements("");

	return <Feed elements={elements} queryParam={query} />;
};

export default Edit;
