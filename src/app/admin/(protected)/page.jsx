import Link from "@/components/common/SiteLink";
import { db } from "@/lib/db";
import { adminModules } from "@/lib/adminModules";

export default async function AdminDashboardPage() {
  const entries = Object.entries(adminModules);
  const counts = await Promise.all(entries.map(([, config]) => db[config.model].count()));

  return (
    <div>
      <h1 className="text-[24px] font-bold text-[#0F172A]">Dashboard</h1>
      <p className="mt-1 text-[13px] text-[#64748B]">
        Every part of the site — pick a module to add, edit or remove content.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {entries.map(([slug, config], index) => (
          <Link
            key={slug}
            href={`/admin/${slug}`}
            className="rounded-[14px] border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)] transition-all hover:-translate-y-0.5 hover:border-[#17BEBB] hover:shadow-md"
          >
            <p className="text-[11px] font-semibold uppercase tracking-wide text-[#94A3B8]">{config.group}</p>
            <p className="mt-1 text-[15px] font-bold text-[#0F172A]">{config.label}</p>
            <p className="mt-3 text-[28px] font-black text-[#0F4C81]">{counts[index]}</p>
            <p className="text-[12px] text-[#64748B]">records</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
