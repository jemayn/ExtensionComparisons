import { LitElement as f, when as b, html as d, css as y, state as h, customElement as w } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as C } from "@umbraco-cms/backoffice/element-api";
import { UMB_COLLECTION_CONTEXT as x } from "@umbraco-cms/backoffice/collection";
var A = Object.defineProperty, E = Object.getOwnPropertyDescriptor, p = (e) => {
  throw TypeError(e);
}, l = (e, t, i, s) => {
  for (var o = s > 1 ? void 0 : s ? E(t, i) : t, r = e.length - 1, c; r >= 0; r--)
    (c = e[r]) && (o = (s ? c(t, i, o) : c(o)) || o);
  return s && o && A(t, i, o), o;
}, u = (e, t, i) => t.has(e) || p("Cannot " + i), I = (e, t, i) => (u(e, t, "read from private field"), i ? i.call(e) : t.get(e)), v = (e, t, i) => t.has(e) ? p("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, i), g = (e, t, i, s) => (u(e, t, "write to private field"), t.set(e, i), i), O = (e, t, i) => (u(e, t, "access private method"), i), n, m, _;
let a = class extends C(f) {
  constructor() {
    super(), v(this, m), this._tableConfig = {
      allowSelection: !0,
      hideIcon: !1
    }, this._tableColumns = [
      {
        name: "Name",
        alias: "name",
        allowSorting: !0
      },
      {
        name: "Description",
        alias: "description",
        allowSorting: !0
      },
      {
        name: "Author",
        alias: "author"
      }
    ], this._tableItems = [
      {
        id: "1",
        icon: "icon-document",
        entityType: "my-listview-item",
        data: [
          {
            columnAlias: "name",
            value: "My node 1"
          },
          {
            columnAlias: "author",
            value: "Author 1"
          },
          {
            columnAlias: "description",
            value: "A short description of my node"
          }
        ]
      },
      {
        id: "2",
        icon: "icon-document",
        entityType: "my-listview-item",
        data: [
          {
            columnAlias: "name",
            value: "Ny node 2"
          },
          {
            columnAlias: "author",
            value: "Author 2"
          },
          {
            columnAlias: "description",
            value: "B short description of my node"
          }
        ]
      }
    ], v(this, n), this.consumeContext(x, (e) => {
      g(this, n, e), this.observe(
        I(this, n).items,
        (t) => {
          console.log(t), this._tableItems = t;
        },
        "umbCollectionItemsObserver"
      );
    });
  }
  render() {
    return b(
      this._tableItems.length,
      () => d`
      <uui-box>
        <umb-table
          .config=${this._tableConfig}
          .columns=${this._tableColumns}
          .items=${this._tableItems}
          @ordered=${O(this, m, _)}
        ></umb-table>
        </uui-box>
      `,
      () => d`<div class="flex">
        ${this.localize.term("content_noItemsToShow")}
      </div>`
    );
  }
};
n = /* @__PURE__ */ new WeakMap();
m = /* @__PURE__ */ new WeakSet();
_ = function(e) {
  this._tableItems.reverse();
};
a.styles = [
  y`
      :host {
        display: flex;
        flex-direction: column;
      }

      .flex {
        display: flex;
        justify-content: center;
      }
    `
];
l([
  h()
], a.prototype, "_tableConfig", 2);
l([
  h()
], a.prototype, "_tableColumns", 2);
l([
  h()
], a.prototype, "_tableItems", 2);
a = l([
  w("listview-dashboard")
], a);
const L = a;
export {
  a as ListviewDashboardElement,
  L as default
};
//# sourceMappingURL=listviewdashboard.js.map
