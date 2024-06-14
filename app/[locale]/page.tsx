"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { timelineTitle_en, timelineTitle_bg } from "@utilities/initialEvents";
import { useEvents } from "@hooks/useEvents";
import { useLocale, useTranslations } from "next-intl";
import Feed from "@components/Feed";
import Footer from "@components/Footer";
import { Protect } from "@clerk/nextjs";

const DynamicTimeline = dynamic(() => import("@/components/Timeline"), {
	ssr: false,
});

const TIMELINE_DEFAULT_HEIGHT = 700;
const TIMELINE_NAV_DEFAULT_HEIGHT = 210;
const TIMELINE_NAV_HEIGHT_CHANGE = 100;

const Home = () => {
	const [elements, setElements] = useState<Array<IElement>>([]);
	const [elementCollections, setElementCollections] = useState<Array<IElementCollection>>([]);
	const [timenavHeight, setTimenavHeight] = useState<number>(TIMELINE_NAV_DEFAULT_HEIGHT);
	const [timelineWindowHeight, setTimelineWindowHeight] = useState<number>(TIMELINE_DEFAULT_HEIGHT);
	const { events, selected, setSelected, isSelected } = useEvents();
    const locale = useLocale();
	const t = useTranslations("homepage");
    const options = {
        timenav_height_min: timenavHeight
    };

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

    const increaseTimenavHeight = () => {
		setTimenavHeight(timenavHeight + TIMELINE_NAV_HEIGHT_CHANGE);
        setTimelineWindowHeight(timelineWindowHeight + TIMELINE_NAV_HEIGHT_CHANGE);
	};

    const decreaseTimenavHeight = () => {
		setTimenavHeight(timenavHeight - TIMELINE_NAV_HEIGHT_CHANGE);
        setTimelineWindowHeight(timelineWindowHeight - TIMELINE_NAV_HEIGHT_CHANGE);
	};

	return (
		<>
        <Protect permission="org:approved:read">
			<section className="w-full mb-12 flex-center flex-col">
				<h1 className="mt-5 text-center">
                    <span className="font-bold leading-[1.15] text-gray-700 text-3xl sm:text-4xl lg:text-6xl">
					    {t("title")}
                    </span>
					<br/>
					<span className="font-extrabold leading-[1.15] text-black text-3xl sm:text-4xl lg:text-6xl text-center blue_gradient">{t("blue-title")}</span>
				</h1>
				<p className="desc px-4 text-center">{t("subtitle")}</p>
			</section>
			<section>
				<div className="container w-[370px] sm:w-[600px] md:w-[720px] lg:w-[980px] xl:w-[1240px] 2xl:w-[1490px] 3xl:w-[1600px] max-w-[1600px]">
					<DynamicTimeline
						target={<div className="timeline" style={{ width: "100%", height: timelineWindowHeight }} />}
						events={events}
						title={locale === "en" ? timelineTitle_en : timelineTitle_bg}
                        options={options}
					/>
				</div>
                <div className="flex flex-row w-fit mt-8 ">
                    <button
                        className="plus_minus_btn"
                        onClick={() => decreaseTimenavHeight()}
                        disabled={timenavHeight > TIMELINE_NAV_DEFAULT_HEIGHT ? false : true}
                    >
                        -
                    </button>
                    <div className="text-sm border border-gray-300 bg-white pointer-events-none w-fit rounded-lg py-1.5 px-7 mx-2 text-gray-700 font-normal text-center font-inter flex flex-col items-center justify-center;">
                        <span>{t("timenav-height")}</span>
                        <span> {timenavHeight - 10}</span>
                        {/* Timeline js subtracts 10px */}
                    </div>
                    <button
                        className="plus_minus_btn"
                        onClick={() => increaseTimenavHeight()}
                        disabled={timenavHeight >= (TIMELINE_NAV_DEFAULT_HEIGHT + (TIMELINE_NAV_HEIGHT_CHANGE * 6)) ? true : false}
                    >
                        +
                    </button>
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
        </Protect>
		</>
	);
};

export default Home;
