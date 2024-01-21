"use client"

import { createElement, useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";


const CreateElement = () => {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        headline_en: "",
        headline_bg: "",
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
        text_en: "",
        text_bg: "",
        background_url: "",
        background_color: "",
        media_url: "",
        media_caption_en: "",
        media_caption_bg: "",
        media_credit: "",
        media_thumbnail: "",
        group: "",
    });

    const CreateElement = async (e) => {

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