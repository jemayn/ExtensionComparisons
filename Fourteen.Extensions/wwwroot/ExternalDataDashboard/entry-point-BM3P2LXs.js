var R = Object.defineProperty;
var S = (r, s, a) => s in r ? R(r, s, { enumerable: !0, configurable: !0, writable: !0, value: a }) : r[s] = a;
var x = (r, s, a) => S(r, typeof s != "symbol" ? s + "" : s, a);
import { UMB_AUTH_CONTEXT as T } from "@umbraco-cms/backoffice/auth";
var _ = /\{[^{}]+\}/g, b = ({ allowReserved: r, name: s, value: a }) => {
  if (a == null) return "";
  if (typeof a == "object") throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
  return `${s}=${r ? a : encodeURIComponent(a)}`;
}, E = (r) => {
  switch (r) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, q = (r) => {
  switch (r) {
    case "form":
      return ",";
    case "pipeDelimited":
      return "|";
    case "spaceDelimited":
      return "%20";
    default:
      return ",";
  }
}, D = (r) => {
  switch (r) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
}, v = ({ allowReserved: r, explode: s, name: a, style: o, value: n }) => {
  if (!s) {
    let t = (r ? n : n.map((i) => encodeURIComponent(i))).join(q(o));
    switch (o) {
      case "label":
        return `.${t}`;
      case "matrix":
        return `;${a}=${t}`;
      case "simple":
        return t;
      default:
        return `${a}=${t}`;
    }
  }
  let l = E(o), e = n.map((t) => o === "label" || o === "simple" ? r ? t : encodeURIComponent(t) : b({ allowReserved: r, name: a, value: t })).join(l);
  return o === "label" || o === "matrix" ? l + e : e;
}, $ = ({ allowReserved: r, explode: s, name: a, style: o, value: n }) => {
  if (n instanceof Date) return `${a}=${n.toISOString()}`;
  if (o !== "deepObject" && !s) {
    let t = [];
    Object.entries(n).forEach(([f, c]) => {
      t = [...t, f, r ? c : encodeURIComponent(c)];
    });
    let i = t.join(",");
    switch (o) {
      case "form":
        return `${a}=${i}`;
      case "label":
        return `.${i}`;
      case "matrix":
        return `;${a}=${i}`;
      default:
        return i;
    }
  }
  let l = D(o), e = Object.entries(n).map(([t, i]) => b({ allowReserved: r, name: o === "deepObject" ? `${a}[${t}]` : t, value: i })).join(l);
  return o === "label" || o === "matrix" ? l + e : e;
}, z = ({ path: r, url: s }) => {
  let a = s, o = s.match(_);
  if (o) for (let n of o) {
    let l = !1, e = n.substring(1, n.length - 1), t = "simple";
    e.endsWith("*") && (l = !0, e = e.substring(0, e.length - 1)), e.startsWith(".") ? (e = e.substring(1), t = "label") : e.startsWith(";") && (e = e.substring(1), t = "matrix");
    let i = r[e];
    if (i == null) continue;
    if (Array.isArray(i)) {
      a = a.replace(n, v({ explode: l, name: e, style: t, value: i }));
      continue;
    }
    if (typeof i == "object") {
      a = a.replace(n, $({ explode: l, name: e, style: t, value: i }));
      continue;
    }
    if (t === "matrix") {
      a = a.replace(n, `;${b({ name: e, value: i })}`);
      continue;
    }
    let f = encodeURIComponent(t === "label" ? `.${i}` : i);
    a = a.replace(n, f);
  }
  return a;
}, O = ({ allowReserved: r, array: s, object: a } = {}) => (o) => {
  let n = [];
  if (o && typeof o == "object") for (let l in o) {
    let e = o[l];
    if (e != null) {
      if (Array.isArray(e)) {
        n = [...n, v({ allowReserved: r, explode: !0, name: l, style: "form", value: e, ...s })];
        continue;
      }
      if (typeof e == "object") {
        n = [...n, $({ allowReserved: r, explode: !0, name: l, style: "deepObject", value: e, ...a })];
        continue;
      }
      n = [...n, b({ allowReserved: r, name: l, value: e })];
    }
  }
  return n.join("&");
}, W = (r) => {
  if (!r) return;
  let s = r.split(";")[0].trim();
  if (s.startsWith("application/json") || s.endsWith("+json")) return "json";
  if (s === "multipart/form-data") return "formData";
  if (["application/", "audio/", "image/", "video/"].some((a) => s.startsWith(a))) return "blob";
  if (s.startsWith("text/")) return "text";
}, I = ({ baseUrl: r, path: s, query: a, querySerializer: o, url: n }) => {
  let l = n.startsWith("/") ? n : `/${n}`, e = r + l;
  s && (e = z({ path: s, url: e }));
  let t = a ? o(a) : "";
  return t.startsWith("?") && (t = t.substring(1)), t && (e += `?${t}`), e;
}, j = (r, s) => {
  var o;
  let a = { ...r, ...s };
  return (o = a.baseUrl) != null && o.endsWith("/") && (a.baseUrl = a.baseUrl.substring(0, a.baseUrl.length - 1)), a.headers = C(r.headers, s.headers), a;
}, C = (...r) => {
  let s = new Headers();
  for (let a of r) {
    if (!a || typeof a != "object") continue;
    let o = a instanceof Headers ? a.entries() : Object.entries(a);
    for (let [n, l] of o) if (l === null) s.delete(n);
    else if (Array.isArray(l)) for (let e of l) s.append(n, e);
    else l !== void 0 && s.set(n, typeof l == "object" ? JSON.stringify(l) : l);
  }
  return s;
}, w = class {
  constructor() {
    x(this, "_fns");
    this._fns = [];
  }
  clear() {
    this._fns = [];
  }
  exists(r) {
    return this._fns.indexOf(r) !== -1;
  }
  eject(r) {
    let s = this._fns.indexOf(r);
    s !== -1 && (this._fns = [...this._fns.slice(0, s), ...this._fns.slice(s + 1)]);
  }
  use(r) {
    this._fns = [...this._fns, r];
  }
}, N = () => ({ error: new w(), request: new w(), response: new w() }), P = { bodySerializer: (r) => JSON.stringify(r) }, H = O({ allowReserved: !1, array: { explode: !0, style: "form" }, object: { explode: !0, style: "deepObject" } }), J = { "Content-Type": "application/json" }, U = (r = {}) => ({ ...P, baseUrl: "", fetch: globalThis.fetch, headers: J, parseAs: "auto", querySerializer: H, ...r }), M = (r = {}) => {
  let s = j(U(), r), a = () => ({ ...s }), o = (e) => (s = j(s, e), a()), n = N(), l = async (e) => {
    let t = { ...s, ...e, headers: C(s.headers, e.headers) };
    t.body && t.bodySerializer && (t.body = t.bodySerializer(t.body)), t.body || t.headers.delete("Content-Type");
    let i = I({ baseUrl: t.baseUrl ?? "", path: t.path, query: t.query, querySerializer: typeof t.querySerializer == "function" ? t.querySerializer : O(t.querySerializer), url: t.url }), f = { redirect: "follow", ...t }, c = new Request(i, f);
    for (let d of n.request._fns) c = await d(c, t);
    let A = t.fetch, u = await A(c);
    for (let d of n.response._fns) u = await d(u, c, t);
    let h = { request: c, response: u };
    if (u.ok) {
      if (u.status === 204 || u.headers.get("Content-Length") === "0") return { data: {}, ...h };
      if (t.parseAs === "stream") return { data: u.body, ...h };
      let d = (t.parseAs === "auto" ? W(u.headers.get("Content-Type")) : t.parseAs) ?? "json", y = await u[d]();
      return d === "json" && t.responseTransformer && (y = await t.responseTransformer(y)), { data: y, ...h };
    }
    let m = await u.text();
    try {
      m = JSON.parse(m);
    } catch {
    }
    let p = m;
    for (let d of n.error._fns) p = await d(m, u, c, t);
    if (p = p || {}, t.throwOnError) throw p;
    return { error: p, ...h };
  };
  return { connect: (e) => l({ ...e, method: "CONNECT" }), delete: (e) => l({ ...e, method: "DELETE" }), get: (e) => l({ ...e, method: "GET" }), getConfig: a, head: (e) => l({ ...e, method: "HEAD" }), interceptors: n, options: (e) => l({ ...e, method: "OPTIONS" }), patch: (e) => l({ ...e, method: "PATCH" }), post: (e) => l({ ...e, method: "POST" }), put: (e) => l({ ...e, method: "PUT" }), request: l, setConfig: o, trace: (e) => l({ ...e, method: "TRACE" }) };
};
const g = M(U()), G = (r) => ((r == null ? void 0 : r.client) ?? g).get({
  ...r,
  url: "/umbraco/umbracoextensions/api/v1/getMessage"
}), L = async (r, s) => {
  r.consumeContext(T, async (o) => {
    if (!o) return;
    const n = o.getOpenApiConfiguration();
    g.setConfig({
      baseUrl: n.base,
      credentials: n.credentials
    }), g.interceptors.request.use(async (l, e) => {
      const t = await n.token();
      return l.headers.set("Authorization", `Bearer ${t}`), l;
    });
  });
  const a = {
    alias: "ExternalData.Dashboard.MyExtension",
    name: "External Data Dashboard",
    type: "dashboard",
    js: () => import("./external-data-dashboard-DQUSn630.js"),
    elementName: "external-data-dashboard",
    meta: {
      label: "External Data Dashboard",
      pathname: "external-data-dashboard"
    }
  };
  s.register(a);
};
export {
  G as g,
  L as o
};
//# sourceMappingURL=entry-point-BM3P2LXs.js.map
