"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleFilter = function (value) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const activeCapacity = searchParams.get("capacity") ?? "all";

  return (
    <div className="flex gap-2 my-4 justify-end">
      <button
        className={`bg-transparent border border-primary-600  p-2 ${
          activeCapacity === "all" ? "bg-primary-700 text-primary-100" : ""
        }`}
        onClick={() => handleFilter("all")}
      >
        All cabins
      </button>
      <button
        className={`bg-transparent border border-primary-600  p-2 ${
          activeCapacity === "small" ? "bg-primary-700 text-primary-100" : ""
        }`}
        onClick={() => handleFilter("small")}
      >
        2 &mdash; 3 Guests
      </button>
      <button
        className={`bg-transparent border border-primary-600  p-2 ${
          activeCapacity === "medium" ? "bg-primary-700 text-primary-100" : ""
        }`}
        onClick={() => handleFilter("medium")}
      >
        4 &mdash; 7 Guests
      </button>
      <button
        className={`bg-transparent border border-primary-600  p-2 ${
          activeCapacity === "large" ? "bg-primary-700 text-primary-100" : ""
        }`}
        onClick={() => handleFilter("large")}
      >
        8 &mdash; 12 Guests
      </button>
    </div>
  );
}

export default Filter;
