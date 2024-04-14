import ElementCollection from "@models/elementCollection";
import Element from "@models/element";
import { connectToDB } from "@utilities/database";

export async function GET(request, { params }) {
	try {
		await connectToDB();

		const collection = await ElementCollection.findById(params.id).populate("elements");
		if (!collection) {
			return new Response("Collection Not Found", { status: 404 });
		}

		return new Response(JSON.stringify(collection), { status: 200 });
	} catch (error) {
		return new Response("Internal Server Error", { status: 500 });
	}
}

export async function PATCH(request, { params }) {
	const { title_en, title_bg, img_url, elements } = await request.json();

	try {
		await connectToDB();

		const updatedCollection = await ElementCollection.findByIdAndUpdate(
			params.id,
			{ title_en: title_en, title_bg: title_bg, img_url: img_url, elements: elements },
			{ new: true }
		);
		if (!updatedCollection) {
			return new Response("Collection not found", { status: 404 });
		}

		// Update associated Elements
		const elementsToUpdate = await Element.find({ element_collections: params.id });

		for (const element of elementsToUpdate) {
			if (elements.includes(element._id.toString())) {
				// If the Element is in the new elements list, do nothing
				continue;
			} else {
				// If the Element is not in the new elements list, remove the collection ID
				element.element_collections = element.element_collections.filter(
					(collectionId) => collectionId.toString() !== params.id
				);
				await element.save();
			}
		}

		// Update newly added elements to include collection ID
		const newElements = await Element.find({ _id: { $in: elements } });

		for (const newElement of newElements) {
			if (!newElement.element_collections.includes(params.id)) {
				newElement.element_collections.push(params.id);
				await newElement.save();
			}
		}

		return new Response("Successfully updated the Collection", {
			status: 200,
		});
	} catch (error) {
		return new Response("Error Updating Collection: " + error.message, { status: 500 });
	}
}

export async function DELETE(request, { params }) {
	try {
		await connectToDB();

		await ElementCollection.deleteOne({ _id: params.id });

		return new Response("Collection deleted successfully", { status: 200 });
	} catch (error) {
		return new Response("Error deleting collection: " + error.message, {
			status: 500,
		});
	}
}
