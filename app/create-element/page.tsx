"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";


const CreateElement = () => {
    const router = useRouter();
    const [submitting, setIsSubmitting] = useState<boolean>(false);
    const [element, setElement] = useState({
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
                    start_year: element.start_year,
                    start_month: element.start_month,
                    start_day: element.start_day,
                    start_hour: element.start_hour,
                    end_year: element.end_year,
                    end_month: element.end_month,
                    end_day: element.end_day,
                    end_hour: element.end_hour,
                    display_date_en: element.display_date_en,
                    display_date_bg: element.display_date_bg,
                    headline_en: element.headline_en,
                    headline_bg: element.headline_bg,
                    text_en: element.text_en,
                    text_bg: element.text_bg,
                    group: element.group,
                    background_url: element.background_url,
                    background_color: element.background_color,
                    media_url: element.media_url,
                    media_caption_en: element.media_caption_en,
                    media_caption_bg: element.media_caption_bg,
                    media_credit: element.media_credit,
                    media_thumbnail: element.media_thumbnail,
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
            element={element}
            setElement={setElement}
            submitting={submitting}
            handleSubmit={createElement}
        />
    )
}
export default CreateElement;