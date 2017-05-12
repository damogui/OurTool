using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(OurTool.Startup))]
namespace OurTool
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
