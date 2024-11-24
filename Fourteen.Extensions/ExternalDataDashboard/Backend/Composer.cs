using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Umbraco.Cms.Api.Management.OpenApi;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;

namespace Fourteen.Extensions.ExternalDataDashboard.Backend;

public class Composer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.Configure<SwaggerGenOptions>(opt =>
        {
            opt.SwaggerDoc("Umbraco.Extension", new OpenApiInfo
            {
                Title = "Umbraco ExtensionBackoffice API",
                Version = "1.0",
            });

            opt.OperationFilter<UmbracoExtensionOperationSecurityFilter>();
        });
    }
}

public class UmbracoExtensionOperationSecurityFilter : BackOfficeSecurityRequirementsOperationFilterBase
{
    protected override string ApiName => "Umbraco.Extension";
}