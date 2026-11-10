import Link from "@/components/common/SiteLink";
import Image from "@/components/common/SiteImage";
import { ExternalLink, LogOut } from "lucide-react";
import { adminModules, adminModuleGroups } from "@/lib/adminModules";
import { logoutAction } from "../login/actions";
import AdminSidebar from "@/components/admin/AdminSidebar";

// Saving a record writes to Atlas and then revalidates the site. On a slow
// link that can outlast the platform default, and a cut-off request reaches
// the browser as "An unexpected response was received from the server".
export const maxDuration = 60;

export const metadata = {
  title: "Honor Tour & Travels — Admin",
  robots: { index: false, follow: false },
};

/** [{ group, modules: [{ slug, label }] }] in the order adminModuleGroups lists. */
function groupedModules() {
  const groups = new Map(adminModuleGroups.map((group) => [group, []]));

  for (const [slug, config] of Object.entries(adminModules)) {
    if (!groups.has(config.group)) groups.set(config.group, []);
    groups.get(config.group).push({ slug, label: config.label });
  }

  return [...groups]
    .filter(([, modules]) => modules.length > 0)
    .map(([group, modules]) => ({ group, modules }));
}

export default function AdminLayout({ children }) {
  const groups = groupedModules();

  return (
    <div className="flex min-h-screen bg-[#F7FAFC]">
      {/* Pinned to the viewport: scrolling a long edit form must not drag the
          menu off screen. The nav inside scrolls on its own when the list is
          taller than the sidebar. */}
      <aside className="sticky top-0 flex h-screen w-[248px] shrink-0 flex-col overflow-hidden bg-gradient-to-b from-[#0C3F6B] via-[#092F52] to-[#061D35] text-white shadow-[1px_0_0_rgba(255,255,255,0.06)]">

        {/* A warm glow behind the logo keeps the long dark panel from reading flat. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 -top-24 h-56 w-56 rounded-full bg-[#FF7A1A]/20 blur-[70px]"
        />

        <Link
          href="/admin"
          className="relative flex items-center gap-3 border-b border-white/10 px-5 py-[18px] no-underline"
        >
          <Image
            src="/uploads/brand/logo.png"
            alt="Honor Tour &amp; Travels"
            width={929}
            height={269}
            sizes="130px"
            className="h-9 w-auto object-contain"
          />
          <span className="mt-0.5 border-l border-white/15 pl-3 text-[9.5px] font-bold uppercase leading-[1.3] tracking-[0.14em] text-white/45">
            Admin
            <br />
            Panel
          </span>
        </Link>

        <AdminSidebar groups={groups} />

        <div className="relative border-t border-white/10 p-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 rounded-[10px] px-3 py-2 text-[13px] text-white/70 no-underline transition-colors hover:bg-white/[0.07] hover:text-white"
          >
            <ExternalLink className="h-4 w-4 text-white/45" />
            View website
          </Link>

          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-2.5 rounded-[10px] px-3 py-2 text-[13px] text-white/70 transition-colors hover:bg-[#F0621F]/15 hover:text-[#FFB347]"
            >
              <LogOut className="h-4 w-4 text-white/45" />
              Log out
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden px-8 py-8">{children}</main>
    </div>
  );
}
