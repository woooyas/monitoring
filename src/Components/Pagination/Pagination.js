import "./Pagination.css";
import {useEffect, useState} from "react";

function getIndexValue(value, maxPages) {
    return Math.floor(value / maxPages) * maxPages;
}

export default function Pagination({totalPages, pageNum, setPageNum}) {

    const [maxPages, setMaxPages] = useState(10);
    const currentRange = getIndexValue(totalPages, maxPages);
    const [startPage, setStartPage] = useState(getIndexValue(pageNum, maxPages) + 1);
    const [endPage, setEndPage] = useState(pageNum < currentRange ? startPage + maxPages - 1 : totalPages);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 480) {
                setMaxPages(5);
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const newStartPage = getIndexValue(pageNum, maxPages) + 1;
        const newEndPage = pageNum < getIndexValue(totalPages, maxPages) ? newStartPage + maxPages - 1 : totalPages;

        setStartPage(newStartPage);
        setEndPage(newEndPage);
    }, [pageNum, totalPages, maxPages]);

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
