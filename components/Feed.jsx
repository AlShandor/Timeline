"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import ElementCardList from "@components/ElementCardList";

const Feed = ({ setHomepageElements, handleEdit, handleDelete }) => {
    const pathName = usePathname();
    const [elements, setElements] = useState([]);

    // Search states
    const [searchText, setSearchText] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchedResults, setSearchedResults] = useState([]);

    const fetchElements = async () => {
        const response = await fetch('/api/element');
        const data = await response.json();

        setElements(data);
        if (pathName === "/") {
            setHomepageElements(data);
        }
    }

    useEffect(() => {
        fetchElements();
    }, [])

    const filterElements = (searchtext) => {
        const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
        return elements.filter(
            (item) =>
                regex.test(item.headline_en)
        );
    };

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        // debounce method
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterElements(e.target.value);
                setSearchedResults(searchResult);
            }, 500)
        );
    };

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

            {searchText ? (
                <ElementCardList
                    elements={searchedResults}
                    handleAddClick={() => { }}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            ) : (<ElementCardList
                    elements={elements}
                    handleAddClick={() => { }}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
            />
            )}
        </section>
    )
}

export default Feed;
