"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { timelineTitle } from "@utilities/data";
import { useEvents } from "@hooks/useEvents";
import Feed from "@components/Feed";
import Footer from "@components/Footer";

const DynamicTimeline = dynamic(() => import("../components/Timeline"), {
	ssr: false,
});

const Home = () => {
	const [elements, setElements] = useState<Array<IElement>>([]);
	const { events, updateEvents } = useEvents(elements);

	// router
	const searchParams = useSearchParams();
	const titleParam = searchParams.get("title");
	const startYearParam = searchParams.get("startYear");
	const endYearParam = searchParams.get("endYear");

	const title = titleParam ? titleParam : "";
	const startYear = startYearParam ? startYearParam : "";
	const endYear = endYearParam ? endYearParam : "";
    const sort = startYear ? "searchYear" : "searchTitle"; 

	const handleAdd = () => {
		updateEvents();
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
				title={title}
				start={startYear}
				end={endYear}
				sort={sort}
			/>
			<Footer />
		</>
	);
};

export default Home;
