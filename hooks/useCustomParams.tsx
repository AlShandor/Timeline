import { usePathname, useSearchParams } from "next/navigation";

export const useCustomParams = () => {
	const pathName = usePathname();

	// router
	const searchParams = useSearchParams();
	const titleParam = searchParams.get("title");
	const tagParam = searchParams.get("tag");
	const startYearParam = searchParams.get("startYear");
	const endYearParam = searchParams.get("endYear");

	const title = titleParam ? titleParam : "";
	const tag = tagParam ? tagParam : "";
	const start = startYearParam ? startYearParam : "";
	const end = endYearParam ? endYearParam : "";

    let sort;
    if (!title && pathName == ("/edit-elementCollection")) {
		sort = "searchCollection";
    } else if (title) {
		sort = "searchTitle";
	} else if (tag) {
		sort = "searchTag";
	} else if (start) {
		sort = "searchYear";
	} else {
		sort = "searchTitle";
	}

	return { title, start, end, tag, sort };
};
