// 主 JavaScript 文件
document.addEventListener('DOMContentLoaded', function () {
  // 初始化所有功能
  initNavigation();
  initScrollEffects();
  initAnimations();
  initDownloadTracking();
});

// 导航功能
function initNavigation() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('hidden');
      navMenu.classList.toggle('block');
    });
  }

  // 平滑滚动到锚点
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

// 滚动效果
function initScrollEffects() {
  let lastScrollTop = 0;
  const navbar = document.getElementById('navbar');

  if (navbar) {
    window.addEventListener('scroll', function () {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      // 导航栏背景透明度
      if (scrollTop > 50) {
        navbar.classList.add('backdrop-blur-md', 'bg-white/90');
        navbar.classList.remove('bg-transparent');
      } else {
        navbar.classList.remove('backdrop-blur-md', 'bg-white/90');
        navbar.classList.add('bg-transparent');
      }

      lastScrollTop = scrollTop;
    });
  }
}

// 动画效果
function initAnimations() {
  // 观察器用于触发动画
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
      }
    });
  }, observerOptions);

  // 观察需要动画的元素
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach((el) => {
    observer.observe(el);
  });
}

// 下载跟踪
function initDownloadTracking() {
  const downloadButtons = document.querySelectorAll(
    '.download-btn, .btn-primary[href*="download"]'
  );

  downloadButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      // 这里可以添加下载跟踪逻辑
      console.log('Download button clicked:', this.href || this.textContent);

      // 可以发送分析数据
      if (typeof gtag !== 'undefined') {
        gtag('event', 'download', {
          event_category: 'engagement',
          event_label: 'authenticator_app_download',
        });
      }
    });
  });
}

// 工具函数
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 响应式图片加载
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('opacity-0');
        img.classList.add('opacity-100');
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// 错误处理
window.addEventListener('error', function (e) {
  console.error('JavaScript error:', e.error);
});

// 导出函数供其他脚本使用
window.AuthenticatorApp = {
  initNavigation,
  initScrollEffects,
  initAnimations,
  initDownloadTracking,
  debounce,
};

