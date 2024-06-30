import React from "react";
import { FunnelIcon } from "@heroicons/react/20/solid";

function SortFilter({ setMobileFiltersOpen }) {
  return (
    <div className="flex items-center">
      <button
        type="button"
        className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
        onClick={() => setMobileFiltersOpen(true)}
      >
        <span className="sr-only">Filters</span>
        <FunnelIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}

export default React.memo(SortFilter);