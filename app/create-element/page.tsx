"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

// Zod
import * as z from "zod";
import { elementDefaultValues, elementSchema } from "@utilities/validator";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormFields = z.infer<typeof elementSchema>;

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
            formData.media_url = formData.media_url ? formData.media_url : "https://cms-imgp.jw-cdn.org/img/p/1102013269/univ/art/1102013269_univ_lsr_lg.jpg";

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
		<Form
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