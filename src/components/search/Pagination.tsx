import React from "react";
import { connectPagination } from "react-instantsearch-dom";
import { Pagination as PaginationControl } from "baseui/pagination";

export const Pagination = connectPagination(({ currentRefinement, nbPages, refine }) => (
  <PaginationControl
    numPages={Math.min(nbPages, 1)}
    currentPage={currentRefinement}
    onPageChange={({ nextPage }) => refine(Math.min(Math.max(nextPage, 1), nbPages))}
  />
));
