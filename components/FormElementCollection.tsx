import Feed from "./Feed";

const FormElementCollection = ({
	type,
	elements,
	setElements,
	handleSelectElement,
	handleSelectAllElements,
	handleRemoveElement,
	handleRemoveAllElements,
	selected,
	isSelected,
	onSubmit,
	isSubmitting,
    handleSubmit,
    register,
    errors,
}) => {
	return (
		<section className="w-full max-w-full flex-start flex-col">
			<h1 className="head_text text-left cursor-default">
				<span className="blue_gradient">
					{type} Timeline Collection
				</span>
			</h1>
			<p className="desc text-left max-w-md cursor-default">
				{type} Collection of historical events and figures for the
				Timeline.
			</p>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className="mt-10 w-full flex flex-col gap-5"
			>
				{/* Title EN*/}
				<label>
					<span className="create_section_input_title">
						Title EN<span className="required">*</span>
					</span>

					<input
						type="text"
						required
						className="form_input max-w-[500px]"
						name="title_en"
						{...register("title_en")}
					/>
					{errors.title_en && (
						<p className="text-xs italic text-red-500 mt-2">
							{" "}
							{errors.title_en?.message}{" "}
						</p>
					)}
				</label>

				{/* Title BG*/}
				<label>
					<span className="create_section_input_title">
						Title BG<span className="required">*</span>
					</span>

					<input
						type="text"
						required
						className="form_input max-w-[500px]"
						name="title_bg"
						{...register("title_bg")}
					/>
					{errors.title_bg && (
						<p className="text-xs italic text-red-500 mt-2">
							{" "}
							{errors.title_bg?.message}{" "}
						</p>
					)}
				</label>

				{/* Img URL*/}
				<label>
					<span className="create_section_input_title">
						Image URL
					</span>

					<input
						type="text"
						className="form_input max-w-[500px]"
						name="img_url"
						{...register("img_url")}
					/>
					{errors.img_url && (
						<p className="text-xs italic text-red-500 mt-2">
							{" "}
							{errors.img_url?.message}{" "}
						</p>
					)}
				</label>

				<button
					type="submit"
					disabled={isSubmitting}
					className="green_btn"
				>
					{isSubmitting ? `${type}ing...` : type}
				</button>
			</form>

			<Feed
				elements={elements}
				setElements={setElements}
				handleSelectElement={handleSelectElement}
				handleSelectAllElements={handleSelectAllElements}
				handleRemoveElement={handleRemoveElement}
				handleRemoveAllElements={handleRemoveAllElements}
				selected={selected}
				isSelected={isSelected}
			/>
		</section>
	);
};

export default FormElementCollection;
