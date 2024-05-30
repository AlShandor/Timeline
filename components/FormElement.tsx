import Link from "next/link";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { useLocale } from "next-intl";

const FormCollection = ({ type, isSubmitting, onSubmit, register, handleSubmit, errors, tags, setTags }) => {
	const inputProps = {
		className: "tags_input",
		placeholder: "Add a tag",
	};

	const tagProps = {
		className: "tags_card",
		classNameRemove: "tags_card_remove",
	};

    const locale = useLocale();

	return (
		<section className="w-full max-w-full flex-start flex-col">
			<h1 className="head_text text-left cursor-default mx-auto lg:mx-0">
				<span className="blue_gradient">{type} Timeline Element</span>
			</h1>
			<p className="desc text-left max-w-md cursor-default mx-auto lg:mx-0">
				{type} historical events and figures for the Timeline.
			</p>

			<form onSubmit={handleSubmit(onSubmit)} className="mt-10 w-full flex flex-col lg:flex-row gap-5">
				{/* Date Section */}
				<section className="create_section">
					<label>
						<h1 className="create_section_title">Date Section</h1>
						<hr className="solid"></hr>
					</label>

					{/* Start Year */}
					<div className="flex flex-row gap-4">
						<label className="w-full">
							<span className="create_section_input_title">
								Start Year<span className="required">*</span>
							</span>

							<input
								type="number"
								placeholder="example: 2024"
								required
								className="form_input"
								name="start_year"
								{...register("start_year", {
									valueAsNumber: true,
								})}
							/>
							{errors.start_year && (
								<p className="text-xs italic text-red-500 mt-2"> {errors.start_year?.message} </p>
							)}
						</label>

						{/* Start Month */}
						<label className="text-center min-w-[60px]">
							<span className="small-span create_section_input_title">Month</span>

							<input
								type="number"
								placeholder="1-12"
								className="form_input_small"
								name="start_month"
								{...register("start_month", {
									valueAsNumber: true,
								})}
							/>
							{errors.start_month && (
								<p className="text-xs italic text-red-500 mt-2"> {errors.start_month?.message} </p>
							)}
						</label>

						{/* Start Day */}
						<label className="text-center min-w-[60px]">
							<span className="small-span create_section_input_title">Day</span>

							<input
								type="number"
								placeholder="1-31"
								className="form_input_small"
								name="start_day"
								{...register("start_day", {
									valueAsNumber: true,
								})}
							/>
							{errors.start_day && (
								<p className="text-xs italic text-red-500 mt-2"> {errors.start_day?.message} </p>
							)}
						</label>

						{/* Start Hour */}
						<label className="text-center min-w-[60px]">
							<span className="small-span create_section_input_title">Hour</span>

							<input
								type="number"
								placeholder="0-23"
								className="form_input_small"
								name="start_hour"
								{...register("start_hour", {
									valueAsNumber: true,
								})}
							/>
							{errors.start_hour && (
								<p className="text-xs italic text-red-500 mt-2"> {errors.start_hour?.message} </p>
							)}
						</label>
					</div>

					{/* End Year */}
					<div className="flex flex-row gap-4">
						<label className="w-full">
							<span className="create_section_input_title">End Year</span>

							<input
								type="number"
								placeholder="example: 2025"
								className="form_input"
								name="end_year"
								{...register("end_year", {
									valueAsNumber: true,
								})}
							/>
							{errors.end_year && <p className="text-xs italic text-red-500 mt-2"> {errors.end_year?.message} </p>}
						</label>

						{/* End Month */}
						<label className="text-center min-w-[60px]">
							<span className="small-span create_section_input_title">Month</span>

							<input
								type="number"
								placeholder="1-12"
								className="form_input_small"
								name="end_month"
								{...register("end_month", {
									valueAsNumber: true,
								})}
							/>
							{errors.end_month && (
								<p className="text-xs italic text-red-500 mt-2"> {errors.end_month?.message} </p>
							)}
						</label>

						{/* End Day */}
						<label className="text-center min-w-[60px]">
							<span className="small-span create_section_input_title">Day</span>

							<input
								type="number"
								placeholder="1-31"
								className="form_input_small"
								name="end_day"
								{...register("end_day", {
									valueAsNumber: true,
								})}
							/>
							{errors.end_day && <p className="text-xs italic text-red-500 mt-2"> {errors.end_day?.message} </p>}
						</label>

						{/* End Hour */}
						<label className="text-center min-w-[60px]">
							<span className="small-span create_section_input_title">Hour</span>

							<input
								type="number"
								placeholder="0-23"
								className="form_input_small"
								name="end_hour"
								{...register("end_hour", {
									valueAsNumber: true,
								})}
							/>
							{errors.end_hour && <p className="text-xs italic text-red-500 mt-2"> {errors.end_hour?.message} </p>}
						</label>
					</div>

					{/* Display Date EN */}
					<label>
						<span className="create_section_input_title">Display Date EN</span>
						<span className="create_section_input_title_small">String presenting the date</span>

						<input
							type="text"
							placeholder='example: "BCE 29, Spring"'
							className="form_input"
							name="display_date_en"
							{...register("display_date_en")}
						/>
						{errors.display_date_en && (
							<p className="text-xs italic text-red-500 mt-2"> {errors.display_date_en?.message} </p>
						)}
					</label>

					{/* Display Date BG */}
					<label>
						<span className="create_section_input_title">Display Date BG</span>

						<input type="text" className="form_input" name="display_date_bg" {...register("display_date_bg")} />
						{errors.display_date_bg && (
							<p className="text-xs italic text-red-500 mt-2"> {errors.display_date_bg?.message} </p>
						)}
					</label>

					{/* Group EN */}
					<label>
						<span className="create_section_input_title">Group EN</span>

						<input type="text" className="form_input" name="group_en" {...register("group_en")} />
						{errors.group_en && <p className="text-xs italic text-red-500 mt-2"> {errors.group_en?.message} </p>}
					</label>

					{/* Group BG*/}
					<label>
						<span className="create_section_input_title">Group BG</span>

						<input type="text" className="form_input" name="group_bg" {...register("group_bg")} />
						{errors.group_bg && <p className="text-xs italic text-red-500 mt-2"> {errors.group_bg?.message} </p>}
					</label>
				</section>

				{/* Text Section */}
				<section className="create_section">
					<label>
						<h1 className="create_section_title">Text Section</h1>
						<hr className="solid"></hr>
					</label>

					{/* Headline EN*/}
					<label>
						<span className="create_section_input_title">
							Title EN<span className="required">*</span>
						</span>
						<span className="create_section_input_title_small">Person or Event Description</span>

						<input
							type="text"
							placeholder='example: "David", "David Becomes King"'
							required
							className="form_input"
							name="headline_en"
							{...register("headline_en")}
						/>
						{errors.headline_en && (
							<p className="text-xs italic text-red-500 mt-2"> {errors.headline_en?.message} </p>
						)}
					</label>

					{/* Headline BG*/}
					<label>
						<span className="create_section_input_title">
							Title BG<span className="required">*</span>
						</span>

						<input type="text" required className="form_input" name="headline_bg" {...register("headline_bg")} />
						{errors.headline_bg && (
							<p className="text-xs italic text-red-500 mt-2"> {errors.headline_bg?.message} </p>
						)}
					</label>

					{/* Text EN */}
					<label>
						<span className="create_section_input_title">Text EN</span>

						<textarea
							placeholder="Text with embedded HTML"
							className="form_textarea"
							name="text_en"
							{...register("text_en")}
						/>
						{errors.text_en && <p className="text-xs italic text-red-500 mt-2"> {errors.text_en?.message} </p>}
					</label>

					{/* Text BG */}
					<label>
						<span className="create_section_input_title">Text BG</span>

						<textarea className="form_textarea" name="text_bg" {...register("text_bg")} />
						{errors.text_bg && <p className="text-xs italic text-red-500 mt-2"> {errors.text_bg?.message} </p>}
					</label>

					{/* Tags */}
					<label>
						<span className="create_section_input_title">Tags</span>

						<TagsInput
							className="form_tags"
							focusedClassName="form_tags_focused"
							inputProps={inputProps}
							tagProps={tagProps}
							value={tags}
							onlyUnique="true"
							onChange={(t) => setTags(t)}
						/>
					</label>
				</section>

				{/* Media Section */}
				<section className="create_section">
					<label>
						<h1 className="create_section_title">Media Section</h1>
						<hr className="solid"></hr>
					</label>

					{/* Background URL */}
					<label>
						<span className="create_section_input_title">Background URL</span>

						<input
							type="text"
							placeholder="https://example.com"
							className="form_input"
							name="background_url"
							{...register("background_url")}
						/>
						{errors.background_url && (
							<p className="text-xs italic text-red-500 mt-2"> {errors.background_url?.message} </p>
						)}
					</label>

					{/* Background Color */}
					<label>
						<span className="create_section_input_title">Background Color</span>

						<input
							type="text"
							placeholder="example: #04AEEF"
							className="form_input"
							name="background_color"
							{...register("background_color")}
						/>
						{errors.background_color && (
							<p className="text-xs italic text-red-500 mt-2"> {errors.background_color?.message} </p>
						)}
					</label>

					{/* Media URL */}
					<label>
						<span className="create_section_input_title">Image URL</span>

						<input
							type="text"
							placeholder="https://example.com"
							className="form_input"
							name="media_url"
							{...register("media_url")}
						/>
						{errors.media_url && <p className="text-xs italic text-red-500 mt-2"> {errors.media_url?.message} </p>}
					</label>

					{/* Media Caption EN */}
					<label>
						<span className="create_section_input_title">Caption EN</span>
						<span className="create_section_input_title_small">Description under image</span>

						<input
							type="text"
							placeholder="Text with embedded HTML"
							className="form_input"
							name="media_caption_en"
							{...register("media_caption_en")}
						/>
						{errors.media_caption_en && (
							<p className="text-xs italic text-red-500 mt-2"> {errors.media_caption_en?.message} </p>
						)}
					</label>

					{/* Media Caption BG */}
					<label>
						<span className="create_section_input_title">Caption BG</span>

						<input type="text" className="form_input" name="media_caption_bg" {...register("media_caption_bg")} />
						{errors.media_caption_bg && (
							<p className="text-xs italic text-red-500 mt-2"> {errors.media_caption_bg?.message} </p>
						)}
					</label>

					{/* Media Credit */}
					<label>
						<span className="create_section_input_title">Credit</span>
						<span className="create_section_input_title_small">Image source under image (right corner)</span>

						<input
							type="text"
							placeholder="Text with embedded HTML"
							className="form_input"
							name="media_credit"
							{...register("media_credit")}
						/>
						{errors.media_credit && (
							<p className="text-xs italic text-red-500 mt-2"> {errors.media_credit?.message} </p>
						)}
					</label>

					{/* Media Thumbnail */}
					<label>
						<span className="create_section_input_title">Thumbnail</span>
						<span className="create_section_input_title_small">
							A URL for an image (icon) to use in the timenav marker for this event
						</span>

						<input
							type="text"
							placeholder="https://example.com/icon.svg"
							className="form_input"
							name="media_thumbnail"
							{...register("media_thumbnail")}
						/>
						{errors.media_thumbnail && (
							<p className="text-xs italic text-red-500 mt-2"> {errors.media_thumbnail?.message} </p>
						)}
					</label>

					<div className="flex-end mx-3 my-[18px] gap-4">
						<Link href="/edit-element" locale={locale} className="text-gray-500 text-sm">
							Cancel
						</Link>

						<button type="submit" disabled={isSubmitting} className="green_btn">
							{isSubmitting ? `${type}ing...` : type}
						</button>
					</div>
				</section>
			</form>
		</section>
	);
};
export default FormCollection;
