using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Web.BackOffice.Controllers;

namespace Thirteen.Extensions.ExternalDataDashboard;

public class SecureApiController : UmbracoAuthorizedApiController 
{
    [HttpGet]
    public string GetMessage() 
    {
        return "This is a message from a secure API controller!";
    }
}