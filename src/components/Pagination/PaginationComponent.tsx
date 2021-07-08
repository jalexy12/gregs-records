import { MouseEventHandler } from "react";
import "./style.css";

interface Props {
  currentPage: number;
  handlePageUp: MouseEventHandler;
  handlePageDown: MouseEventHandler;
  handleJumpToPage: Function;
  allPages: number[];
}

export default function PaginationComponent({
  currentPage,
  handlePageUp,
  handlePageDown,
  handleJumpToPage,
  allPages,
}: Props): JSX.Element {
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button type="button" onClick={handlePageDown}>
          &lt;
        </button>
      )}
      {allPages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? "active" : ""}
          type="button"
          onClick={() => handleJumpToPage(page)}
        >
          {page}
        </button>
      ))}
      {currentPage < allPages[allPages.length - 1] && (
        <button type="button" onClick={handlePageUp}>
          &gt;
        </button>
      )}
    </div>
  );
}
