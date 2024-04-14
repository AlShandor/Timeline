import { useRouter } from "next/navigation";
import ElementCollectionCard from "./ElementCollectionCard";

interface Props {
	elementCollections: Array<IElementCollection>;
	setElementCollections: Function;
}

const CollectionCardList = ({ elementCollections, setElementCollections } : Props) => {
	const router = useRouter();

    const handleEdit = (collection) => {
		router.push(`/update-elementCollection?id=${collection._id}`);
	};

    const handleDelete = async (collection) => {
		const hasConfirmed = confirm("Are you sure you want to delete this collection?");

		if (hasConfirmed) {
			try {
				await fetch(`/api/element-collection/${collection._id.toString()}`, {
					method: "DELETE",
				});

				const filteredCollections = elementCollections.filter((item) => item._id !== collection._id);

				setElementCollections(filteredCollections);

				router.push("/edit-elementCollection");
			} catch (error) {
				console.log(error);
			}
		}
	};

    return (
		<div className="prompt_layout">
			{elementCollections.map((collection) => (
				<ElementCollectionCard
					key={collection._id}
					collection={collection}
					handleEdit={handleEdit}
					handleDelete={handleDelete}
				/>
			))}
		</div>
	);
};

export default CollectionCardList;
