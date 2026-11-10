"use client";

import { useActionState, useState } from "react";
import Link from "@/components/common/SiteLink";
import {
  AlertCircle,
  CalendarDays,
  Check,
  Eye,
  Hotel,
  Image as ImageIcon,
  IndianRupee,
  Info,
  ListChecks,
  MessageCircleQuestion,
  Route,
  Save,
  Search,
} from "lucide-react";
import ComboSelect from "./ComboSelect";
import GalleryField from "./GalleryField";
import ImageField from "./ImageField";
import JsonListField from "./JsonListField";
import ObjectField from "./ObjectField";
import RowListField from "./RowListField";

function Field({ field, initialValue, placeholder, onChange, extraOptions = [] }) {
  const commonClasses =
    "w-full rounded-[6px] border border-[#D1D5DB] px-3 py-2 text-[13px] outline-none focus:border-[#17BEBB]";

  if (field.type === "textarea") {
    return (
      <textarea
        name={field.name}
        defaultValue={initialValue ?? ""}
        required={field.required}
        placeholder={placeholder}
        onChange={onChange}
        rows={4}
        className={commonClasses}
      />
    );
  }

  if (field.type === "boolean") {
    return (
      <input
        type="checkbox"
        name={field.name}
        defaultChecked={Boolean(initialValue)}
        onChange={(event) => onChange?.({ target: { name: field.name, value: event.target.checked } })}
        className="h-4 w-4 rounded border-[#D1D5DB] text-[#17BEBB]"
      />
    );
  }

  if (field.type === "select" && field.allowCustom) {
    return (
      <ComboSelect
        name={field.name}
        options={[...(field.options ?? []), ...extraOptions]}
        initialValue={initialValue}
        required={field.required}
        onChange={onChange}
      />
    );
  }

  if (field.type === "select") {
    return (
      <select
        name={field.name}
        defaultValue={initialValue ?? ""}
        required={field.required}
        onChange={onChange}
        className={commonClasses}
      >
        <option value="" disabled>
          Select...
        </option>

        {field.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  if (field.type === "string-list") {
    return (
      <JsonListField
        name={field.name}
        initialItems={Array.isArray(initialValue) ? initialValue : []}
        placeholder={placeholder}
        onItemsChange={(list) => onChange?.({ target: { name: field.name, value: list } })}
      />
    );
  }

  // A list of records — itinerary days, departures, FAQs — edited as
  // labelled boxes instead of hand-written JSON.
  if (field.type === "rows") {
    return (
      <RowListField
        name={field.name}
        columns={field.columns}
        initialRows={Array.isArray(initialValue) ? initialValue : []}
        addLabel={field.addLabel}
      />
    );
  }

  // A stored object with known keys — labelled boxes, not braces.
  if (field.type === "object") {
    return (
      <ObjectField
        name={field.name}
        columns={field.columns}
        initialValue={initialValue && typeof initialValue === "object" ? initialValue : {}}
      />
    );
  }

  if (field.type === "json") {
    return (
      <textarea
        name={field.name}
        defaultValue={initialValue ? JSON.stringify(initialValue, null, 2) : ""}
        required={field.required}
        rows={8}
        spellCheck={false}
        className={`${commonClasses} font-mono text-[12px]`}
      />
    );
  }

  if (field.type === "images") {
    return (
      <GalleryField name={field.name} initialValue={initialValue} max={field.max} onChange={onChange} />
    );
  }

  if (field.type === "image") {
    return (
      <ImageField
        name={field.name}
        initialValue={initialValue}
        required={field.required}
        onChange={onChange}
      />
    );
  }

  // The server stores a slug url-safe either way; cleaning it on blur means
  // the admin sees the address the page will actually live at.
  const onBlur =
    field.name === "slug"
      ? (event) => {
          const clean = event.target.value
            .trim()
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

          if (clean !== event.target.value) {
            event.target.value = clean;
            onChange?.({ target: { name: field.name, value: clean } });
          }
        }
      : undefined;

  return (
    <input
      type={field.type === "number" ? "number" : "text"}
      name={field.name}
      step={field.step}
      defaultValue={initialValue ?? ""}
      required={field.required}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      className={commonClasses}
    />
  );
}

/** "{title} Tour Package" -> the record's actual title. */
function fillTemplate(template, values) {
  return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ""));
}

function FieldRow({ field, initialValue, values, onChange, extraOptions }) {
  const placeholder = field.placeholderTemplate
    ? fillTemplate(field.placeholderTemplate, values || {})
    : field.placeholder;

  return (
    <div className={field.type === "boolean" ? "flex items-center gap-2" : ""}>
      <label className="mb-1 block text-[12px] font-semibold text-[#475569]">
        {field.label}
        {field.required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      <Field
        field={field}
        initialValue={initialValue}
        placeholder={placeholder}
        onChange={onChange}
        extraOptions={extraOptions}
      />
      {field.help ? <p className="mt-1 text-[11px] text-[#94A3B8]">{field.help}</p> : null}
    </div>
  );
}

/** Blank meta boxes are filled with the text the page serves today, so the
    admin edits real words instead of a placeholder that disappears. */
function seedValues(moduleConfig, initialValues) {
  // A brand-new record has no title or price yet, so a template would only
  // produce a half-empty sentence.
  if (!initialValues.id) return initialValues;

  let seeded = initialValues;

  for (const field of moduleConfig.fields) {
    if (!field.prefill || !field.placeholderTemplate) continue;
    if (String(seeded[field.name] ?? "").trim()) continue;

    const text = fillTemplate(field.placeholderTemplate, initialValues).trim();
    if (text) seeded = { ...seeded, [field.name]: text };
  }

  return seeded;
}

/** Shows the meta text the page will actually serve, blank fields included. */
function SeoPreview({ values }) {
  const title =
    values.metaTitle?.trim() ||
    `${values.title ?? ""} Tour Package — ${values.days ?? ""}D/${values.nights ?? ""}N from ₹${values.price ?? ""}`;
  const description = values.metaDescription?.trim() || values.description || "";
  const keywords = Array.isArray(values.metaKeywords) ? values.metaKeywords.filter(Boolean) : [];
  const url = values.canonicalUrl?.trim() || `/package/${values.slug ?? ""}`;

  return (
    <div className="rounded-[10px] border border-[#E2E8F0] bg-[#F8FAFC] p-3">
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[#94A3B8]">
        How search engines see this page
      </p>

      <p className="mt-2 truncate text-[11px] text-[#0F7B33]">{url}</p>
      <p className="mt-1 line-clamp-2 text-[13.5px] font-semibold leading-snug text-[#1A0DAB]">
        {title}
      </p>
      <p className="mt-1 line-clamp-3 text-[11.5px] leading-relaxed text-[#475569]">{description}</p>

      <p className="mt-2 text-[10.5px] text-[#94A3B8]">
        {title.length} characters in the title · {description.length} in the description
      </p>

      {keywords.length ? (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {keywords.map((word) => (
            <span
              key={word}
              className="rounded-full bg-white px-2 py-0.5 text-[10.5px] font-medium text-[#475569] ring-1 ring-[#E2E8F0]"
            >
              {word}
            </span>
          ))}
        </div>
      ) : null}

      {values.noIndex ? (
        <p className="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-[#B91C1C]">
          <AlertCircle className="h-3.5 w-3.5" />
          Hidden from Google — this page will not be indexed.
        </p>
      ) : null}
    </div>
  );
}

const CARD_ICONS = {
  info: Info,
  pricing: IndianRupee,
  media: ImageIcon,
  itinerary: Route,
  calendar: CalendarDays,
  list: ListChecks,
  seo: Search,
  faq: MessageCircleQuestion,
  hotel: Hotel,
};

function Card({ title, icon, children }) {
  const Icon = CARD_ICONS[icon];

  return (
    <section className="rounded-[14px] border border-[#E5E7EB] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      <h3 className="flex items-center gap-2 border-b border-[#E5E7EB] px-5 py-3 text-[14px] font-bold text-[#0F172A]">
        {Icon ? <Icon className="h-4 w-4 shrink-0 text-[#17BEBB]" strokeWidth={2.2} /> : null}
        {title}
      </h3>
      <div className="flex flex-col gap-4 p-5">{children}</div>
    </section>
  );
}

/** Renders one card's fields, putting the pairs it names side by side. */
function CardBody({ card, seeded, values, onChange, optionsInUse = {} }) {
  const partner = new Map();
  for (const [left, right] of card.pairs || []) partner.set(left, right);

  const done = new Set();
  const rows = [];

  const row = (field) => (
    <FieldRow
      key={field.name}
      field={field}
      initialValue={seeded[field.name]}
      values={values}
      onChange={onChange}
      extraOptions={optionsInUse[field.name]}
    />
  );

  for (const field of card.fields) {
    if (done.has(field.name)) continue;
    done.add(field.name);

    const mate = card.fields.find((item) => item.name === partner.get(field.name) && !done.has(item.name));
    if (mate) {
      done.add(mate.name);
      rows.push(
        <div key={field.name} className="grid grid-cols-2 gap-3">
          {row(field)}
          {row(mate)}
        </div>,
      );
      continue;
    }

    rows.push(row(field));
  }

  return (
    <>
      {rows}
      {card.preview === "seo" ? <SeoPreview values={values} /> : null}
    </>
  );
}

/** Splits the field list into the layout a module asks for. */
function groupFields(moduleConfig) {
  const form = moduleConfig.form;
  if (!form) return null;

  const byName = new Map(moduleConfig.fields.map((field) => [field.name, field]));
  const used = new Set();

  const card = (raw) => {
    const fields = (raw.fields || []).map((name) => byName.get(name)).filter(Boolean);
    fields.forEach((field) => used.add(field.name));
    return { ...raw, fields };
  };

  const columns = (form.columns || []).map(card);
  const full = (form.full || []).map(card);
  const sections = (form.sections || []).map(card);

  const sidebarSource = Array.isArray(form.sidebar) ? form.sidebar : form.sidebar ? [form.sidebar] : [];
  const sidebar = sidebarSource.map(card);

  // Nothing is ever dropped: whatever the layout forgot still gets an editor.
  const rest = moduleConfig.fields.filter((field) => !used.has(field.name));
  if (rest.length) {
    const extra = { title: "More settings", fields: rest };
    if (columns.length) full.push(extra);
    else sections.push(extra);
  }

  return { form, columns, full, sections, sidebar };
}

export default function AdminForm({
  moduleSlug,
  moduleConfig,
  action,
  initialValues = {},
  cancelHref,
  recordTitle,
  // { fieldName: [values other records already use] } — lets a category typed
  // on one package show up in the dropdown on all the others.
  optionsInUse = {},
}) {
  const [state, formAction, isPending] = useActionState(async (_prev, formData) => {
    try {
      await action(formData);
      // Editing returns instead of redirecting, so confirm in place.
      return { saved: true, at: Date.now() };
    } catch (error) {
      if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
      return { error: error?.message || "Something went wrong." };
    }
  }, null);

  const seeded = seedValues(moduleConfig, initialValues);

  const [values, setValues] = useState(seeded);
  const [dirty, setDirty] = useState(false);

  const onFieldChange = (event) => {
    const { name, value } = event.target;
    setDirty(true);
    setValues((prev) => (prev[name] === value ? prev : { ...prev, [name]: value }));
  };

  const layout = groupFields(moduleConfig);

  const feedback = (
    <>
      {state?.error && (
        <p className="flex items-center gap-2 rounded-[8px] bg-red-50 px-3 py-2 text-[12px] font-medium text-red-600">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {state.error}
        </p>
      )}

      {state?.saved && !isPending && (
        <p className="flex items-center gap-2 rounded-[8px] bg-[#ECFDF5] px-3 py-2 text-[12.5px] font-semibold text-[#047857]">
          <Check className="h-4 w-4" />
          Saved — the change is live on the site.
        </p>
      )}
    </>
  );

  const actions = (
    <div className="flex items-center gap-3">
      <button
        type="submit"
        disabled={isPending}
        className="flex h-[42px] items-center justify-center rounded-[8px] bg-[#FF7A1A] px-6 text-[14px] font-bold text-white transition-colors hover:bg-[#E56A0F] disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Save"}
      </button>
      <Link
        href={cancelHref}
        className="flex h-[42px] items-center justify-center rounded-[8px] border border-[#D1D5DB] px-6 text-[14px] font-semibold text-[#475569] hover:border-[#94A3B8]"
      >
        Back to list
      </Link>
    </div>
  );

  const fieldsOf = (card) => (
    <CardBody card={card} seeded={seeded} values={values} onChange={onFieldChange} optionsInUse={optionsInUse} />
  );

  // THREE-COLUMN LAYOUT — the package editor.
  if (layout?.columns.length) {
    const status = values[layout.form.statusField] || "Active";
    const hidden = status === "Hidden";
    // A brand-new record has no slug yet, so there is nothing to preview.
    const filled = layout.form.previewPath ? fillTemplate(layout.form.previewPath, values) : "";
    const previewHref = filled && !filled.endsWith("/") ? filled : null;

    return (
      <form action={formAction} className="flex flex-col gap-5 pb-24">

        {/* HEADER */}
        <div className="flex flex-wrap items-start justify-between gap-4 rounded-[14px] border border-[#E5E7EB] bg-white px-5 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="text-[19px] font-bold leading-tight text-[#0F172A]">
                {recordTitle || moduleConfig.label}
              </h2>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                  hidden ? "bg-[#FEE2E2] text-[#B91C1C]" : "bg-[#DCFCE7] text-[#15803D]"
                }`}
              >
                {status}
              </span>
            </div>
            {layout.form.subtitle ? (
              <p className="mt-1 text-[12.5px] text-[#64748B]">{layout.form.subtitle}</p>
            ) : null}
          </div>

          <div className="flex items-center gap-2.5">
            {previewHref ? (
              <Link
                href={previewHref}
                target="_blank"
                className="flex h-[40px] items-center gap-2 rounded-[8px] border border-[#D1D5DB] px-4 text-[13px] font-semibold text-[#475569] no-underline transition hover:border-[#94A3B8]"
              >
                <Eye className="h-4 w-4" />
                Preview Package
              </Link>
            ) : null}

            <button
              type="submit"
              disabled={isPending}
              className="flex h-[40px] items-center gap-2 rounded-[8px] bg-[#FF7A1A] px-5 text-[13px] font-bold text-white transition-colors hover:bg-[#E56A0F] disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {feedback}

        {/* THREE CARDS ACROSS */}
        <div className="grid items-start gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {layout.columns.map((card) => (
            <Card key={card.title} title={card.title} icon={card.icon}>
              {fieldsOf(card)}
            </Card>
          ))}
        </div>

        {/* FULL-WIDTH SECTIONS */}
        {layout.full.map((card) => (
          <Card key={card.title} title={card.title} icon={card.icon}>
            {fieldsOf(card)}
          </Card>
        ))}

        {/* STICKY ACTION BAR */}
        {/* Clears the pinned sidebar rather than running underneath it. */}
        <div className="fixed bottom-0 left-[248px] right-0 z-20 border-t border-[#E5E7EB] bg-white/95 backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3 px-8 py-3">
            <p className="flex items-center gap-2 text-[12.5px] font-medium text-[#64748B]">
              {dirty ? (
                <>
                  <AlertCircle className="h-4 w-4 text-[#F0762B]" />
                  Unsaved changes — remember to save.
                </>
              ) : state?.saved ? (
                <>
                  <Check className="h-4 w-4 text-[#047857]" />
                  All changes saved.
                </>
              ) : (
                "No changes yet."
              )}
            </p>

            <div className="flex items-center gap-2.5">
              <Link
                href={cancelHref}
                className="flex h-[40px] items-center rounded-[8px] border border-[#D1D5DB] px-5 text-[13px] font-semibold text-[#475569] no-underline transition hover:border-[#94A3B8]"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isPending}
                className="flex h-[40px] items-center gap-2 rounded-[8px] bg-[#FF7A1A] px-5 text-[13px] font-bold text-white transition-colors hover:bg-[#E56A0F] disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {isPending ? "Saving..." : initialValues.id ? "Update Package" : "Create Package"}
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }

  if (layout) {
    return (
      <form action={formAction} className="grid items-start gap-5 xl:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-5">
          {layout.sections.map((card) => (
            <Card key={card.title} title={card.title} icon={card.icon}>
              {fieldsOf(card)}
            </Card>
          ))}
        </div>

        <div className="flex flex-col gap-5 xl:sticky xl:top-6">
          {layout.sidebar.map((card) => (
            <Card key={card.title} title={card.title} icon={card.icon}>
              {fieldsOf(card)}
            </Card>
          ))}

          <div className="flex flex-col gap-3 rounded-[14px] border border-[#E5E7EB] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
            {feedback}
            {actions}
          </div>
        </div>
      </form>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5 rounded-[14px] border border-[#E5E7EB] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      {moduleConfig.fields.map((field) => (
        <FieldRow
          key={field.name}
          field={field}
          initialValue={seeded[field.name]}
          values={values}
          onChange={onFieldChange}
          extraOptions={optionsInUse[field.name]}
        />
      ))}

      {feedback}

      <div className="border-t border-[#E5E7EB] pt-4">{actions}</div>
    </form>
  );
}
