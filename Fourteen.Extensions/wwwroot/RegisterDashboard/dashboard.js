import { LitElement as m, html as p, css as i, customElement as d } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as f } from "@umbraco-cms/backoffice/element-api";
var h = Object.defineProperty, b = Object.getOwnPropertyDescriptor, c = (a, r, l, t) => {
  for (var e = t > 1 ? void 0 : t ? b(r, l) : r, o = a.length - 1, n; o >= 0; o--)
    (n = a[o]) && (e = (t ? n(r, l, e) : n(e)) || e);
  return t && e && h(r, l, e), e;
};
let s = class extends f(m) {
  render() {
    return p`
      <h1>Hello world!</h1>
    `;
  }
};
s.styles = [
  i`
      :host {
        display: block;
        padding: 24px;
      }
    `
];
s = c([
  d("register-dashboard")
], s);
const u = s;
export {
  s as RegisterDashboardElement,
  u as default
};
//# sourceMappingURL=dashboard.js.map
