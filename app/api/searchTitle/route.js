import { connectToDB } from "@utilities/database";
import Element from "@models/element";

export async function GET(request) {
	try {
		await connectToDB();

		const searchParams = request.nextUrl.searchParams;
        const page = searchParams.get("page") ? Number(searchParams.get("page")) : 0;
        const pageSize = searchParams.get("size") ? Number(searchParams.get("size")) : 4;
		const title = searchParams.get("title");

		let elements;
		if (title) {
			const regex = new RegExp(title, "i");
			elements = await Element.find(
				{ headline_en: { $regex: regex } },
				undefined,
				{ skip: (page - 1) * pageSize, limit: pageSize }
			);
		} else {
			elements = await Element.find({},
                undefined,
                { skip: (page - 1) * pageSize, limit: pageSize, }
            );
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
