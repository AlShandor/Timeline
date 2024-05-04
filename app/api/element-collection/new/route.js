import ElementCollection from "@models/elementCollection";
import Element from "@models/element";
import { connectToDB } from "@utilities/database";
import { auth } from "@clerk/nextjs/server";

const addCollectionToElement = function (elementId, collection) {
	return Element.findByIdAndUpdate(
		elementId,
		{ $push: { element_collections: collection._id } },
		{ new: true, useFindAndModify: false }
	);
};

export async function POST(request) {
	// check if admin
	const { has } = auth();
	if (!has({ role: "org:admin" })) {
		return new Response("You do not have rights", {
			status: 401,
		});
	}

	const { title_en, title_bg, img_url, elements } = await request.json();

	try {
		await connectToDB();
		const newElementCollection = new ElementCollection({
			title_en,
			title_bg,
			img_url,
			elements,
		});

		await newElementCollection.save();

		for (let i = 0; i < elements.length; i++) {
			await addCollectionToElement(elements[i], newElementCollection);
		}

		return new Response(JSON.stringify(newElementCollection), {
			status: 201,
		});
	} catch (error) {
		return new Response("Failed to create a new Collection", { status: 500 });
	}
}
