
import { LitElement, css, html, customElement} from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";

@customElement('register-dashboard')
export class RegisterDashboardElement extends UmbElementMixin(LitElement) {

  render() {
    return html`
      <h1>Hello world!</h1>
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

export default RegisterDashboardElement;

declare global {
  interface HTMLElementTagNameMap {
    'register-dashboard': RegisterDashboardElement;
  }
}