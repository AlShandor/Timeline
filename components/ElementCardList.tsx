import ElementCard from "@components/ElementCard";
import { useRouter } from "next/navigation";

interface Props {
	elements: Array<IElement>;
	setElements: Function;
	handleTagClick: Function;
	handleSelectElement: Function;
	isSelected: Function;
	handleRemoveElement: Function;
}

const ElementCardList = ({ elements, setElements, handleTagClick, handleSelectElement, handleRemoveElement, isSelected }: Props) => {
	const router = useRouter();

	const handleEdit = (element) => {
		router.push(`/update-element?id=${element._id}`);
	};

	const handleDelete = async (element) => {
		const hasConfirmed = confirm(
			"Are you sure you want to delete this prompt?"
		);

		if (hasConfirmed) {
			try {
				await fetch(`/api/element/${element._id.toString()}`, {
					method: "DELETE",
				});

				const filteredElements = elements.filter(
					(item) => item._id !== element._id
				);

				setElements(filteredElements);

				router.push("/edit-element");
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div className="prompt_layout">
			{elements.map((el) => (
				<ElementCard
					key={el._id}
					element={el}
					handleEdit={handleEdit}
					handleDelete={handleDelete}
					handleTagClick={handleTagClick}
					handleSelectElement={handleSelectElement}
					handleRemoveElement={handleRemoveElement}
					isSelected={isSelected}
				/>
			))}
		</div>
	);
};

export default ElementCardList;
