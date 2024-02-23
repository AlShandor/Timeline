import { connectToDB } from "@utilities/database";
import Element from "@models/element";

export async function GET(request) {
	try {
		await connectToDB();

		const searchParams = request.nextUrl.searchParams;
		const query = searchParams.get("query");
        let elements;

		if (query) { // startYear && no endYear
            elements = await Element.find({
				$or: [
					{
						// Option 1 - start_year = startYear
						$and: [{ start_year: query }, { end_year: null }],
					},
					{
						// Option 2 - start_year <= startYear <= end_year
						$and: [ { start_year: { $lte: query } }, { end_year: { $gte: query } }, ],
					},
				],
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
