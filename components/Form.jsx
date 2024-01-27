import Link from "next/link";

const Form = ({
    type,
    post,
    setPost,
    submitting,
    handleSubmit
}) => {
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
                                value={post.start_year}
                                onChange={(e) => setPost({ ...post, start_year: e.target.value })}
                                type='text'
                                placeholder='example: 2024'
                                required
                                className='form_input'
                            />
                        </label>

                        {/* Start Month */}
                        <label className="text-center min-w-[60px]">
                            <span className='small-span create_section_input_title'>
                                Month
                            </span>

                            <input
                                value={post.start_month}
                                onChange={(e) => setPost({ ...post, start_month: e.target.value })}
                                type='text'
                                placeholder='1-12'
                                className='form_input_small'
                            />
                        </label>

                        {/* Start Day */}
                        <label className="text-center min-w-[60px]">
                            <span className='small-span create_section_input_title'>
                                Day
                            </span>

                            <input
                                value={post.start_day}
                                onChange={(e) => setPost({ ...post, start_day: e.target.value })}
                                type='text'
                                placeholder='1-31'
                                className='form_input_small'
                            />
                        </label>

                        {/* Start Hour */}
                        <label className="text-center min-w-[60px]">
                            <span className='small-span create_section_input_title'>
                                Hour
                            </span>

                            <input
                                value={post.start_hour}
                                onChange={(e) => setPost({ ...post, start_hour: e.target.value })}
                                type='text'
                                placeholder='0-23'
                                className='form_input_small'
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
                                value={post.end_year}
                                onChange={(e) => setPost({ ...post, end_year: e.target.value })}
                                type='text'
                                placeholder='example: 2025'
                                className='form_input'
                            />
                        </label>

                        {/* End Month */}
                        <label className="text-center min-w-[60px]">
                            <span className='small-span create_section_input_title'>
                                Month
                            </span>

                            <input
                                value={post.end_month}
                                onChange={(e) => setPost({ ...post, end_month: e.target.value })}
                                type='text'
                                placeholder='1-12'
                                className='form_input_small'
                            />
                        </label>

                        {/* End Day */}
                        <label className="text-center min-w-[60px]">
                            <span className='small-span create_section_input_title'>
                                Day
                            </span>

                            <input
                                value={post.end_day}
                                onChange={(e) => setPost({ ...post, end_day: e.target.value })}
                                type='text'
                                placeholder='1-31'
                                className='form_input_small'
                            />
                        </label>

                        {/* End Hour */}
                        <label className="text-center min-w-[60px]">
                            <span className='small-span create_section_input_title'>
                                Hour
                            </span>

                            <input
                                value={post.end_hour}
                                onChange={(e) => setPost({ ...post, end_hour: e.target.value })}
                                type='text'
                                placeholder='0-23'
                                className='form_input_small'
                            />
                        </label>
                    </div>

                    {/* Display Date EN */}
                    <label>
                        <span className='create_section_input_title'>
                            Display Date EN
                        </span>
                        <span className="small-label">String presenting the date</span>

                        <input
                            value={post.display_date_en}
                            onChange={(e) => setPost({ ...post, display_date_en: e.target.value })}
                            type='text'
                            placeholder='example: "BCE 29, Spring"'
                            className='form_input'
                        />
                    </label>

                    {/* Display Date BG */}
                    <label>
                        <span className='create_section_input_title'>
                            Display Date BG
                        </span>

                        <input
                            value={post.display_date_bg}
                            onChange={(e) => setPost({ ...post, display_date_bg: e.target.value })}
                            type='text'
                            className='form_input'
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
                            Headline EN<span className="required">*</span>
                        </span>
                        <span className="small-label">Person or Event Description</span>

                        <input
                            value={post.headline_en}
                            onChange={(e) => setPost({ ...post, headline_en: e.target.value })}
                            type='text'
                            placeholder='example: "David", "David Becomes King"'
                            required
                            className='form_input'
                        />
                    </label>

                    {/* Headline BG*/}
                    <label>
                        <span className='create_section_input_title'>
                            Headline BG<span className="required">*</span>
                        </span>

                        <input
                            value={post.headline_bg}
                            onChange={(e) => setPost({ ...post, headline_bg: e.target.value })}
                            type='text'
                            required
                            className='form_input'
                        />
                    </label>

                    {/* Text EN */}
                    <label>
                        <span className='create_section_input_title'>
                            Text EN
                        </span>

                        <textarea
                            value={post.text_en}
                            onChange={(e) => setPost({ ...post, text_en: e.target.value })}
                            placeholder='Text and HTML'
                            className='form_textarea'
                        />
                    </label>

                    {/* Text BG */}
                    <label>
                        <span className='create_section_input_title'>
                            Text BG
                        </span>

                        <textarea
                            value={post.text_bg}
                            onChange={(e) => setPost({ ...post, text_bg: e.target.value })}
                            className='form_textarea'
                        />
                    </label>

                    {/* Group */}
                    <label>
                        <span className='create_section_input_title'>
                            Group
                        </span>
                        <span className="small-label">If present, Timeline will organize events with the same value for group to be in the same row or adjacent rows, separate from events in other groups</span>

                        <input
                            value={post.group}
                            onChange={(e) => setPost({ ...post, group: e.target.value })}
                            type='text'
                            placeholder='Text'
                            className='form_input'
                        />
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
                            value={post.background_url}
                            onChange={(e) => setPost({ ...post, background_url: e.target.value })}
                            type='text'
                            placeholder='https://example.com'
                            className='form_input'
                        />
                    </label>

                    {/* Background Color */}
                    <label>
                        <span className='create_section_input_title'>
                            Background Color
                        </span>

                        <input
                            value={post.background_color}
                            onChange={(e) => setPost({ ...post, background_color: e.target.value })}
                            type='text'
                            placeholder='example: #04AEEF'
                            className='form_input'
                        />
                    </label>

                    {/* Media URL */}
                    <label>
                        <span className='create_section_input_title'>
                            Image URL
                        </span>

                        <input
                            value={post.media_url}
                            onChange={(e) => setPost({ ...post, media_url: e.target.value })}
                            type='text'
                            placeholder='https://example.com'
                            className='form_input'
                        />
                    </label>

                    {/* Media Caption EN */}
                    <label>
                        <span className='create_section_input_title'>
                            Caption EN
                        </span>
                        <span className="small-label">Description under image</span>

                        <input
                            value={post.media_caption_en}
                            onChange={(e) => setPost({ ...post, media_caption_en: e.target.value })}
                            type='text'
                            placeholder='Text and HTML'
                            className='form_input'
                        />
                    </label>

                    {/* Media Caption BG */}
                    <label>
                        <span className='create_section_input_title'>
                            Caption BG
                        </span>

                        <input
                            value={post.media_caption_bg}
                            onChange={(e) => setPost({ ...post, media_caption_bg: e.target.value })}
                            type='text'
                            className='form_input'
                        />
                    </label>

                    {/* Media Credit */}
                    <label>
                        <span className='create_section_input_title'>
                            Credit
                        </span>
                        <span className="small-label">Image source under image (right corner)</span>

                        <input
                            value={post.media_credit}
                            onChange={(e) => setPost({ ...post, media_credit: e.target.value })}
                            type='text'
                            placeholder='Text and HTML'
                            className='form_input'
                        />
                    </label>

                    {/* Media Thumbnail */}
                    <label>
                        <span className='create_section_input_title'>
                            Thumbnail
                        </span>
                        <span className="small-label">A URL for an image (icon) to use in the timenav marker for this event</span>

                        <input
                            value={post.media_thumbnail}
                            onChange={(e) => setPost({ ...post, media_thumbnail: e.target.value })}
                            type='text'
                            placeholder='https://example.com/icon.svg'
                            className='form_input'
                        />
                    </label>

                    <div className='flex-end mx-3 my-[18px] gap-4'>
                        <Link href='/' className='text-gray-500 text-sm'>
                            Cancel
                        </Link>

                        <button
                            type='submit'
                            disabled={submitting}
                            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
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