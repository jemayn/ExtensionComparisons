import { LitElement as i, html as p, css as c, state as g, customElement as h } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as _ } from "@umbraco-cms/backoffice/element-api";
import { g as d } from "./entry-point-BM3P2LXs.js";
var f = Object.defineProperty, b = Object.getOwnPropertyDescriptor, m = (r, e, o, a) => {
  for (var t = a > 1 ? void 0 : a ? b(e, o) : e, n = r.length - 1, l; n >= 0; n--)
    (l = r[n]) && (t = (a ? l(e, o, t) : l(t)) || t);
  return a && t && f(e, o, t), t;
};
let s = class extends _(i) {
  constructor() {
    super(), this._message = "Hello there!", this._getMessage();
  }
  async _getMessage() {
    const { data: r, error: e } = await d();
    if (e) {
      console.log(e);
      return;
    }
    this._message = r;
  }
  render() {
    return p`
      <h1>${this._message}</h1>
    `;
  }
};
s.styles = [
  c`
      :host {
        display: block;
        padding: 24px;
      }
    `
];
m([
  g()
], s.prototype, "_message", 2);
s = m([
  h("external-data-dashboard")
], s);
const v = s;
export {
  s as ExternalDataDashboardElement,
  v as default
};
//# sourceMappingURL=external-data-dashboard-DQUSn630.js.map
