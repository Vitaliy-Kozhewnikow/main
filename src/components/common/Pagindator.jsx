import React, {useState} from 'react';
import a from "./Paginator.module.css";

const Pagindator = ({totalUserCount, pageSize, currentPage, onPageClick, portionSize=20}) => {
    const pagesCount = Math.ceil(totalUserCount / pageSize)

    const pages = []

    for (let i = 1; i <= pagesCount; i++) { pages.push(i) }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [portion, setPortion] = useState(1)
    const leftPortionPageNumber = (portion-1) * portionSize + 1
    const rightPortionPageNumber = portionSize * portion

    return (
        <div className={a.paginator}>
            {portion > 1 &&
            <button className={a.text} onClick={() => {setPortion(portion - 1)}}>LEFT</button>}



            {pages.filter(p=> p>=leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => {
                return <span className={a.text}
                             onClick={(e) => onPageClick(p)}>{p}</span>
            })}

            {portionCount > portion &&
            <button className={a.text} onClick={() => {setPortion(portion + 1)}}>RIGHT</button>}
        </div>
    );
};

export default Pagindator;