import * as z from "zod";

const month = "Between 1-12";
const day = "Between 1-31";
const hour = "Between 0-23";
const title = "Must be at least 1 characters";
const url = "Valid URL. Must contain 'https://'.";

export const elementSchema = z.object({
	start_year: z.number(),
	start_month: z
		.number()
		.min(1, { message: month })
		.max(12, { message: month })
		.nullable(),
	start_day: z
		.number()
		.min(1, { message: day })
		.max(31, { message: day })
		.nullable(),
	start_hour: z
		.number()
		.min(0, { message: hour })
		.max(23, { message: hour })
		.nullable(),
	end_year: z.number().nullable(),
	end_month: z
		.number()
		.min(1, { message: month })
		.max(12, { message: month })
		.nullable(),
	end_day: z
		.number()
		.min(1, { message: day })
		.max(31, { message: day })
		.nullable(),
	end_hour: z
		.number()
		.min(0, { message: hour })
		.max(23, { message: hour })
		.nullable(),
	display_date_en: z.string(),
	display_date_bg: z.string(),
	headline_en: z.string().min(1, { message: title }),
	headline_bg: z.string().min(1, { message: title }),
	text_en: z.string(),
	text_bg: z.string(),
	tags: z.string().array(),
	background_url: z.union([
		z.literal(""),
		z.string().trim().url({ message: url }),
	]),
	background_color: z.union([
		z.literal(""),
		z
			.string()
			.trim()
			.min(4, { message: "Must be at least 4 characters" })
			.regex(/^#/, { message: "Must contain '#'" }),
	]),
	media_url: z.union([
		z.literal(""),
		z.string().trim().url({ message: url }),
	]),
	media_caption_en: z.string(),
	media_caption_bg: z.string(),
	media_credit: z.string(),
	media_thumbnail: z.union([
		z.literal(""),
		z.string().trim().url({ message: url }),
	]),
});

export const elementDefaultValues = {
	start_year: null,
	start_month: null,
	start_day: null,
	start_hour: null,
	end_year: null,
	end_month: null,
	end_day: null,
	end_hour: null,
	display_date_en: "",
	display_date_bg: "",
	headline_en: "",
	headline_bg: "",
	text_en: "",
	text_bg: "",
	tags: [],
	background_url: "",
	background_color: "",
	media_url: "",
	media_caption_en: "",
	media_caption_bg: "",
	media_credit: "",
	media_thumbnail: "",
};
