import { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';
import { ManifestDashboard } from '@umbraco-cms/backoffice/extension-registry';
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth';
import { client } from './client';

export const onInit: UmbEntryPointOnInit = async (_host, extensionRegistry) => {
    

    _host.consumeContext(UMB_AUTH_CONTEXT, async (auth) => {
        if (!auth) return;

        const config = auth.getOpenApiConfiguration();
        client.setConfig({
            baseUrl: config.base,
            credentials: config.credentials
          });
      
          // For every request being made, add the token to the headers
          // Can't use the setConfig approach above as its set only once and
          // tokens expire and get refreshed
          client.interceptors.request.use(async (request, _options) => {
            const token = await config.token();
            request.headers.set('Authorization', `Bearer ${token}`);
            return request;
          });
    });
    
    const dashboard : ManifestDashboard = {
        alias: 'ExternalData.Dashboard.MyExtension',
        name: 'External Data Dashboard',
        type: 'dashboard',
        js: () => import('./external-data-dashboard'),
        elementName: 'external-data-dashboard',
        meta: {
            label: 'External Data Dashboard',
            pathname: 'external-data-dashboard'
        }
    }
    
    extensionRegistry.register(dashboard);
};