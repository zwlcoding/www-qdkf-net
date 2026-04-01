//**
 * 渊渟集团官网 - 导航栏交互
 */

(function() {
  'use strict';

  const navbar = document.getElementById('navbar');
  const navbarToggle = document.getElementById('navbarToggle');
  const navbarNav = document.getElementById('navbarNav');
  const navbarOverlay = document.getElementById('navbarOverlay');
  const navbarLinks = document.querySelectorAll('.navbar-link');

  let isMenuOpen = false;

  /**
   * 处理滚动效果
   */
  function handleScroll() {
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  }

  /**
   * 切换菜单状态
   */
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  }

  /**
   * 打开菜单
   */
  function openMenu() {
    navbarToggle.classList.add('is-active');
    navbarNav.classList.add('is-open');
    navbarOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    isMenuOpen = true;
  }

  /**
   * 关闭菜单
   */
  function closeMenu() {
    navbarToggle.classList.remove('is-active');
    navbarNav.classList.remove('is-open');
    navbarOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
    isMenuOpen = false;
  }

  /**
   * 初始化事件监听
   */
  function init() {
    // 滚动监听（使用 requestAnimationFrame 优化）
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // 初始检查
    handleScroll();

    // 移动端菜单切换
    if (navbarToggle) {
      navbarToggle.addEventListener('click', toggleMenu);
    }

    // 点击遮罩关闭菜单
    if (navbarOverlay) {
      navbarOverlay.addEventListener('click', closeMenu);
    }

    // 点击导航链接关闭菜单
    navbarLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (isMenuOpen) {
          closeMenu();
        }
      });
    });

    // ESC键关闭菜单
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    });

    // 窗口大小改变时重置菜单
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768 && isMenuOpen) {
        closeMenu();
      }
    });
  }

  // DOM 加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
