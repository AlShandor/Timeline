import { connectToDB } from "@utilities/database";
import Element from "@models/element";

export async function GET(request) {
	try {
		await connectToDB();

		const searchParams = request.nextUrl.searchParams;
		const title = searchParams.get("title");
		let elements;

		if (title) {
			const regex = new RegExp(title, "i");
			elements = await Element.find({
				headline_en: { $regex: regex },
			});
		} else {
			elements = await Element.find({});
		}

		if (!elements) {
			return new Response("Elements Not Found", {
				status: 404,
			});
		}

		return new Response(JSON.stringify(elements), { status: 200 });
	} catch (error) {
		return new Response("Failed to fetch all elements", { status: 500 });
	}
}
