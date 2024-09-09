import { LitElement as a, html as p, css as c, customElement as d } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as f } from "@umbraco-cms/backoffice/element-api";
var h = Object.defineProperty, b = Object.getOwnPropertyDescriptor, i = (n, r, s, l) => {
  for (var e = l > 1 ? void 0 : l ? b(r, s) : r, o = n.length - 1, m; o >= 0; o--)
    (m = n[o]) && (e = (l ? m(r, s, e) : m(e)) || e);
  return l && e && h(r, s, e), e;
};
let t = class extends f(a) {
  render() {
    return p`
      <h1>Hello world!</h1>
    `;
  }
};
t.styles = [
  c`
      :host {
        display: block;
        padding: 24px;
      }
    `
];
t = i([
  d("my-dashboard")
], t);
const u = t;
export {
  t as MyWelcomeDashboardElement,
  u as default
};
//# sourceMappingURL=dashboard.js.map
