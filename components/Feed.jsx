"use client";

import { useState, useEffect } from "react";
import ElementCardList from "@components/ElementCardList";

const Feed = ({ handleEdit, handleDelete }) => {
    const [searchText, setSearchText] = useState('');
    const [elements, setElements] = useState([]);

    const handleSearchChange = (e) => {

    };

    useEffect(() => {
        const fetchElements = async () => {
            const response = await fetch('/api/element');
            const data = await response.json();

            setElements(data);
        }

        fetchElements();
    }, [])


    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for timeline elements"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>

            <ElementCardList
                data={elements}
                handleAddClick={() => { }}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        </section>
    )
}

export default Feed;
