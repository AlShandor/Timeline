import { connectToDB } from "@utilities/database";
import ElementCollection from "@models/elementCollection"

export async function GET(request) {
	try {
		await connectToDB();

		const searchParams = request.nextUrl.searchParams;
		const page = searchParams.get("page") ? Number(searchParams.get("page")) : 0;
		const pageSize = searchParams.get("size") ? Number(searchParams.get("size")) : 4;
		const title = searchParams.get("title");

		let collections;
		if (title) {
			const regex = new RegExp(title, "i");
			collections = await ElementCollection.find({ title_en: { $regex: regex } }, undefined, {
				skip: (page - 1) * pageSize,
				limit: pageSize,
			});
		} else {
			collections = await ElementCollection.find({}, undefined, { skip: (page - 1) * pageSize, limit: pageSize });
		}

		if (!collections) {
			return new Response("Collections Not Found", {
				status: 404,
			});
		}

		return new Response(JSON.stringify(collections), { status: 200 });
	} catch (error) {
		return new Response("Failed to fetch all collections", { status: 500 });
	}
}
