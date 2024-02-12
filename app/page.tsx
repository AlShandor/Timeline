"use client";

import dynamic from "next/dynamic";
import { title } from "@utilities/data";
import Feed from "@components/Feed";
import Footer from "@components/Footer";
import { useEvents } from "@hooks/useEvents";
import { useElements } from "@hooks/useElements";

const DynamicTimeline = dynamic(() => import("../components/Timeline"), {
	ssr: false,
});

const Home = () => {
	const { elements } = useElements();
	const { events, updateEvents } = useEvents(elements);

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
						title={title}
						options=""
					/>
				</div>
			</section>
			<Feed elements={elements} />
			<Footer />
		</>
	);
};

export default Home;
