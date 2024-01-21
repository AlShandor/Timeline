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
                <span className='blue_gradient'>{type} Element</span>
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
                        <h1 className='mt-5 mb-1 text-2xl leading-[1.15] text-gray-400 cursor-default'>Date Section</h1>
                        <hr className="solid"></hr>
                    </label>

                    {/* Start Year */}
                    <label>
                        <span className='font-satoshi font-semibold text-base text-gray-700'>
                            Start Year<span className="required">*</span>
                        </span>

                        <input
                            value={post.start_year}
                            onChange={(e) => setPost({ ...post, start_year: e.target.value })}
                            type='text'
                            placeholder='Integer (example: 2024)'
                            required
                            className='form_input'
                        />
                    </label>

                    {/* Start Month */}
                    <label className="ml-12">
                        <span className='font-satoshi font-semibold text-base text-gray-700'>
                            Start Month
                        </span>

                        <input
                            value={post.start_month}
                            onChange={(e) => setPost({ ...post, start_month: e.target.value })}
                            type='text'
                            placeholder='1-12'
                            className='form_input'
                        />
                    </label>

                    {/* Start Day */}
                    <label className="ml-12">
                        <span className='font-satoshi font-semibold text-base text-gray-700'>
                            Start Day
                        </span>

                        <input
                            value={post.start_day}
                            onChange={(e) => setPost({ ...post, start_day: e.target.value })}
                            type='text'
                            placeholder='Integer'
                            className='form_input'
                        />
                    </label>

                    {/* Start Hour */}
                    <label className="ml-12">
                        <span className='font-satoshi font-semibold text-base text-gray-700'>
                            Start Hour
                        </span>

                        <input
                            value={post.start_hour}
                            onChange={(e) => setPost({ ...post, start_hour: e.target.value })}
                            type='text'
                            placeholder='0-23'
                            className='form_input'
                        />
                    </label>

                    {/* End Year */}
                    <label>
                        <span className='font-satoshi font-semibold text-base text-gray-700'>
                            End Year
                        </span>

                        <input
                            value={post.end_year}
                            onChange={(e) => setPost({ ...post, end_year: e.target.value })}
                            type='text'
                            placeholder='Integer (example: 2024)'
                            className='form_input'
                        />
                    </label>

                    {/* End Month */}
                    <label className="ml-12">
                        <span className='font-satoshi font-semibold text-base text-gray-700'>
                            End Month
                        </span>

                        <input
                            value={post.end_month}
                            onChange={(e) => setPost({ ...post, end_month: e.target.value })}
                            type='text'
                            placeholder='1-12'
                            className='form_input'
                        />
                    </label>

                    {/* End Day */}
                    <label className="ml-12">
                        <span className='font-satoshi font-semibold text-base text-gray-700'>
                            End Day
                        </span>

                        <input
                            value={post.end_day}
                            onChange={(e) => setPost({ ...post, end_day: e.target.value })}
                            type='text'
                            placeholder='Integer'
                            className='form_input'
                        />
                    </label>

                    {/* End Hour */}
                    <label className="ml-12">
                        <span className='font-satoshi font-semibold text-base text-gray-700'>
                            End Hour
                        </span>

                        <input
                            value={post.end_hour}
                            onChange={(e) => setPost({ ...post, end_hour: e.target.value })}
                            type='text'
                            placeholder='Integer'
                            className='form_input'
                        />
                    </label>

                    {/* Display Date */}
                    <label>
                        <span className='font-satoshi font-semibold text-base text-gray-700'>
                            Display Date
                        </span>

                        <input
                            value={post.display_date}
                            onChange={(e) => setPost({ ...post, display_date: e.target.value })}
                            type='text'
                            placeholder='A string for presenting the date. ("BCE 29, Spring")'
                            className='form_input'
                        />
                    </label>
                </section>


                {/* Text Section */}
                <section className="create_section">
                    <label>
                        <h1 className='mt-5 mb-1 text-2xl leading-[1.15] text-gray-400 cursor-default'>Text Section</h1>
                        <hr className="solid"></hr>
                    </label>

                    {/* Headline */}
                    <label>
                        <span className='font-satoshi font-semibold text-base text-gray-700'>
                            Headline<span className="required">*</span>
                        </span>

                        <input
                            value={post.headline}
                            onChange={(e) => setPost({ ...post, headline: e.target.value })}
                            type='text'
                            placeholder='Person or Event Description ("David", "David Becomes King")'
                            required
                            className='form_input'
                        />
                    </label>

                    {/* Text */}
                    <label>
                        <span className='font-satoshi font-semibold text-base text-gray-700'>
                            Text
                        </span>

                        <textarea
                            value={post.text}
                            onChange={(e) => setPost({ ...post, text: e.target.value })}
                            placeholder='Any text. HTML markup is OK'
                            className='form_textarea'
                        />
                    </label>

                    {/* Group */}
                    <label>
                        <span className='font-satoshi font-semibold text-base text-gray-700'>
                            Group
                        </span>

                        <input
                            value={post.group}
                            onChange={(e) => setPost({ ...post, group: e.target.value })}
                            type='text'
                            placeholder='Any text. If present, Timeline will organize events with the same value for group to be in the same row or adjacent rows, separate from events in other groups. '
                            className='form_input'
                        />
                    </label>
                </section>

                {/* Media Section */}
                <section className="create_section">
                    <label>
                        <h1 className='mt-5 mb-1 text-2xl leading-[1.15] text-gray-400 cursor-default'>Media Section</h1>
                        <hr className="solid"></hr>
                    </label>

                    {/* Background URL */}
                    <label>
                        <span className='font-satoshi font-semibold text-base text-gray-700'>
                            Background URL
                        </span>

                        <input
                            value={post.background_url}
                            onChange={(e) => setPost({ ...post, background_url: e.target.value })}
                            type='text'
                            placeholder='URL: https://example.com'
                            className='form_input'
                        />
                    </label>

                    {/* Background Color */}
                    <label>
                        <span className='font-satoshi font-semibold text-base text-gray-700'>
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
                        <span className='font-satoshi font-semibold text-base text-gray-700'>
                            Media URL
                        </span>

                        <input
                            value={post.media_url}
                            onChange={(e) => setPost({ ...post, media_url: e.target.value })}
                            type='text'
                            placeholder='https://example.com'
                            className='form_input'
                        />
                    </label>

                    {/* Media Caption */}
                    <label>
                        <span className='font-satoshi font-semibold text-base text-gray-700'>
                            Media Caption
                        </span>

                        <input
                            value={post.media_caption}
                            onChange={(e) => setPost({ ...post, media_caption: e.target.value })}
                            type='text'
                            placeholder='Description under image. Any text. HTML markup is OK.'
                            className='form_input'
                        />
                    </label>

                    {/* Media Credit */}
                    <label>
                        <span className='font-satoshi font-semibold text-base text-gray-700'>
                            Media Credit
                        </span>

                        <input
                            value={post.media_credit}
                            onChange={(e) => setPost({ ...post, media_credit: e.target.value })}
                            type='text'
                            placeholder='Image source under image (right corner). Any text. HTML markup is OK.'
                            className='form_input'
                        />
                    </label>

                    {/* Media Thumbnail */}
                    <label>
                        <span className='font-satoshi font-semibold text-base text-gray-700'>
                            Media Thumbnail
                        </span>

                        <input
                            value={post.media_thumbnail}
                            onChange={(e) => setPost({ ...post, media_thumbnail: e.target.value })}
                            type='text'
                            placeholder='A URL for an image (icon) to use in the timenav marker for this event.'
                            className='form_input'
                        />
                    </label>
                </section>
            </form>
        </section>
    )
}
export default Form;