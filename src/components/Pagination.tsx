import React, { FC } from "react";

interface Props {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  pages: () => number;
  // eslint-disable-next-line no-unused-vars
  changeCurrentPage: (page: number) => void;
}

const Pagination: FC<Props> = (props) => {
  const { currentPage, pages, setCurrentPage } = props;

  const onClickPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const onClickNext = () => {
    if (currentPage < pages()) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between md:w-5xl w-auto">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end mx-2">
          <p className="text-sm text-gray-700 flex gap-1">
            Showing
            <span className="font-medium">{currentPage}</span>
            of
            <span className="font-medium">{pages()}</span>
            pages
          </p>
        </div>
        <div className="flex flex-1 gap-4">
          <button
            onClick={onClickPrevious}
            // @click="$emit('onClick', store.currentPage - 1)"
            className=" cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            // @click="$emit('onClick', store.currentPage + 1)"
            onClick={onClickNext}
            className=" cursor-pointer relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={currentPage === pages()}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
