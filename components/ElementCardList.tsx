import ElementCard from "@components/ElementCard";
import { useRouter } from "next/navigation";

interface Props {
	elements: Array<IElement>;
	setElements: Function;
	handleTagClick: Function;
}

const ElementCardList = ({ elements, setElements, handleTagClick }: Props) => {
	// router
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

				//TODO implement hard reload
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
				/>
			))}
		</div>
	);
};

export default ElementCardList;
