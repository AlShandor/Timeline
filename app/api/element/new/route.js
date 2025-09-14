import Element from "@models/element";
import { connectToDB } from "@utilities/database";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export  async function POST(request) {
	// check if admin
	const session = await getServerSession(authOptions);
	if (!session?.user?.isAdmin) {
		return new Response("You do not have admin rights", {
			status: 401,
		});
	}

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
        group_en,
        group_bg,
		headline_en,
		headline_bg,
		text_en,
		text_bg,
		tags,
		background_url,
		background_color,
		media_url,
		media_caption_en,
		media_caption_bg,
		media_credit,
		media_thumbnail,
		element_collections = [],
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
            group_en,
            group_bg,
			headline_en,
			headline_bg,
			text_en,
			text_bg,
			tags,
			background_url,
			background_color,
			media_url,
			media_caption_en,
			media_caption_bg,
			media_credit,
			media_thumbnail,
			element_collections,
		});

		await newElement.save();

		return new Response(JSON.stringify(newElement), { status: 201 });
	} catch (error) {
		return new Response("Failed to create a new element", { status: 500 });
	}
};
