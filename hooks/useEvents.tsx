import { useEffect, useState } from "react";
import { initialEvents } from "@utilities/initialEvents";
import { useLocale } from "next-intl";

export const useEvents = () => {
	const [events, setEvents] = useState<Array<IEvent>>([]);
	const [selected, setSelected] = useState<Array<IElement>>([]);
    const locale = useLocale();

	const updateEvents = (elements) => {
		setEvents(
			elements.map((el) => {
				if (el.end_year && locale === "en") {
					return {
						// event has end year
						start_date: {
							year: el.start_year,
							month: el.start_month,
							day: el.start_day,
							hour: el.start_hour,
							display_date: el.display_date_en,
						},
						end_date: {
							year: el.end_year,
							month: el.end_month,
							day: el.end_day,
							hour: el.end_hour,
						},
						text: {
							headline: el.headline_en,
							text: el.text_en,
						},
						background: {
							url: el.background_url,
						},
						media: {
							url: el.media_url,
							caption: el.media_caption_en,
							credit: el.media_credit,
						},
					};
				} else if (el.end_year && locale === "bg") {
					return {
						// event has end year
						start_date: {
							year: el.start_year,
							month: el.start_month,
							day: el.start_day,
							hour: el.start_hour,
							display_date: el.display_date_bg,
						},
						end_date: {
							year: el.end_year,
							month: el.end_month,
							day: el.end_day,
							hour: el.end_hour,
						},
						text: {
							headline: el.headline_bg,
							text: el.text_bg,
						},
						background: {
							url: el.background_url,
						},
						media: {
							url: el.media_url,
							caption: el.media_caption_bg,
							credit: el.media_credit,
						},
					};
				} else if (!el.end_year && locale === "bg") {
					return {
						// event doesn't have end year
						start_date: {
							year: el.start_year,
							month: el.start_month,
							day: el.start_day,
							hour: el.start_hour,
							display_date: el.display_date_bg,
						},
						text: {
							headline: el.headline_bg,
							text: el.text_bg,
						},
						background: {
							url: el.background_url,
						},
						media: {
							url: el.media_url,
							caption: el.media_caption_bg,
							credit: el.media_credit,
						},
					};
				} else {
					//(!el.end_year && locale === "en")
					return {
						// event doesn't have end year
						start_date: {
							year: el.start_year,
							month: el.start_month,
							day: el.start_day,
							hour: el.start_hour,
							display_date: el.display_date_en,
						},
						text: {
							headline: el.headline_en,
							text: el.text_en,
						},
						background: {
							url: el.background_url,
						},
						media: {
							url: el.media_url,
							caption: el.media_caption_en,
							credit: el.media_credit,
						},
					};
				}
			})
		);
	};

	useEffect(() => {
		if (selected.length > 0) {
			updateEvents(selected);
		} else {
			setEvents(initialEvents);
		}
	}, [selected]);

	// set initial events
	useEffect(() => {
		setEvents(initialEvents);
	}, []);

	const isSelected = (element) => {
		if (selected.some((item) => element._id === item._id)) {
			return true;
		}

		return false;
	};

	return { events, selected, isSelected, setSelected };
};
