"use client";

import { useRef, useEffect, cloneElement } from "react";
import TL from "@utilities/timeline3/js/TL";
import "@styles/timeline.css";

const Timeline = ({ target, events, title, options }) => {
    const timelineEl = useRef(null);
    
	useEffect(() => {
		if (timelineEl.current) {
			new TL.Timeline(timelineEl.current, { events, title, options });
		}
	}, [events, options]);

	return cloneElement(target, { ref: timelineEl });
};

export default Timeline;
