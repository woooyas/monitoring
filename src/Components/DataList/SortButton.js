import "./SortButton.css";

function reverseSortOrder(sortOrder) {
    if (sortOrder === "DESC") {
        return "ASC";
    }
    return "DESC";
}

export default function SortButton({value, setSortField, sortOrder, setSortOrder}) {
    return (
        <button className="sort-button" onClick={() => {
            setSortField(value);
            setSortOrder(reverseSortOrder(sortOrder));
        }}>
            <span className="material-symbols-outlined">swap_vert</span>
        </button>
    );
};
