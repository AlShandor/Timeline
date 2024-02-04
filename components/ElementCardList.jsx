import ElementCard from "@components/ElementCard";

const ElementCardList = ({ elements, handleAddClick, handleEdit, handleDelete }) => {
    return (
        <div className="prompt_layout">
            {elements.map((el) => (
                <ElementCard
                    key={el._id}
                    element={el}
                    handleAddClick={handleAddClick}
                    handleEdit={() => handleEdit && handleEdit(el)}
                    handleDelete={() => handleDelete && handleDelete(el)}
                />
            ))}
        </div>
    )
};

export default ElementCardList;
