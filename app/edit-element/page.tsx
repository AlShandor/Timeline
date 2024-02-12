"use client"

import Feed from "@components/Feed";
import { useElements } from "@hooks/useElements";

const Edit = () => {
	const { elements } = useElements();

	return <Feed elements={elements} />;
};

export default Edit;
