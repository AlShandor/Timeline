"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";


const CreateElement = () => {
    const router = useRouter();
    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({
        start_year: "",
        start_month: "",
        start_day: "",
        start_hour: "",
        end_year: "",
        end_month: "",
        end_day: "",
        end_hour: "",
        display_date_en: "",
        display_date_bg: "",
        headline_en: "",
        headline_bg: "",
        text_en: "",
        text_bg: "",
        group: "",
        background_url: "",
        background_color: "",
        media_url: "",
        media_caption_en: "",
        media_caption_bg: "",
        media_credit: "",
        media_thumbnail: "",
    });

    const createElement = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/element/new", {
                method: "POST",
                body: JSON.stringify({
                    start_year: post.start_year,
                    start_month: post.start_month,
                    start_day: post.start_day,
                    start_hour: post.start_hour,
                    end_year: post.end_year,
                    end_month: post.end_month,
                    end_day: post.end_day,
                    end_hour: post.end_hour,
                    display_date_en: post.display_date_en,
                    display_date_bg: post.display_date_bg,
                    headline_en: post.headline_en,
                    headline_bg: post.headline_bg,
                    text_en: post.text_en,
                    text_bg: post.text_bg,
                    group: post.group,
                    background_url: post.background_url,
                    background_color: post.background_color,
                    media_url: post.media_url,
                    media_caption_en: post.media_caption_en,
                    media_caption_bg: post.media_caption_bg,
                    media_credit: post.media_credit,
                    media_thumbnail: post.media_thumbnail,
                }),
            });

            if (response.ok) {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createElement}
        />
    )
}
export default CreateElement;