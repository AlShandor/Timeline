"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FormElementCollection from "@components/FormElementCollection";
import { useEvents } from "@hooks/useEvents";

// Zod
import * as z from "zod";
import { elementCollectionSchema } from "@utilities/validator";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormFields = z.infer<typeof elementCollectionSchema>;

const UpdateElementCollection = () => {
	const router = useRouter();
	const [elements, setElements] = useState<Array<IElement>>([]);
	const [elementCollections, setElementCollections] = useState<Array<IElementCollection>>([]);
	const { selected, setSelected, isSelected } = useEvents();
	const searchParams = useSearchParams();
	const collectionId = searchParams.get("id");

	const getCollectionDetails = async () => {
		try {
			const response = await fetch(`/api/element-collection/${collectionId}`);
			const data = await response.json();

            setElements(data.elements);
            setSelected(data.elements);
            
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
		resolver: zodResolver(elementCollectionSchema),
		defaultValues: getCollectionDetails,
	});

	const updateCollection: SubmitHandler<FormFields> = async (formData) => {
		if (!collectionId) {
			return alert("Missing Collection Id!");
		}
		try {
            formData.elements = selected;
			const response = await fetch(`/api/element-collection/${collectionId}`, {
				method: "PATCH",
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				router.push("/edit-elementCollection");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSelectElement = (newEl) => {
		setSelected((selected) => [...selected, newEl]);
	};

	const handleSelectAllElements = () => {
		let mergedElements = [...selected, ...elements].reduce((acc, el) => {
            if (!acc.some(existingEl => existingEl._id === el._id)) {
                acc.push(el);
            }
            return acc;
        }, []);

		setSelected(mergedElements);
	};

	const handleRemoveElement = (el) => {
		const filteredElements = selected.filter((item) => item._id !== el._id);
		setSelected(filteredElements);
	};

	const handleRemoveAllElements = () => {
		setSelected([]);
	};

	return (
		<FormElementCollection
			type="Edit"
			elements={elements}
			setElements={setElements}
			elementCollections={elementCollections}
			setElementCollections={setElementCollections}
			handleSelectElement={handleSelectElement}
			handleSelectAllElements={handleSelectAllElements}
			handleRemoveElement={handleRemoveElement}
			handleRemoveAllElements={handleRemoveAllElements}
			selected={selected}
			isSelected={isSelected}
			onSubmit={updateCollection}
			isSubmitting={isSubmitting}
			handleSubmit={handleSubmit}
			register={register}
			errors={errors}
		/>
	);
};

export default UpdateElementCollection;
