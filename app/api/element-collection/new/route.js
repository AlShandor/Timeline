import ElementCollection from "@models/elementCollection";
import Element from "@models/element";
import { connectToDB } from "@utilities/database";

const addCollectionToElement = function (elementId, collection) {
	return Element.findByIdAndUpdate(
		elementId,
		{ $push: { element_collections: collection._id } },
		{ new: true, useFindAndModify: false }
	);
};

export async function POST(request) {
	const {
		title_en,
        title_bg,
        img_url,
        elements
	} = await request.json();

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
