import{_ as e,c as t,o as a,a1 as l}from"./chunks/framework.rLRl8Q3O.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"微服务篇/SrpingCloudGtteway源码分析.md","filePath":"微服务篇/SrpingCloudGtteway源码分析.md"}'),i={name:"微服务篇/SrpingCloudGtteway源码分析.md"},r=l("<p>核心的几个接口</p><ul><li>WebFliter</li><li>WebHandler</li><li>HandlerMapping</li><li>GatewayFilter</li><li>GlobalFilter</li><li>WebFilterChain</li></ul><p>DefaultWebFilterChain FilteringWebHandler</p><p>HttpHandler</p><p>HttpWebHandlerAdapter</p><p>请求流转顺序 HttpHandler -&gt; WebHandler -&gt; WebFilter -&gt; GatewayFilter</p><p>HttpWebHandlerAdapter -&gt; ExceptionHandlingWebHandler -&gt; FilteringWebHandler -&gt; DefaultWebFilterChain -&gt; WebFilter -&gt; DispatcherHandler -&gt; HandlerMapping -&gt; GatewayFilter</p>",7),n=[r];function p(d,_,o,s,c,g){return a(),t("div",null,n)}const u=e(i,[["render",p]]);export{b as __pageData,u as default};
