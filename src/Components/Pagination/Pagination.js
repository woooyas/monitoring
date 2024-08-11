import "./Pagination.css";
import {useEffect, useState} from "react";

function getTensValue(value) {
    return Math.floor(value / 10) * 10;
}

export default function Pagination({totalPages, pageNum, setPageNum}) {

    const currentRange = getTensValue(totalPages);
    const [startPage, setStartPage] = useState(getTensValue(pageNum) + 1);
    const [endPage, setEndPage] = useState(pageNum < currentRange ? startPage + 9 : totalPages);

    useEffect(() => {
        const newStartPage = getTensValue(pageNum) + 1;
        const newEndPage = pageNum < getTensValue(totalPages) ? newStartPage + 9 : totalPages;

        setStartPage(newStartPage);
        setEndPage(newEndPage);
    }, [pageNum, totalPages]);

    let pageNums = [];
    for (let i = startPage; i <= endPage; i++) {
        pageNums.push(<li className={`page-item ${pageNum + 1 === i ? 'page-active' : ''}`} key={i}
                          onClick={() => setPageNum(i - 1)}>{i}</li>);
    }

    const handlePreviousClick = () => {
        if (pageNum > 0) {
            setPageNum(pageNum - 1);
        }
    };

    const handleNextClick = () => {
        if (pageNum + 1 < totalPages) {
            setPageNum(pageNum + 1);
        }
    };

    return (
        <ul className="pagination">
            <li className={`page-item ${pageNum === 0 ? 'disabled' : ''}`} onClick={handlePreviousClick}>
                Previous
            </li>
            {pageNums}
            <li className={`page-item ${pageNum === totalPages - 1 ? 'disabled' : ''}`} onClick={handleNextClick}>
                Next
            </li>
        </ul>
    );
};
