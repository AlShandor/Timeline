import { connectToDB } from "@utilities/database";
import Element from "@models/element";

export async function GET(request) {
	try {
		await connectToDB();

		const searchParams = request.nextUrl.searchParams;
		const qStart = searchParams.get("startYear");
		const qEnd = searchParams.get("endYear");
        const page = searchParams.get("page") ? Number(searchParams.get("page")) : 0;
        const pageSize = searchParams.get("size") ? Number(searchParams.get("size")) : 4;

        let elements;
		if (qStart && !qEnd) {
			// only qStart
			elements = await Element.find(
				{
					$or: [
						{
							// Option 1 - start_year = qStart
							$and: [{ start_year: qStart }, { end_year: null }],
						},
						{
							// Option 2 - start_year <= qStart <= end_year
							$and: [
								{ start_year: { $lte: qStart } },
								{ end_year: { $gte: qStart } },
							],
						},
					],
				},
				undefined,
				{ skip: (page - 1) * pageSize, limit: pageSize }
			);
		} else if (qStart && qEnd) {
			// qStart && qEnd
			elements = await Element.find(
				{
					$or: [
						{
							// Option 1 - qStart <= start_year <= qEnd
							$and: [
								{ start_year: { $gte: qStart } },
								{ start_year: { $lte: qEnd } },
							],
						},
						{
							// Option 2 - qStart <= end_year <= qEnd
							$and: [
								{ end_year: { $gte: qStart } },
								{ end_year: { $lte: qEnd } },
							],
						},
						{
							// Option 3 - start_year <= qStart && qEnd <= end_year
							$and: [
								{ start_year: { $lte: qStart } },
								{ end_year: { $gte: qEnd } },
							],
						},
					],
				},
				undefined,
				{ skip: (page - 1) * pageSize, limit: pageSize }
			);
		} else {
			elements = await Element.find({},
                undefined,
                { skip: (page - 1) * pageSize, limit: pageSize, });
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
