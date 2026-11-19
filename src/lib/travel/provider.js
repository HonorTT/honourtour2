import "server-only";

import { unconfiguredProvider } from "./providers/unconfigured.js";
import { templateProvider } from "./providers/template.js";
import { flyAndSailProvider } from "./providers/flyandsail.js";
import { notConfigured, notSupported } from "./errors.js";

/* =========================================================
   PROVIDER REGISTRY
   TRAVEL_PROVIDER picks the adapter. Unset or unknown falls
   back to the one that refuses every call, so the site can
   never quietly serve sample data as if it were live.

   `server-only` makes the build fail if a client component
   ever imports this file — that is the guard that keeps
   supplier keys out of the browser bundle.

   To add tomorrow's supplier:
     1. cp providers/template.js providers/<name>.js
     2. implement it against the official docs
     3. add it to ADAPTERS below
     4. set TRAVEL_PROVIDER=<name>
========================================================= */

const ADAPTERS = {
  unconfigured: unconfiguredProvider,
  template: templateProvider,
  flyandsail: flyAndSailProvider,
};

let warned = false;

export function getProvider() {
  const name = (process.env.TRAVEL_PROVIDER || "").trim().toLowerCase();

  if (!name) return unconfiguredProvider;

  const adapter = ADAPTERS[name];
  if (!adapter) {
    if (!warned) {
      warned = true;
      console.error(
        `[travel] TRAVEL_PROVIDER="${name}" is not registered. Known: ${Object.keys(ADAPTERS).join(", ")}`
      );
    }
    return unconfiguredProvider;
  }

  return adapter;
}

export const providerId = () => getProvider().id;

/** Does the active adapter claim this operation? */
export function supports(domain, operation) {
  return Boolean(getProvider().capabilities?.[domain]?.[operation]);
}

/**
 * Returns the adapter function for domain.operation, refusing up front when the
 * adapter has not declared the capability — so an unimplemented operation is a
 * clean 501 rather than a surprise error from inside the supplier call.
 */
export function operation(domain, name) {
  const provider = getProvider();
  const fn = provider[domain]?.[name];

  if (typeof fn !== "function" || !supports(domain, name)) {
    return () => {
      // No provider configured at all is a 503 ("call us"), not a 501
      // ("this supplier cannot do that") — they need different messages.
      if (provider.id === "unconfigured") throw notConfigured(`${domain}.${name}`);
      throw notSupported(`${domain}.${name}`);
    };
  }

  return fn.bind(provider[domain]);
}

/** Capability map for the UI, so it can hide what the supplier cannot do. */
export function capabilities() {
  const provider = getProvider();
  return { provider: provider.id, label: provider.label, ...provider.capabilities };
}
