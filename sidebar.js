/**
 * sidebar.js - 动态生成侧边栏，自动识别页面路径
 * 所有页面只需引入此文件，导航自动统一
 * 使用方法：
 *   1. 在页面 <body> 最顶部放 <div id="sidebar-container"></div>
 *   2. 引入此文件：<script src="sidebar.js"></script>
 *   3. 确保页面有 <div class="mobile-header"> 和 <div class="sidebar-overlay">
 */

(function () {
  // 检测当前页面路径
  const path = window.location.pathname;
  const isInGuide = path.includes('/guide/');
  const base = isInGuide ? '../' : '';
  const guide = isInGuide ? '' : 'guide/';

  // 获取当前页面文件名，用于高亮
  const currentPage = path.split('/').pop();

  // 生成侧边栏 HTML
  const sidebarHTML = `
<aside class="sidebar" id="sidebar">
  <div class="sidebar-logo"><a href="${base}index.html" style="text-decoration:none;color:inherit;">DELTA<span>FORCE</span></a></div>
  <div class="sidebar-nav" id="sidebarNav">
    <div class="sidebar-group">
      <div class="sidebar-group-label">基础</div>
      <a href="${guide}beginner.html" data-icon="📖">入门</a>
      <a href="${guide}modes.html" data-icon="🎮">模式</a>
      <a href="${guide}operators.html" data-icon="👤">干员</a>
      <a href="${base}maps.html" data-icon="🗺">地图攻略</a>
      <a href="${guide}weapons.html" data-icon="🔫">武器</a>
    </div>
    <div class="sidebar-group">
      <div class="sidebar-group-label">进阶</div>
      <a href="${guide}advanced.html" data-icon="⚡">进阶</a>
      <a href="${base}guide/maps.html" data-icon="🗺">高级地图</a>
      <a href="${guide}lore.html" data-icon="📜">世界观</a>
    </div>
    <div class="sidebar-group">
      <div class="sidebar-group-label">资源</div>
      <a href="${guide}updates.html" data-icon="📋">更新</a>
      <a href="${guide}videos.html" data-icon="🎬">视频</a>
      <a href="${guide}faq.html" data-icon="❓">FAQ</a>
      <a href="${guide}plan.html" data-icon="📊">计划</a>
      <a href="${guide}economy.html" data-icon="💰">经济</a>
      <a href="${guide}easter-eggs.html" data-icon="🥚">彩蛋</a>
      <a href="${guide}tips.html" data-icon="💡">口诀</a>
      <a href="${guide}community.html" data-icon="🌐">社区</a>
    </div>
    <div class="sidebar-group">
      <div class="sidebar-group-label">关于</div>
      <a href="${base}privacy.html" data-icon="🔒">隐私政策</a>
      <a href="${base}disclaimer.html" data-icon="⚖">免责声明</a>
      <a href="${base}about.html" data-icon="ℹ">关于本站</a>
    </div>
  </div>
  <div class="sidebar-footer">
    <a href="${base}about.html">关于</a>
    <a href="${base}privacy.html">隐私</a>
    <a href="${base}disclaimer.html">免责</a>
    <a href="https://github.com/sat-xpi/GameSite" target="_blank" rel="noopener">GitHub</a>
  </div>
</aside>

<div class="mobile-header" id="mobileHeader">
  <div class="sidebar-logo"><a href="${base}index.html" style="text-decoration:none;color:inherit;">DELTA<span>FORCE</span></a></div>
  <button class="sidebar-toggle" id="sidebarToggle" aria-label="菜单">&#9776;</button>
</div>
<div class="sidebar-overlay" id="sidebarOverlay"></div>
  `;

  // 注入侧边栏
  const container = document.getElementById('sidebar-container');
  if (container) {
    container.innerHTML = sidebarHTML;
  }

  // 高亮当前页面
  function highlightCurrentPage() {
    const links = document.querySelectorAll('#sidebarNav a');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const linkPage = href.split('/').pop();
      // 地图页面特殊处理
      if (currentPage === 'maps.html' && href.endsWith('maps.html') && !href.includes('guide/')) {
        link.classList.add('active');
      } else if (currentPage === 'maps.html' && href.includes('guide/maps.html')) {
        link.classList.add('active');
      } else if (linkPage === currentPage) {
        link.classList.add('active');
      }
    });
  }

  // 绑定移动端侧边栏开关
  function bindSidebarToggle() {
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (toggle && sidebar) {
      toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        if (overlay) overlay.classList.toggle('active');
      });
    }
    if (overlay && sidebar) {
      overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
      });
    }
  }

  // 返回顶部按钮
  function bindBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 初始化
  highlightCurrentPage();
  bindSidebarToggle();
  bindBackToTop();

})();
