import ElementCard from "@components/ElementCard";

const ElementCardList = ({ data, handleAddClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((el) => (
                <ElementCard
                    key={el._id}
                    element={el}
                    handleAddClick={handleAddClick}
                />
            ))}
        </div>
    )
};

export default ElementCardList;
