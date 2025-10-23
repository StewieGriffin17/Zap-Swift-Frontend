import React, { useMemo, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import BangladeshMap from "./BangladeshMap";
import warehouses from "../../assets/json/warehouses.json";

export default function Coverage() {
  const [query, setQuery] = useState("");
  const [target, setTarget] = useState(null);
  const inputRef = useRef(null);

  // case-insensitive search across city, district, region
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return warehouses;
    return warehouses.filter((w) =>
      [w.city, w.district, w.region]
        .filter(Boolean)
        .some((f) => String(f).toLowerCase().includes(q))
    );
  }, [query]);

  // choose a target to fly to: the first filtered item
  const searchTarget = useMemo(() => {
    const first = filtered[0];
    return first ? [first.latitude, first.longitude] : null;
  }, [filtered]);

  const onSearch = (e) => {
    e.preventDefault();
    setTarget(searchTarget);
    inputRef.current?.focus();
  };

  // counts for small summary (optional)
  const activeCount = filtered.filter((w) => w.status === "active").length;
  const regionCount = new Set(filtered.map((w) => w.region)).size;

  return (
    <section className="bg-white rounded-[22px] shadow-sm border border-gray-200/60 p-5 sm:p-8 lg:p-10 mb-6 sm:mb-16">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B3B36]">
        We are available in{" "}
        <span className="text-[#0B3B36]">{activeCount}</span> active warehouse
        locations
      </h2>

      {/* Search */}
      <form
        onSubmit={onSearch}
        className="mt-5 flex items-center gap-3 w-full max-w-xl"
      >
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search district / city / region"
            className="w-full pl-10 pr-3 py-2.5 rounded-full border border-gray-300 focus:border-gray-400 outline-none text-sm"
            aria-label="Search warehouses"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-[#CFEA68] text-[#0B3B36] px-5 py-2.5 text-sm font-semibold hover:brightness-95 transition"
        >
          Search
        </button>
      </form>

      {/* quick meta */}
      <div className="mt-3 text-xs text-gray-600">
        Showing <span className="font-medium">{filtered.length}</span> locations
        in <span className="font-medium">{regionCount}</span> region(s)
      </div>

      <hr className="mt-6 border-t border-dashed border-gray-300" />

      <h3 className="mt-6 mb-3 text-lg sm:text-xl font-semibold text-[#0B3B36]">
        We deliver almost all over Bangladesh
      </h3>

      <BangladeshMap warehouses={filtered} target={target} height={480} />

      <p className="text-xs text-gray-500 mt-2">
        Tip: Try “Dhaka”, “Chattogram”, “Sylhet”, a district name, or region
        like “Khulna”.
      </p>
    </section>
  );
}
