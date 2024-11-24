using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Web.Common.Authorization;
using Umbraco.Cms.Web.Common.Routing;

namespace Fourteen.Extensions.ExternalDataDashboard.Backend;

[ApiController]
[BackOfficeRoute("umbracoextensions/api/v{version:apiVersion}")]
[ApiVersion("1.0")]
[Authorize(Policy = AuthorizationPolicies.SectionAccessContent)]
[ApiExplorerSettings(GroupName = "Umbraco.Extension")]
[MapToApi("Umbraco.Extension")]
public class SecureApiController : ControllerBase
{
    [HttpGet("getMessage")]
    public string GetMessage() 
    {
        return "This is a message from a secure API controller!";
    }
}