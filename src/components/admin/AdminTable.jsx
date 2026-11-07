"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "@/components/common/SiteImage";
import { Pencil, Plus, Search, X } from "lucide-react";
import { deleteRecord } from "@/app/admin/actions";
import DeleteButton from "./DeleteButton";
import { getDestinationImage } from "@/data/destinationImages";
import { isIndiaPackage } from "@/data/packageRegion";

function formatCell(value) {
  if (value === null || value === undefined) return "—";
  if (Array.isArray(value)) return value.join(", ") || "—";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

/** The site falls back to a destination photo when a row has no image of its
    own, so the admin list shows the same picture the visitor sees. */
function rowImage(row, key) {
  return row[key] || getDestinationImage(`${row.title ?? ""} ${row.location ?? ""} ${row.name ?? ""}`);
}

/** Sort keys may name a real field or "region", which puts India first. */
function sortValue(row, key) {
  if (key === "region") return isIndiaPackage(row) ? "0" : "1";
  return String(row[key] ?? "");
}

const money = (value) =>
  typeof value === "number" ? `₹${new Intl.NumberFormat("en-IN").format(value)}` : formatCell(value);

/** "Group Tour | 6D/5N" under the title. */
function metaLine(row, keys) {
  return keys
    .map((key) => (key === "duration" ? (row.days ? `${row.days}D/${row.nights ?? row.days - 1}N` : "") : row[key]))
    .filter(Boolean)
    .join("  |  ");
}

/** Everything a row shows, flattened once so filtering stays cheap. */
function haystack(row, columns) {
  return columns
    .map((col) => formatCell(row[col]))
    .join(" ")
    .toLowerCase();
}

export default function AdminTable({ moduleSlug, moduleConfig, rows }) {
  const columns = moduleConfig.listColumns;
  const [query, setQuery] = useState("");

  const list = moduleConfig.list;
  const searchKeys = useMemo(
    () =>
      list
        ? [list.title.key, ...(list.title.meta || []), ...list.columns.map((c) => c.key), "slug"]
        : columns,
    [list, columns],
  );

  const indexed = useMemo(
    () => rows.map((row) => ({ row, text: haystack(row, searchKeys) })),
    [rows, searchKeys],
  );

  // Space-separated words must all appear, so "kashmir india" narrows down
  // rather than widening out.
  const visible = useMemo(() => {
    const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const matched = words.length
      ? indexed.filter(({ text }) => words.every((word) => text.includes(word))).map((item) => item.row)
      : rows;

    if (!list?.sortBy) return matched;

    // Keeps one city's tours together instead of scattering them by entry order.
    return [...matched].sort((a, b) => {
      for (const key of list.sortBy) {
        const result = sortValue(a, key).localeCompare(sortValue(b, key), "en", { numeric: true });
        if (result !== 0) return result;
      }
      return 0;
    });
  }, [indexed, query, rows, list]);

  return (
    <div className="rounded-[14px] border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E7EB] px-5 py-4">
        <div>
          <h2 className="text-[18px] font-bold text-[#0F172A]">{moduleConfig.label}</h2>
          <p className="text-[12px] text-[#64748B]">
            {query.trim() ? `${visible.length} of ${rows.length} records` : `${rows.length} records`}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${moduleConfig.label.toLowerCase()}…`}
              aria-label={`Search ${moduleConfig.label}`}
              className="w-[200px] rounded-[8px] border border-[#D1D5DB] py-2 pl-9 pr-8 text-[13px] outline-none transition focus:border-[#17BEBB] sm:w-[260px]"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-[#94A3B8] hover:bg-[#F1F5F9] hover:text-[#0F172A]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>

          <Link
            href={`/admin/${moduleSlug}/new`}
            className="flex shrink-0 items-center gap-1.5 rounded-[8px] bg-[#FF7A1A] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#E56A0F]"
          >
            <Plus className="h-4 w-4" />
            Add new
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-[13px]">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F7FAFC] text-[11px] font-semibold uppercase tracking-wide text-[#64748B]">
              {list?.numbered ? <th className="w-12 px-4 py-3">#</th> : null}
              {list?.image ? <th className="w-20 px-4 py-3">Image</th> : null}

              {list ? (
                <>
                  <th className="px-4 py-3">Title</th>
                  {list.columns.map((col) => (
                    <th key={col.key} className="px-4 py-3">
                      {col.label}
                    </th>
                  ))}
                </>
              ) : (
                columns.map((col) => (
                  <th key={col} className="px-5 py-3">
                    {col}
                  </th>
                ))
              )}

              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 && (
              <tr>
                <td
                  colSpan={(list ? list.columns.length + 2 + (list.numbered ? 1 : 0) : columns.length + 1)}
                  className="px-5 py-8 text-center text-[13px] text-[#94A3B8]"
                >
                  {rows.length === 0 ? "No records yet." : `Nothing matches “${query}”.`}
                </td>
              </tr>
            )}

            {visible.map((row, index) => (
              <tr key={row.id} className="border-b border-[#F1F5F9] last:border-0 hover:bg-[#F7FAFC]">
                {list?.numbered ? (
                  <td className="px-4 py-3 text-[12px] text-[#94A3B8]">{index + 1}</td>
                ) : null}

                {list?.image ? (
                  <td className="px-4 py-3">
                    {rowImage(row, list.image) ? (
                      <Image
                        src={rowImage(row, list.image)}
                        alt=""
                        width={64}
                        height={44}
                        sizes="64px"
                        className="h-11 w-16 rounded-[6px] border border-[#E5E7EB] object-cover"
                      />
                    ) : (
                      <span className="flex h-11 w-16 items-center justify-center rounded-[6px] border border-dashed border-[#E5E7EB] text-[10px] text-[#CBD5E1]">
                        none
                      </span>
                    )}
                  </td>
                ) : null}

                {list ? (
                  <>
                    <td className="max-w-[420px] px-4 py-3">
                      <span className="block truncate font-semibold text-[#0F172A]">{row[list.title.key]}</span>
                      {list.title.meta ? (
                        <span className="mt-0.5 block truncate text-[11.5px] text-[#94A3B8]">
                          {metaLine(row, list.title.meta)}
                        </span>
                      ) : null}
                    </td>

                    {list.columns.map((col) => (
                      <td key={col.key} className="whitespace-nowrap px-4 py-3 text-[#334155]">
                        {col.type === "badge" ? (
                          <span
                            className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                              row[col.key] === "Hidden"
                                ? "bg-[#FEE2E2] text-[#B91C1C]"
                                : "bg-[#DCFCE7] text-[#15803D]"
                            }`}
                          >
                            {row[col.key] || "Active"}
                          </span>
                        ) : col.type === "money" ? (
                          <>
                            <span className="font-bold text-[#0F172A]">{money(row[col.key])}</span>
                            {col.note && row[col.note] ? (
                              <span className="mt-0.5 block text-[11px] text-[#94A3B8]">
                                {money(row[col.note])}
                                {col.noteSuffix}
                              </span>
                            ) : null}
                          </>
                        ) : (
                          formatCell(row[col.key])
                        )}
                      </td>
                    ))}
                  </>
                ) : (
                  columns.map((col) => (
                    <td key={col} className="max-w-[260px] truncate px-5 py-3 text-[#334155]">
                      {formatCell(row[col])}
                    </td>
                  ))
                )}

                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/${moduleSlug}/${row.id}/edit`}
                      className="flex items-center gap-1 text-[12px] font-semibold text-[#0F4C81] hover:underline"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </Link>
                    <DeleteButton action={deleteRecord.bind(null, moduleSlug, row.id)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
