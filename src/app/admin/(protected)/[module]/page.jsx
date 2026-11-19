import { notFound, redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getModule, listFields } from "@/lib/adminModules";
import AdminTable from "@/components/admin/AdminTable";

export default async function AdminModuleListPage({ params }) {
  const { module: moduleSlug } = await params;
  const moduleConfig = getModule(moduleSlug);
  if (!moduleConfig) notFound();

  // A settings page has exactly one record: open it, creating it on first visit.
  if (moduleConfig.singleton) {
    const existing = await db[moduleConfig.model].findFirst({ select: { id: true } });
    const record = existing ?? (await db[moduleConfig.model].create({ data: { ...(moduleConfig.defaults ?? {}), order: 0 } }));
    redirect(`/admin/${moduleSlug}/${record.id}/edit`);
  }

  // Only the columns the table draws. Reading whole records sent the entire
  // catalogue — itineraries, FAQs, SEO copy — to the browser twice over:
  // 655 KB for the destinations list, where 27 KB is enough.
  const rows = await db[moduleConfig.model].findMany({
    orderBy: { order: "asc" },
    select: listFields(moduleConfig),
  });

  // AdminTable is a client component, so whatever it is handed is serialized
  // into the page. It reads three keys; the rest of the module schema — every
  // field definition, every select option — does not need to travel.
  const tableConfig = {
    label: moduleConfig.label,
    list: moduleConfig.list,
    listColumns: moduleConfig.listColumns,
  };

  return <AdminTable moduleSlug={moduleSlug} moduleConfig={tableConfig} rows={rows} />;
}
