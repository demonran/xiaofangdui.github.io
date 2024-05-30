import{_ as n,c as e,o as s,a1 as a}from"./chunks/framework.rLRl8Q3O.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"linux系列/Nginx错误解决方案.md","filePath":"linux系列/Nginx错误解决方案.md"}'),i={name:"linux系列/Nginx错误解决方案.md"},t=a(`<h4 id="问题1-2497-socket-failed-24-too-many-open-files-while-connecting-to-upstream" tabindex="-1">问题1: *2497 socket() failed (24: Too many open files) while connecting to upstream <a class="header-anchor" href="#问题1-2497-socket-failed-24-too-many-open-files-while-connecting-to-upstream" aria-label="Permalink to &quot;问题1: *2497 socket() failed (24: Too many open files) while connecting to upstream&quot;">​</a></h4><p>vi /etc/sysctl.conf 增加</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>fs.file-max = 70000</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>vi /etc/security/limits.conf 增加</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>*      soft    nofile  65535</span></span>
<span class="line"><span>*      hard    nofile  65535</span></span>
<span class="line"><span>*      soft    nproc   65535</span></span>
<span class="line"><span>*      hard    nproc   65535</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>vi /etc/nginx/nginx.conf 增加</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>worker_rlimit_nofile 20960;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="问题2-alert-49425-49425-2048-worker-connections-are-not-enough" tabindex="-1">问题2:[alert] 49425#49425: 2048 worker_connections are not enough <a class="header-anchor" href="#问题2-alert-49425-49425-2048-worker-connections-are-not-enough" aria-label="Permalink to &quot;问题2:[alert] 49425#49425: 2048 worker_connections are not enough&quot;">​</a></h4><p>nginx 默认：worker_connections: 1024 通过配置调大</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>events {</span></span>
<span class="line"><span>    worker_connections 65535;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div>`,10),o=[t];function p(l,r,c,d,u,h){return s(),e("div",null,o)}const g=n(i,[["render",p]]);export{b as __pageData,g as default};
