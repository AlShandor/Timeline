"use client"

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";


const EditElement = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const elementId = searchParams.get("id");

    const [submitting, setIsSubmitting] = useState(false);
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

    useEffect(() => {
        const getElementDetails = async () => {
            const response = await fetch(`/api/element/${elementId}`);
            const data = await response.json();

            setElement({
                start_year: data.start_year,
                start_month: data.start_month,
                start_day: data.start_day,
                start_hour: data.start_hour,
                end_year: data.end_year,
                end_month: data.end_month,
                end_day: data.end_day,
                end_hour: data.end_hour,
                display_date_en: data.display_date_en,
                display_date_bg: data.display_date_bg,
                headline_en: data.headline_en,
                headline_bg: data.headline_bg,
                text_en: data.text_en,
                text_bg: data.text_bg,
                group: data.group,
                background_url: data.background_url,
                background_color: data.background_color,
                media_url: data.media_url,
                media_caption_en: data.media_caption_en,
                media_caption_bg: data.media_caption_bg,
                media_credit: data.media_credit,
                media_thumbnail: data.media_thumbnail,
            });
        };

        if (elementId) {
            getElementDetails();
        }
    }, [elementId]);

    const updateElement = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!elementId) {
            return alert("Missing ElementId!");
        }

        try {
            const response = await fetch(`/api/element/${elementId}`, {
                method: "PATCH",
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
                router.push("/edit-element");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form
            type="Edit"
            element={element}
            setElement={setElement}
            submitting={submitting}
            handleSubmit={updateElement}
        />
    )
}
export default EditElement;