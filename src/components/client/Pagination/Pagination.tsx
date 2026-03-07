"use client";
import React, { useMemo } from "react";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import styles from "./Pagination.module.scss";
import ArrowButton from "./components/ArrowButton";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = observer(
  ({ currentPage, totalPages, handlePageChange }) => {
    const paginationRange = useMemo(() => {
      const range: (number | string)[] = [];
      const siblingCount = 1;
      const totalNumbers = siblingCount * 2 + 3;

      if (totalPages <= totalNumbers + 2) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPages,
      );

      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 3 + 2 * siblingCount;
        const leftRange = Array.from(
          { length: leftItemCount },
          (_, i) => i + 1,
        );
        return [...leftRange, "...", totalPages];
      }

      if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = 3 + 2 * siblingCount;
        const rightRange = Array.from(
          { length: rightItemCount },
          (_, i) => totalPages - i + 1,
        ).reverse();
        return [1, "...", ...rightRange];
      }

      if (shouldShowLeftDots && shouldShowRightDots) {
        const middleRange = Array.from(
          { length: rightSiblingIndex - leftSiblingIndex + 1 },
          (_, i) => i + leftSiblingIndex,
        );
        return [1, "...", ...middleRange, "...", totalPages];
      }

      return range;
    }, [currentPage, totalPages]);

    if (totalPages <= 1) return null;

    return (
      <div className={styles.pagination}>
        <ArrowButton
          direction="left"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {paginationRange.map((page, index) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                {page}
              </span>
            );
          }

          return (
            <button
              key={page}
              className={classNames(styles.pageButton, {
                [styles.active]: page === currentPage,
              })}
              onClick={() => handlePageChange(page as number)}
            >
              {page}
            </button>
          );
        })}

        <ArrowButton
          direction="right"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
      </div>
    );
  },
);

export default Pagination;
