"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { timelineTitle } from "@utilities/initialEvents";
import { useEvents } from "@hooks/useEvents";
import Feed from "@components/Feed";
import Footer from "@components/Footer";

const DynamicTimeline = dynamic(() => import("../components/Timeline"), {
	ssr: false,
});

const Home = () => {
	const [elements, setElements] = useState<Array<IElement>>([]);
	const { events, selected, setSelected, isSelected } = useEvents();

    const handleSelectElement = (newEl) => {
        setSelected((selected) => [...selected, newEl]);
	};

    const handleRemoveElement = (el) => {
        const filteredElements = selected.filter((item) => item._id !== el._id);
        setSelected(filteredElements);
    };

	return (
		<>
			<section className="w-full mb-12 flex-center flex-col">
				<h1 className="head_text text-center">
					Discover & Share
					<br className="max-md:hidden" />
					<span className="blue_gradient text-center">
						Historical Figures and Events
					</span>
				</h1>
				<p className="desc text-center">
					Timeline is an online tool that helps you study and
					visualize historical figures and events.
				</p>
			</section>
			<section>
				<div className="container w-[1600px] max-w-[1600px]">
					<DynamicTimeline
						target={
							<div
								className="timeline"
								style={{ width: "100%", height: 500 }}
							/>
						}
						events={events}
						title={timelineTitle}
						options=""
					/>
				</div>
			</section>
			<Feed
				elements={elements}
				setElements={setElements}
				handleSelectElement={handleSelectElement}
				handleRemoveElement={handleRemoveElement}
				isSelected={isSelected}
			/>
			<Footer />
		</>
	);
};

export default Home;
