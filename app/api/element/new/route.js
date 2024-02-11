import Element from "@models/element";
import { connectToDB } from "@utilities/database";

export  async function POST(request) {
	const {
		start_year,
		start_month,
		start_day,
		start_hour,
		end_year,
		end_month,
        end_day,
        end_hour,
        display_date_en,
        display_date_bg,
        headline_en,
        headline_bg,
        text_en,
        text_bg,
        group,
        background_url,
        background_color,
        media_url,
        media_caption_en,
        media_caption_bg,
        media_credit,
        media_thumbnail,
	} = await request.json();

	try {
		await connectToDB();
		const newElement = new Element({
			start_year,
			start_month,
			start_day,
			start_hour,
			end_year,
			end_month,
			end_day,
			end_hour,
			display_date_en,
			display_date_bg,
			headline_en,
			headline_bg,
			text_en,
			text_bg,
			group,
			background_url,
			background_color,
			media_url,
			media_caption_en,
			media_caption_bg,
			media_credit,
			media_thumbnail,
		});

		await newElement.save();

		return new Response(JSON.stringify(newElement), { status: 201 });
	} catch (error) {
		return new Response("Failed to create a new element", { status: 500 });
	}
};
