/**
 * 渊渟集团官网 - 滚动触发动画
 * 使用 IntersectionObserver 实现性能友好的滚动动画
 */

(function() {
  'use strict';

  // 配置
  const config = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  // 动画类名映射
  const animationClasses = [
    'js-animate',
    'js-animate-fade-up',
    'js-animate-fade-left',
    'js-animate-fade-right',
    'js-animate-scale'
  ];

  // 检查是否支持并启用了减少动画偏好
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /**
   * 处理元素进入视口
   */
  function handleIntersect(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // 添加可见类，触发CSS过渡
        element.classList.add('is-visible');
        
        // 停止观察已动画的元素
        observer.unobserve(element);
      }
    });
  }

  /**
   * 初始化滚动动画
   */
  function initScrollAnimations() {
    // 如果用户偏好减少动画，直接显示所有元素
    if (prefersReducedMotion) {
      animationClasses.forEach(className => {
        document.querySelectorAll('.' + className).forEach(el => {
          el.classList.add('is-visible');
        });
      });
      return;
    }

    // 创建 IntersectionObserver
    const observer = new IntersectionObserver(handleIntersect, config);

    // 观察所有需要动画的元素
    animationClasses.forEach(className => {
      document.querySelectorAll('.' + className).forEach(element => {
        observer.observe(element);
      });
    });
  }

  /**
   * 平滑滚动到锚点
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        e.preventDefault();

        const navHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      });
    });
  }

  /**
   * 初始化导航高亮
   */
  function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-link');
    const navHeight = document.getElementById('navbar').offsetHeight;

    function highlightNav() {
      const scrollPos = window.scrollY + navHeight + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    // 使用 requestAnimationFrame 优化滚动性能
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          highlightNav();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    highlightNav();
  }

  // DOM 加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initScrollAnimations();
      initSmoothScroll();
      initNavHighlight();
    });
  } else {
    initScrollAnimations();
    initSmoothScroll();
    initNavHighlight();
  }
})();
