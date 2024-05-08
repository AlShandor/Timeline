import { Schema, model, models } from "mongoose";
import ElementCollection from "@models/elementCollection";

const ElementSchema = new Schema({
	start_year: {
		type: Number,
	},
	start_month: {
		type: Number,
		min: [1, "Must be between 1-12"],
		max: [12, "Must be between 1-12"],
	},
	start_day: {
		type: Number,
		min: [1, "Must be between 1-31"],
		max: [31, "Must be between 1-31"],
	},
	start_hour: {
		type: Number,
		min: [1, "Must be between 0-23"],
		max: [31, "Must be between 0-23"],
	},
	end_year: {
		type: Number,
	},
	end_month: {
		type: Number,
		min: [1, "Must be between 1-12"],
		max: [12, "Must be between 1-12"],
	},
	end_day: {
		type: Number,
		min: [1, "Must be between 1-31"],
		max: [31, "Must be between 1-31"],
	},
	end_hour: {
		type: Number,
		min: [1, "Must be between 0-23"],
		max: [31, "Must be between 0-23"],
	},
	display_date_en: {
		type: String,
	},
	display_date_bg: {
		type: String,
	},
	group: {
		type: String,
	},
	headline_en: {
		type: String,
		required: [true, "Headline EN is required."],
	},
	headline_bg: {
		type: String,
		required: [true, "Headline BG is required."],
	},
	text_en: {
		type: String,
	},
	text_bg: {
		type: String,
	},
	tags: [
		{
			type: String,
		},
	],
	background_url: {
		type: String,
	},
	background_color: {
		type: String,
	},
	media_url: {
		type: String,
	},
	media_caption_en: {
		type: String,
	},
	media_caption_bg: {
		type: String,
	},
	media_credit: {
		type: String,
	},
	media_thumbnail: {
		type: String,
	},
	element_collections: [
		{
			type: Schema.Types.ObjectId,
			ref: "ElementCollection",
		},
	],
});

ElementSchema.pre( "deleteOne", { document: false, query: true }, async function (next) {
		try {
			const elementId = this.getQuery()._id;

			// Update all ElementCollections that reference the element to be deleted
			await ElementCollection.updateMany(
				{ elements: elementId },
				{ $pull: { elements: elementId } }
			);
			next();
		} catch (error) {
			next(error);
		}
	}
);

const Element = models.Element || model("Element", ElementSchema);

export default Element;
