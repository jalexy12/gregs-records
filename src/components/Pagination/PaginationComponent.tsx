import { MouseEventHandler } from "react";

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
    <div>
      {currentPage > 1 && (
        <button type="button" onClick={handlePageDown}>
          &lt;
        </button>
      )}
      {allPages.map((page) => (
        <button key={page} type="button" onClick={() => handleJumpToPage(page)}>
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
