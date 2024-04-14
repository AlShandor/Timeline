import ElementCollection from "@models/elementCollection";
import { connectToDB } from "@utilities/database";

export async function GET(request, { params }){
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
};

export async function PATCH(request, { params }) {
	const { title_en, title_bg, img_url, elements } = await request.json();

	try {
		await connectToDB();

		const existingCollection = await ElementCollection.findById(params.id);
		if (!existingCollection) {
			return new Response("Collection not found", { status: 404 });
		}

		// Update the collection with new data
		existingCollection.title_en = title_en;
		existingCollection.title_bg = title_bg;
		existingCollection.img_url = img_url;
        existingCollection.elements = elements;

		await existingCollection.save();

		return new Response("Successfully updated the Collection", {
			status: 200,
		});
	} catch (error) {
		return new Response("Error Updating Collection: " + error.message, { status: 500 });
	}
};

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
};
