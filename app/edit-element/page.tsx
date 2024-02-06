"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Feed from "@components/Feed";

const Edit = () => {
    const router = useRouter();

    const [elements, setElements] = useState([]);

    useEffect(() => {
        const fetchElements = async () => {
            const response = await fetch('/api/element');
            const data = await response.json();

            setElements(data);
        }

        fetchElements();
    }, [])

    return (
        <Feed
            setHomepageElements={null}
        />
    )
}
export default Edit;