import { Schema, model, models } from "mongoose";
import Element from "@models/element";

const ElementCollectionSchema = new Schema({
	title_en: {
		type: String,
		required: [true, "Title EN is required."],
	},
	title_bg: {
		type: String,
		required: [true, "Title BG is required."],
	},
	img_url: {
		type: String,
	},
	elements: [
		{
			type: Schema.Types.ObjectId,
			ref: "Element",
		},
	],
});

ElementCollectionSchema.pre("deleteOne", { document: false, query: true }, async function (next) {
	try {
		const collectionId = this.getQuery()._id;

		// Update all ElementCollections that reference the element to be deleted
		await Element.updateMany({ element_collections: collectionId }, { $pull: { element_collections: collectionId } });
		next();
	} catch (error) {
		next(error);
	}
});

const ElementCollection = models.ElementCollection || model("ElementCollection", ElementCollectionSchema);

export default ElementCollection;
