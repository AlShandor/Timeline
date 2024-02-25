import { useSearchParams } from "next/navigation";

export const useCustomParams = () => {
	// router
	const searchParams = useSearchParams();
	const titleParam = searchParams.get("title");
	const startYearParam = searchParams.get("startYear");
	const endYearParam = searchParams.get("endYear");

	const title = titleParam ? titleParam : "";
	const start = startYearParam ? startYearParam : "";
	const end = endYearParam ? endYearParam : "";
	const sort = start ? "searchYear" : "searchTitle";

	return { title, start, end, sort };
};
