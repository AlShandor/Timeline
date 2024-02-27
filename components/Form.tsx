import Link from "next/link";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

const Form = ({ type, element, setElement, submitting, handleSubmit }) => {
    const inputProps = {
		className: "tags_input",
		placeholder: "Add a tag",
	};

    const tagProps = {
		className: "tags_card",
		classNameRemove: "tags_card_remove",
	};

    return (
        <section className='w-full max-w-full flex-start flex-col'>
            <h1 className='head_text text-left cursor-default'>
                <span className='blue_gradient'>{type} Timeline Element</span>
            </h1>
            <p className='desc text-left max-w-md cursor-default'>
                {type} historical events and figures for the Timeline.
            </p>

            <form
                onSubmit={handleSubmit}
                className='mt-10 w-full flex flex-row gap-5'
            >

                {/* Date Section */}
                <section className="create_section">
                    <label>
                        <h1 className='create_section_title'>Date Section</h1>
                        <hr className="solid"></hr>
                    </label>

                    {/* Start Year */}
                    <div className="flex flex-row gap-4">
                        <label className="w-full">
                            <span className='create_section_input_title'>
                                Start Year<span className="required">*</span>
                            </span>

                            <input
                                value={element.start_year || ""}
                                onChange={(e) => setElement({ ...element, start_year: e.target.value })}
                                type='text'
                                placeholder='example: 2024'
                                required
                                className='form_input'
                                name="start_year"
                            />
                        </label>

                        {/* Start Month */}
                        <label className="text-center min-w-[60px]">
                            <span className='small-span create_section_input_title'>
                                Month
                            </span>

                            <input
                                value={element.start_month || ""}
                                onChange={(e) => setElement({ ...element, start_month: e.target.value })}
                                type='text'
                                placeholder='1-12'
                                className='form_input_small'
                                name="start_month"
                            />
                        </label>

                        {/* Start Day */}
                        <label className="text-center min-w-[60px]">
                            <span className='small-span create_section_input_title'>
                                Day
                            </span>

                            <input
                                value={element.start_day || ""}
                                onChange={(e) => setElement({ ...element, start_day: e.target.value })}
                                type='text'
                                placeholder='1-31'
                                className='form_input_small'
                                name="start_day"
                            />
                        </label>

                        {/* Start Hour */}
                        <label className="text-center min-w-[60px]">
                            <span className='small-span create_section_input_title'>
                                Hour
                            </span>

                            <input
                                value={element.start_hour || ""}
                                onChange={(e) => setElement({ ...element, start_hour: e.target.value })}
                                type='text'
                                placeholder='0-23'
                                className='form_input_small'
                                name="start_hour"
                            />
                        </label>
                    </div>

                    {/* End Year */}
                    <div className="flex flex-row gap-4">
                        <label className="w-full">
                            <span className='create_section_input_title'>
                                End Year
                            </span>

                            <input
                                value={element.end_year || ""}
                                onChange={(e) => setElement({ ...element, end_year: e.target.value })}
                                type='text'
                                placeholder='example: 2025'
                                className='form_input'
                                name="end_year"
                            />
                        </label>

                        {/* End Month */}
                        <label className="text-center min-w-[60px]">
                            <span className='small-span create_section_input_title'>
                                Month
                            </span>

                            <input
                                value={element.end_month || ""}
                                onChange={(e) => setElement({ ...element, end_month: e.target.value })}
                                type='text'
                                placeholder='1-12'
                                className='form_input_small'
                                name="end_month"
                            />
                        </label>

                        {/* End Day */}
                        <label className="text-center min-w-[60px]">
                            <span className='small-span create_section_input_title'>
                                Day
                            </span>

                            <input
                                value={element.end_day || ""}
                                onChange={(e) => setElement({ ...element, end_day: e.target.value })}
                                type='text'
                                placeholder='1-31'
                                className='form_input_small'
                                name="end_day"
                            />
                        </label>

                        {/* End Hour */}
                        <label className="text-center min-w-[60px]">
                            <span className='small-span create_section_input_title'>
                                Hour
                            </span>

                            <input
                                value={element.end_hour || ""}
                                onChange={(e) => setElement({ ...element, end_hour: e.target.value })}
                                type='text'
                                placeholder='0-23'
                                className='form_input_small'
                                name="end_hour"
                            />
                        </label>
                    </div>

                    {/* Display Date EN */}
                    <label>
                        <span className='create_section_input_title'>
                            Display Date EN
                        </span>
                        <span className="create_section_input_title_small">String presenting the date</span>

                        <input
                            value={element.display_date_en}
                            onChange={(e) => setElement({ ...element, display_date_en: e.target.value })}
                            type='text'
                            placeholder='example: "BCE 29, Spring"'
                            className='form_input'
                            name="display_date_en"
                        />
                    </label>

                    {/* Display Date BG */}
                    <label>
                        <span className='create_section_input_title'>
                            Display Date BG
                        </span>

                        <input
                            value={element.display_date_bg}
                            onChange={(e) => setElement({ ...element, display_date_bg: e.target.value })}
                            type='text'
                            className='form_input'
                            name="display_date_bg"
                        />
                    </label>
                </section>

                {/* Text Section */}
                <section className="create_section">
                    <label>
                        <h1 className='create_section_title'>Text Section</h1>
                        <hr className="solid"></hr>
                    </label>

                    {/* Headline EN*/}
                    <label>
                        <span className='create_section_input_title'>
                            Title EN<span className="required">*</span>
                        </span>
                        <span className="create_section_input_title_small">Person or Event Description</span>

                        <input
                            value={element.headline_en}
                            onChange={(e) => setElement({ ...element, headline_en: e.target.value })}
                            type='text'
                            placeholder='example: "David", "David Becomes King"'
                            required
                            className='form_input'
                            name="headline_en"
                        />
                    </label>

                    {/* Headline BG*/}
                    <label>
                        <span className='create_section_input_title'>
                            Title BG<span className="required">*</span>
                        </span>

                        <input
                            value={element.headline_bg}
                            onChange={(e) => setElement({ ...element, headline_bg: e.target.value })}
                            type='text'
                            required
                            className='form_input'
                            name="headline_bg"
                        />
                    </label>

                    {/* Text EN */}
                    <label>
                        <span className='create_section_input_title'>
                            Text EN
                        </span>

                        <textarea
                            value={element.text_en}
                            onChange={(e) => setElement({ ...element, text_en: e.target.value })}
                            placeholder='Text and HTML'
                            className='form_textarea'
                            name="text_en"
                        />
                    </label>

                    {/* Text BG */}
                    <label>
                        <span className='create_section_input_title'>
                            Text BG
                        </span>

                        <textarea
                            value={element.text_bg}
                            onChange={(e) => setElement({ ...element, text_bg: e.target.value })}
                            className='form_textarea'
                            name="text_bg"
                        />
                    </label>

                    {/* Tags */}
                    <label>
                        <span className='create_section_input_title'>
                            Tags
                        </span>

                        <TagsInput className="form_tags" focusedClassName="form_tags_focused" inputProps={inputProps} tagProps={tagProps} value={element.tags} onlyUnique="true" onChange={(t) => setElement( { ...element, tags: t }) } />
                    </label>
                </section>

                {/* Media Section */}
                <section className="create_section">
                    <label>
                        <h1 className='create_section_title'>Media Section</h1>
                        <hr className="solid"></hr>
                    </label>

                    {/* Background URL */}
                    <label>
                        <span className='create_section_input_title'>
                            Background URL
                        </span>

                        <input
                            value={element.background_url}
                            onChange={(e) => setElement({ ...element, background_url: e.target.value })}
                            type='text'
                            placeholder='https://example.com'
                            className='form_input'
                            name="background_url"
                        />
                    </label>

                    {/* Background Color */}
                    <label>
                        <span className='create_section_input_title'>
                            Background Color
                        </span>

                        <input
                            value={element.background_color}
                            onChange={(e) => setElement({ ...element, background_color: e.target.value })}
                            type='text'
                            placeholder='example: #04AEEF'
                            className='form_input'
                            name="background_color"
                        />
                    </label>

                    {/* Media URL */}
                    <label>
                        <span className='create_section_input_title'>
                            Image URL
                        </span>

                        <input
                            value={element.media_url}
                            onChange={(e) => setElement({ ...element, media_url: e.target.value })}
                            type='text'
                            placeholder='https://example.com'
                            className='form_input'
                            name="media_url"
                        />
                    </label>

                    {/* Media Caption EN */}
                    <label>
                        <span className='create_section_input_title'>
                            Caption EN
                        </span>
                        <span className="create_section_input_title_small">Description under image</span>

                        <input
                            value={element.media_caption_en}
                            onChange={(e) => setElement({ ...element, media_caption_en: e.target.value })}
                            type='text'
                            placeholder='Text and HTML'
                            className='form_input'
                            name="media_caption_en"
                        />
                    </label>

                    {/* Media Caption BG */}
                    <label>
                        <span className='create_section_input_title'>
                            Caption BG
                        </span>

                        <input
                            value={element.media_caption_bg}
                            onChange={(e) => setElement({ ...element, media_caption_bg: e.target.value })}
                            type='text'
                            className='form_input'
                            name="media_caption_bg"
                        />
                    </label>

                    {/* Media Credit */}
                    <label>
                        <span className='create_section_input_title'>
                            Credit
                        </span>
                        <span className="create_section_input_title_small">Image source under image (right corner)</span>

                        <input
                            value={element.media_credit}
                            onChange={(e) => setElement({ ...element, media_credit: e.target.value })}
                            type='text'
                            placeholder='Text and HTML'
                            className='form_input'
                            name="media_credit"
                        />
                    </label>

                    {/* Media Thumbnail */}
                    <label>
                        <span className='create_section_input_title'>
                            Thumbnail
                        </span>
                        <span className="create_section_input_title_small">A URL for an image (icon) to use in the timenav marker for this event</span>

                        <input
                            value={element.media_thumbnail}
                            onChange={(e) => setElement({ ...element, media_thumbnail: e.target.value })}
                            type='text'
                            placeholder='https://example.com/icon.svg'
                            className='form_input'
                            name="media_thumbnail"
                        />
                    </label>

                    <div className='flex-end mx-3 my-[18px] gap-4'>
                        <Link href='/edit-element' className='text-gray-500 text-sm'>
                            Cancel
                        </Link>

                        <button
                            type='submit'
                            disabled={submitting}
                            className='px-5 py-1.5 text-sm bg-primary-orange rounded-lg text-white'
                        >
                            {submitting ? `${type}ing...` : type}
                        </button>
                    </div>
                </section>
            </form>
        </section>
    )
}
export default Form;