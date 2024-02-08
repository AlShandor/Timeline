export {};

declare global {
	interface IElement {
		_id: string;
		start_year: number | null;
		start_month: number | null;
		start_day: number | null;
		start_hour: number | null;
		end_year: number | null;
		end_month: number | null;
		end_day: number | null;
		end_hour: number | null;
		display_date_en: string | null;
		display_date_bg: string | null;
		headline_en: string | null;
		headline_bg: string | null;
		text_en: string | null;
		text_bg: string | null;
		group: string | null;
		background_url: string | null;
		background_color: string | null;
		media_url: string | null;
		media_caption_en: string | null;
		media_caption_bg: string | null;
		media_credit: string | null;
		media_thumbnail: string | null;
	}

    interface IEvent {
		start_date: {
			year: number | null;
			month?: number | null;
			day?: number | null;
			hour?: number | null;
			display_date?: string | null;
		};
		end_date?: {
			year?: number | null;
			month?: number | null;
			day?: number | null;
			hour?: number | null;
		};
		text: {
			headline: string | null;
			text?: string | null;
		};
		background?: {
			url: string | null;
		};
		media?: {
			url: string | null;
			caption: string | null;
			credit: string | null;
		};
	}
}
