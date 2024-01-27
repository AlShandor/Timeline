import ElementCard from "@components/ElementCard";

const ElementCardList = ({ data, handleAddClick, handleEdit, handleDelete }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((el) => (
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
