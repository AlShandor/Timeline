"use client";

import { useState } from "react";
import FormElementCollection from "@components/FormElementCollection";
import { useEvents } from "@hooks/useEvents";
import { useRouter } from "next/navigation";

// Zod
import * as z from "zod";
import { elementCollectionDefaultValues, elementCollectionSchema } from "@utilities/validator";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormFields = z.infer<typeof elementCollectionSchema>;
const DEFAULT_IMG_URL = "https://cms-imgp.jw-cdn.org/img/p/1102013269/univ/art/1102013269_univ_lsr_lg.jpg"



const CreateElementCollection = () => {
    const router = useRouter();
    const [elements, setElements] = useState<Array<IElement>>([]);
	const { selected, setSelected, isSelected } = useEvents();

	const handleSelectElement = (newEl) => {
		setSelected((selected) => [...selected, newEl]);
	};

	const handleSelectAllElements = () => {
		setSelected(elements);
	};

	const handleRemoveElement = (el) => {
		const filteredElements = selected.filter((item) => item._id !== el._id);
		setSelected(filteredElements);
	};

	const handleRemoveAllElements = () => {
		setSelected([]);
	};

    const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormFields>({
		resolver: zodResolver(elementCollectionSchema),
		defaultValues: elementCollectionDefaultValues,
	});

    const createElementCollection: SubmitHandler<FormFields> = async (formData) => {
		try {
            formData.elements = selected;
			formData.img_url = formData.img_url ? formData.img_url : DEFAULT_IMG_URL;

			const response = await fetch("/api/element-collection/new", {
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
		<FormElementCollection
			type="Create"
			elements={elements}
			setElements={setElements}
			handleSelectElement={handleSelectElement}
			handleSelectAllElements={handleSelectAllElements}
			handleRemoveElement={handleRemoveElement}
			handleRemoveAllElements={handleRemoveAllElements}
			selected={selected}
			isSelected={isSelected}
			onSubmit={createElementCollection}
			isSubmitting={isSubmitting}
			handleSubmit={handleSubmit}
			register={register}
            errors={errors}
		/>
	);
};

export default CreateElementCollection;
