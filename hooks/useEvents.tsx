import { useEffect, useState } from "react";
import { initialEvents } from "@utilities/initialEvents";

export const useEvents = () => {
	const [events, setEvents] = useState<Array<IEvent>>([]);
	const [selected, setSelected] = useState<Array<IElement>>([]);

	const updateEvents = (elements) => {
		setEvents(
			elements.map((el) =>
				el.end_year
					? {
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
					  }
					: {
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
					  }
			)
		);
	};

    useEffect(() => {
		updateEvents(selected);
	}, [selected]);

	// set initial events
	useEffect(() => {
		setEvents(initialEvents);
	}, []);

	return { events, setSelected };
};
