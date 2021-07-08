import { useState } from "react";
import { PageState } from "../../state/types";

export default function usePagination(
  defaultPage: number,
  maxPages: number
): PageState {
  const [currentPage, setCurrentPage] = useState<number>(defaultPage);

  function pageUp() {
    if (currentPage < maxPages) {
      setCurrentPage((pageValue) => pageValue + 1);
    }
  }

  function pageDown() {
    if (currentPage >= 1) {
      setCurrentPage((pageValue) => pageValue - 1);
    }
  }

  function jumpToPage(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  return {
    currentPage,
    pageUp,
    pageDown,
    jumpToPage,
    allPages: Array.from({ length: maxPages }, (x, i) => i + 1),
  };
}
