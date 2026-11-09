import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile("site/interactions.js", "utf8");
const storage = new Map();
const names = ["source_page", "landing_page", "referrer_host", "utm_source", "utm_medium", "utm_campaign"];
function visit(path, referrer = "", blocked = false) {
  const url = new URL(path, "https://susiesharak.com");
  const fields = Object.fromEntries(names.map(name => [name,{value:name === "source_page" ? url.pathname : ""}]));
  const window = {
    location: url,
    sessionStorage: {
      getItem: key => { if (blocked) throw Error("Storage blocked"); return storage.get(key) || null; },
      setItem: (key,value) => { if (blocked) throw Error("Storage blocked"); storage.set(key,value); },
    },
  };
  const document = {
    referrer,
    querySelector: () => null,
    querySelectorAll: () => [{ elements: { namedItem: name => fields[name] } }],
  };
  vm.runInNewContext(source, { window, document, URL, URLSearchParams });
  return Object.fromEntries(Object.entries(fields).map(([name,field]) => [name,field.value]));
}
const first = visit("/area/sterling-heights?utm_source=google&utm_medium=organic&utm_campaign=local&email=private@example.com", "https://www.google.com/search?q=private");
assert.equal(first.source_page, "/area/sterling-heights");
assert.equal(first.landing_page, "/area/sterling-heights");
assert.equal(first.referrer_host, "www.google.com");
assert.equal(first.utm_source, "google");
const next = visit("/sell", "https://susiesharak.com/area/sterling-heights");
assert.equal(next.source_page, "/sell");
assert.equal(next.landing_page, "/area/sterling-heights");
assert.equal(next.utm_campaign, "local");
assert(!JSON.stringify([...storage.values()]).includes("private"), "Do not retain arbitrary URL parameters or full referrer URLs");
const fallback = visit("/home-value?utm_source=newsletter", "", true);
assert.equal(fallback.source_page, "/home-value");
assert.equal(fallback.utm_source, "newsletter");
storage.set("susie-inquiry-origin", "{malformed");
assert.equal(visit("/contact").landing_page, "/contact");
storage.set("susie-inquiry-origin", '{"landing_page":"/buy","utm_source":42}');
assert.equal(visit("/sell").utm_source, "");
console.log("PASS: inquiry attribution, first-touch retention, current form page, blocked storage, malformed data, and no unrelated URL data.");
