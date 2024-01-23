import { connectToDB } from "@utilities/database";
import Element from "@models/element";

export const GET = async (request) => {
	try {
		await connectToDB();

		const elements = await Element.find({});

		return new Response(JSON.stringify(elements), { status: 200 });
	} catch (error) {
		return new Response("Failed to fetch all elements", { status: 500 });
	}
};
