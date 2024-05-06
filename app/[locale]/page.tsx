"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { timelineTitle } from "@utilities/initialEvents";
import { useEvents } from "@hooks/useEvents";
import { useTranslations } from "next-intl";
import Feed from "@components/Feed";
import Footer from "@components/Footer";

const DynamicTimeline = dynamic(() => import("@/components/Timeline"), {
	ssr: false,
});

const Home = () => {
	const [elements, setElements] = useState<Array<IElement>>([]);
	const [elementCollections, setElementCollections] = useState<Array<IElementCollection>>([]);
	const { events, selected, setSelected, isSelected } = useEvents();
	const t = useTranslations("homepage");

	const handleSelectElement = (newEl) => {
		setSelected((selected) => [...selected, newEl]);
	};

	const handleSelectAllElements = () => {
		setSelected(elements);
	};

	const handleRemoveElement = (el) => {
		const filteredElements = selected.filter((item) => item._id !== el._id);
		setSelected(filteredElements);
	};

	const handleRemoveAllElements = () => {
		setSelected([]);
	};

	return (
		<>
			<section className="w-full mb-12 flex-center flex-col">
				<h1 className="head_text text-center">
					{t("title")}
					<br className="max-md:hidden" />
					<span className="blue_gradient text-center">{t("blue-title")}</span>
				</h1>
				<p className="desc text-center">{t("subtitle")}</p>
			</section>
			<section>
				<div className="container w-[1600px] max-w-[1600px]">
					<DynamicTimeline
						target={<div className="timeline" style={{ width: "100%", height: 500 }} />}
						events={events}
						title={timelineTitle}
						options=""
					/>
				</div>
			</section>
			<Feed
				elements={elements}
				setElements={setElements}
				elementCollections={elementCollections}
				setElementCollections={setElementCollections}
				handleSelectElement={handleSelectElement}
				handleSelectAllElements={handleSelectAllElements}
				handleRemoveElement={handleRemoveElement}
				handleRemoveAllElements={handleRemoveAllElements}
				selected={selected}
				isSelected={isSelected}
			/>
			<Footer />
		</>
	);
};

export default Home;
