import { LitElement, css, html, customElement, state, when} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import type { UmbTableColumn, UmbTableConfig, UmbTableElement, UmbTableItem, UmbTableOrderedEvent } from '@umbraco-cms/backoffice/components';
import { UMB_COLLECTION_CONTEXT, UmbDefaultCollectionContext } from "@umbraco-cms/backoffice/collection";

@customElement('listview-dashboard')
export class ListviewDashboardElement extends UmbElementMixin(LitElement) {
  @state()
  private _tableConfig: UmbTableConfig = {
    allowSelection: true,
    hideIcon : false
  };

  @state()
	private _tableColumns: Array<UmbTableColumn> = [
		{
			name: 'Name',
			alias: 'name',
      allowSorting: true
		},
    {
			name: 'Description',
			alias: 'description',
      allowSorting: true
		},
		{
			name: 'Author',
			alias: 'author',
		}		
	];
 
  @state()
	private _tableItems: Array<UmbTableItem> = [
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
  ];

  #collectionContext?: UmbDefaultCollectionContext;

  #ordering(event: UmbTableOrderedEvent) {

    this._tableItems.reverse();

    // TODO: Get sorting working correctly based on properties

    // var table = event.target as UmbTableElement;
    // console.log(table);
    // console.log(table.orderingColumn)
    // console.log(table.orderingDesc)
    // this._tableItems.sort((a, b) => {
    //   var name_A = a.data.find(obj => obj.columnAlias == table.orderingColumn) || "";
    //   var name_B = b.data.find(obj => obj.columnAlias == table.orderingColumn) || "";

    //   if (name_A < name_B) {
    //     return -1;
    //   }
    //   if (name_A > name_B) {
    //     return 1;
    //   }
    //   return 0;
    // })

    // if(table.orderingDesc){
    //   console.log(this._tableItems);
    //   this._tableItems.reverse();
    //   console.log(this._tableItems);
    // }
	};

  constructor() {
		super();

    this.consumeContext(UMB_COLLECTION_CONTEXT, (instance) => {
      this.#collectionContext = instance;

      this.observe(
        this.#collectionContext.items,
        (items) => {
          console.log(items)
          this._tableItems = items;
        },
        'umbCollectionItemsObserver'
      )
    })
	}

  render() {
    return when(
      this._tableItems.length,
      () => html`
      <uui-box>
        <umb-table
          .config=${this._tableConfig}
          .columns=${this._tableColumns}
          .items=${this._tableItems}
          @ordered=${this.#ordering}
        ></umb-table>
        </uui-box>
      `,
      () => html`<div class="flex">
        ${this.localize.term("content_noItemsToShow")}
      </div>`
    );
  }

  static styles = [
    css`
      :host {
        display: flex;
        flex-direction: column;
      }

      .flex {
        display: flex;
        justify-content: center;
      }
    `,
  ];
}

export default ListviewDashboardElement;

declare global {
  interface HTMLElementTagNameMap {
    'listview-dashboard': ListviewDashboardElement;
  }
}