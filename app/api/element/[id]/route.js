import Element from "@models/element";
import { connectToDB } from "@utilities/database";

export const GET = async (request, { params }) => {
	try {
		await connectToDB();

		const element = await Element.findById(params.id);
		if (!element) {
            return new Response("Element Not Found", { status: 404 });
        }

		return new Response(JSON.stringify(element), { status: 200 });
	} catch (error) {
		return new Response("Internal Server Error", { status: 500 });
	}
};

export const PATCH = async (request, { params }) => {
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

		// Find the existing element by ID
		const existingElement = await Element.findById(params.id);

		if (!existingElement) {
			return new Response("Element not found", { status: 404 });
		}

		// Update the element with new data
		existingElement.start_year = start_year;
		existingElement.start_month = start_month;
		existingElement.start_day = start_day;
		existingElement.start_hour = start_hour;
		existingElement.end_year = end_year;
		existingElement.end_month = end_month;
		existingElement.end_day = end_day;
		existingElement.end_hour = end_hour;
		existingElement.display_date_en = display_date_en;
		existingElement.display_date_bg = display_date_bg;
		existingElement.headline_en = headline_en;
		existingElement.headline_bg = headline_bg;
		existingElement.text_en = text_en;
		existingElement.text_bg = text_bg;
		existingElement.group = group;
		existingElement.background_url = background_url;
		existingElement.background_color = background_color;
		existingElement.media_url = media_url;
		existingElement.media_caption_en = media_caption_en;
		existingElement.media_caption_bg = media_caption_bg;
		existingElement.media_credit = media_credit;
		existingElement.media_thumbnail = media_thumbnail;

		await existingElement.save();

		return new Response("Successfully updated the Element", {
			status: 200,
		});
	} catch (error) {
		return new Response("Error Updating Element: " + error.message, { status: 500 });
	}
};

export const DELETE = async (request, { params }) => {
	try {
		await connectToDB();

		// Find the element by ID and remove it
		await Element.findByIdAndDelete(params.id );

		return new Response("Element deleted successfully", { status: 200 });
	} catch (error) {
		return new Response("Error deleting element: " + error.message, {
			status: 500,
		});
	}
};
