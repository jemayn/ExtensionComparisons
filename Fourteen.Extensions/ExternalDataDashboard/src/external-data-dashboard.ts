import { LitElement, css, html, customElement, state} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { getUmbracoUmbracoextensionsApiV1GetMessage } from "./client";

@customElement('external-data-dashboard')
export class ExternalDataDashboardElement extends UmbElementMixin(LitElement) {

  @state()
  private _message: string | undefined = "Hello there!";

  constructor() {
    super();

    this._getMessage();
  }

  private async _getMessage() {
    const {data, error} = await getUmbracoUmbracoextensionsApiV1GetMessage();

    if(error){
      console.log(error);
      return;
    }

    this._message = data;
  }

  render() {
    return html`
      <h1>${this._message}</h1>
    `;
  }

  static styles = [
    css`
      :host {
        display: block;
        padding: 24px;
      }
    `,
  ];
}

export default ExternalDataDashboardElement;

declare global {
  interface HTMLElementTagNameMap {
    'external-data-dashboard': ExternalDataDashboardElement;
  }
}