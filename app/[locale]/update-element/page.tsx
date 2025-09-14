"use client"

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FormElement from "@components/FormElement";

// Zod
import * as z from "zod";
import { elementSchema } from "@utilities/validator";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormFields = z.infer<typeof elementSchema>;

function UpdateElementContent() {
    const router = useRouter();
    const [tags, setTags] = useState([]);
    const searchParams = useSearchParams();
    const elementId = searchParams.get("id");

    const getElementDetails = async () => {
        try {
            const response = await fetch(`/api/element/${elementId}`);
            const data = await response.json();
            setTags(data.tags);

            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>({
		resolver: zodResolver(elementSchema),
		defaultValues: getElementDetails,
	});

    const updateElement: SubmitHandler<FormFields> = async (formData) => {
		if (!elementId) {
			return alert("Missing ElementId!");
		}
        
		try {
            formData.tags = tags;

			const response = await fetch(`/api/element/${elementId}`, {
				method: "PATCH",
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				router.push("/edit-element");
			}
		} catch (error) {
			console.log(error);
		}
	};

    return (
		<FormElement
			type="Edit"
			isSubmitting={isSubmitting}
			onSubmit={updateElement}
			register={register}
			handleSubmit={handleSubmit}
			errors={errors}
			tags={tags}
			setTags={setTags}
		/>
	);
}

const UpdateElement = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <UpdateElementContent />
        </Suspense>
    );
}

export default UpdateElement;
