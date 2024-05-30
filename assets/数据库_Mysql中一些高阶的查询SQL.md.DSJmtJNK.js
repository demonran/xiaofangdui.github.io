import{_ as s,c as i,o as a,a1 as n}from"./chunks/framework.rLRl8Q3O.js";const o=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"数据库/Mysql中一些高阶的查询SQL.md","filePath":"数据库/Mysql中一些高阶的查询SQL.md"}'),l={name:"数据库/Mysql中一些高阶的查询SQL.md"},h=n(`<h2 id="背景" tabindex="-1">背景 <a class="header-anchor" href="#背景" aria-label="Permalink to &quot;背景&quot;">​</a></h2><p>在工作中经常会遇到一些数据迁移的工作，大多数据数据迁移都存在表结构的差异，也可能砸死迁移过程中存在一些数据统计的工作，比如新开发了一个统计查询功能， 为了数据实时性，可以直接通过sql来查询基础数据通过聚合函数进行统计； 为了查询效率，也可以通过创建一张统计表来存储汇总数据，新的数据可以在数据添加时实时计算并在数据统计的工作，但是老的数据需要做一些统计插入。 当然这些工作基本上都可以通过写代码的方式进行实现， 但是如果能用sql实现岂不是更简单？</p><h2 id="场景" tabindex="-1">场景 <a class="header-anchor" href="#场景" aria-label="Permalink to &quot;场景&quot;">​</a></h2><h3 id="场景1" tabindex="-1">场景1 <a class="header-anchor" href="#场景1" aria-label="Permalink to &quot;场景1&quot;">​</a></h3><h4 id="问题" tabindex="-1">问题 <a class="header-anchor" href="#问题" aria-label="Permalink to &quot;问题&quot;">​</a></h4><p>在一个签到打卡程序中，每个人每天可以进行任务打卡，有一天产品突然提出要做一个统计页面，在页面上要显示每个任务的连续打卡天数。 历史数据： 统计到今天为止连续打卡的天数（即： 从今日倒推有多少天连续，就统计连续天数为多少天）</p><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"># 每日打卡记录表</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">create</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> table</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> daily_tasks</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    id          </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">varchar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">32</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">not null</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> primary key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    todolist_id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">varchar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">32</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> comment </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;任务ID&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    date</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        datetime</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> comment </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;打卡日期&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    user_id     longtext    </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> comment </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;用户ID&#39;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>上面是精简后的表结构，因为每次打卡后会新增加一条数据， 没有打卡就不会有数据。</p><h4 id="解决方案" tabindex="-1">解决方案 <a class="header-anchor" href="#解决方案" aria-label="Permalink to &quot;解决方案&quot;">​</a></h4><h5 id="思路" tabindex="-1">思路 <a class="header-anchor" href="#思路" aria-label="Permalink to &quot;思路&quot;">​</a></h5><ul><li><p>如果要统计连续性， 首先就需要排序，因为是统计每个人每个任务的打卡记录，所以此处应该为分组排序（todolist_id, user_id)</p></li><li><p>因为要统计时间连续性，所以要使用date进行排序；</p></li><li><p>统计连续性，可以转换为打卡日期+排序序号=当前日期， 所以排序采用倒序排序；</p><ul><li>计算打卡日期+排序序号(dt)；</li><li>过滤数据： dt = 当前日期</li><li>统计数据：过滤出来符合的数据后分组count</li></ul></li><li><p>mysql可以使用row_number()来获取排序序号</p></li></ul><h5 id="实现" tabindex="-1">实现 <a class="header-anchor" href="#实现" aria-label="Permalink to &quot;实现&quot;">​</a></h5><ol><li>查询数据 分析完问题和思路后我们可以转换成mysql语法完成sql。</li></ol><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"># 查询排序序号</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">row_number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">over</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">partition</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> by</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> todolist_id, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">daily_tasks</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">user_id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> order by</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> date</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> desc</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"># 计算dt</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">select</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> user_id, todolist_id, </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       date_add(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">date</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, interval( </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">row_number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">over</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">partition</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> by</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> todolist_id, user_id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">order by</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> date</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> desc</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">day</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dt </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> daily_tasks </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"># 统计数据， 假设上面过滤后的数据表为t1</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">select</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> todolist_id, user_id, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">count</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> days_of_continuous_done </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> t1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">where</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> t1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">dt</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> curdate() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">group by</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> todolist_id, user_id, dt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>完整的查询sql</p><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">with</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> t1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (  </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">select</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> user_id, todolist_id,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       date_add(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">date</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, interval( </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">row_number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">over</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">partition</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> by</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> todolist_id, user_id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">order by</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> date</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> desc</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">day</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dt</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> daily_tasks )</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">select</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> todolist_id, user_id, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">count</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> days_of_continuous_done </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> t1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">where</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> t1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">dt</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> curdate() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">group by</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> todolist_id, user_id, dt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><ol start="2"><li>插入数据 将查出来的数据迁移到统计表，可以使用insert into ... select</li></ol><div class="language-sql vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">sql</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"># 创建统计表</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">create</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> table</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> nes</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.user_todolist_statistics</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    id                     </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  not null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> auto_increment </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">primary key</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    todolist_id            </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">varchar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">32</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)    </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    days_of_continuous_done </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">int</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">      null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    user_id                </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">varchar</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">32</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)    </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">null</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"># 插入数据</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">insert into</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> user_todolist_statistics(todolist_id, user_id, continuous_finish_days) </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">with</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> t1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">select</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> user_id, todolist_id,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">       date_add(</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">date</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, interval( </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">row_number</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">over</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">partition</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> by</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> todolist_id, user_id </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">order by</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> date</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> desc</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">day</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dt</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> daily_tasks )</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">select</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  todolist_id, user_id, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">count</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">as</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> days_of_continuous_done </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> t1 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">where</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> t1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">dt</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> curdate() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">group by</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> todolist_id, user_id, dt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><p>如果id不是自增，是雪花或者uuid的话，数据库可以使用uuid_short()生成随机id。</p><blockquote><p>持续更新补充</p></blockquote>`,20),t=[h];function k(p,e,r,d,E,y){return a(),i("div",null,t)}const c=s(l,[["render",k]]);export{o as __pageData,c as default};
