import React, { useMemo, useState } from "react";
import Pagination from "./components/Pagination";
import data from "./data/master.json";

function App() {
  const [search, setSearch] = useState("");
  const perPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  
  const filteredData = data.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });
  
    function pages(): number {
      return parseInt((filteredData.length / perPage).toFixed(0)) + 1;
    }

  function dataForCurrentPage() {
    let start = (currentPage - 1) * perPage;
    if (currentPage === 1) {
      start = 0;
    }
    return filteredData.slice(start, start + perPage);
  }

  function changeCurrentPage(page: number) {
    if (page < 1) {
      setCurrentPage(1);
    }
    if (page > pages()) {
      setCurrentPage(pages());
    }
    setCurrentPage(page);
  }

  const displayData = useMemo(
    () => dataForCurrentPage(),
    [data, currentPage, search]
  );

  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen h-fit flex flex-col justify-start items-center pb-3">
      {/* <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Vite + React + Typescript
        </h1>
      </div> */}

      <div className="w-full max-w-2xl p-5">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by title"
            required
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 place-items-center max-w-5xl">
        {filteredData.length === 0 || displayData.length === 0 ? (
          <div className="absolute top-2/4 right-0 left-0">
            <h1 className="text-center w-screen mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              No results found
            </h1>
          </div>
        ) : (
          displayData.map((item, index) => {
            return (
              <div
                key={index}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2"
              >
                <a href={item.imagePath} target="_blank" rel="noreferrer">
                  <img
                    className="rounded-t-lg aspect-video object-cover h-48"
                    src={item.imagePath}
                    alt={item.title}
                  />
                </a>
                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.title}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
      <Pagination
        pages={pages}
        changeCurrentPage={changeCurrentPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
}

export default App;
