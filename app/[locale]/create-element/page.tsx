"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormElement from "@components/FormElement";

// Zod
import * as z from "zod";
import { elementDefaultValues, elementSchema } from "@utilities/validator";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormFields = z.infer<typeof elementSchema>;
const DEFAULT_IMG_URL = "https://cms-imgp.jw-cdn.org/img/p/1011569/univ/art/1011569_univ_lsr_md.jpg";
const DEFAULT_BACKGROUND_URL = "https://cms-imgp.jw-cdn.org/img/p/1011718/univ/art/1011718_univ_cnt_1_xl.jpg";



const CreateElement = () => {
    const router = useRouter();
    const [tags, setTags] = useState([]);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>({
		resolver: zodResolver(elementSchema),
		defaultValues: elementDefaultValues,
	});

	const createElement: SubmitHandler<FormFields> = async (formData) => {
		try {
            formData.tags = tags;
            formData.background_url = formData.background_url ? formData.background_url : DEFAULT_BACKGROUND_URL;
            formData.media_url = formData.media_url ? formData.media_url : DEFAULT_IMG_URL;

			const response = await fetch("/api/element/new", {
				method: "POST",
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				router.push("/");
			}
		} catch (error) {
			console.log(error);
		}
	};

    return (
		<FormElement
			type="Create"
			isSubmitting={isSubmitting}
			onSubmit={createElement}
			register={register}
			handleSubmit={handleSubmit}
			errors={errors}
			tags={tags}
			setTags={setTags}
		/>
	);
}

export default CreateElement;
