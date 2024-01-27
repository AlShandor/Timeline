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

    const handleEdit = (element) => {
        router.push(`/update-element?id=${element._id}`);
    };

    const handleDelete = async (element) => {
        const hasConfirmed = confirm(
            "Are you sure you want to delete this prompt?"
        );

        if (hasConfirmed) {
            try {
                await fetch(`/api/element/${element._id.toString()}`, {
                    method: "DELETE",
                });

                const filteredElements = elements.filter((item) => item._id !== element._id);

                setElements(filteredElements);

                router.push("/");
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Feed
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}
export default Edit;