"use client";

import { useDispatch, useSelector } from "react-redux";
import { setSearch, setSort } from "@/store/slices/filtersSlice";

export default function Controls() {
  const dispatch = useDispatch();
  const { search, sort } = useSelector((s) => s.filters);

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <input
        className="inp sm:max-w-sm"
        placeholder="Search courses or instructors..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
      <select className="inp sm:w-52" value={sort} onChange={(e) => dispatch(setSort(e.target.value))}>
        <option value="new">Sort: Newest</option>
        <option value="rt">Top rated</option>
        <option value="pl">Price: low to high</option>
        <option value="ph">Price: high to low</option>
      </select>
    </div>
  );
}
