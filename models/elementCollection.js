import { Schema, model, models } from "mongoose";

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

const ElementCollection = models.ElementCollection || model("ElementCollection", ElementCollectionSchema);

export default ElementCollection;
