// 网站交互功能脚本

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单滚动效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(102, 126, 234, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.padding = '15px 0';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.boxShadow = 'none';
            header.style.padding = '20px 0';
        }
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 功能卡片动画
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });

    // 价格卡片动画
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('popular')) {
                this.style.transform = 'translateY(0)';
            }
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });

    // 响应式导航菜单
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-links');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    // 启动动画效果
    animateOnScroll();
    
    // 监听滚动事件，实现滚动动画
    window.addEventListener('scroll', animateOnScroll);
});

// 滚动动画函数
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('active');
        }
    });
}

// 加载图标字体
function loadFontAwesome() {
    const fontAwesomeScript = document.createElement('script');
    fontAwesomeScript.src = 'https://kit.fontawesome.com/a076d05399.js';
    fontAwesomeScript.crossOrigin = 'anonymous';
    document.head.appendChild(fontAwesomeScript);
}

// 预加载图片
function preloadImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const preloadImg = new Image();
            preloadImg.src = src;
        }
    });
}

// 页面加载完成后执行
window.addEventListener('load', function() {
    // 显示页面内容（如果有加载动画）
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(function() {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            document.body.classList.add('loaded');
        }, 500);
    }
    
    // 预加载图片
    preloadImages();
});

// 移动端菜单关闭（点击链接后）
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        const navMenu = document.querySelector('.nav-links');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (navMenu && menuToggle && window.innerWidth < 768) {
            navMenu.classList.remove('active');
        }
    });
});

// 调整窗口大小时重新计算布局
window.addEventListener('resize', function() {
    // 响应式布局调整代码
    if (window.innerWidth > 768) {
        const navMenu = document.querySelector('.nav-links');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
});

// 返回顶部按钮
const backToTopButton = document.createElement('button');
backToTopButton.id = 'backToTop';
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #667eea;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 9999;
`;

// 添加到页面
document.body.appendChild(backToTopButton);

// 返回顶部按钮点击事件
backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 返回顶部按钮显示/隐藏控制
window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

// 添加平滑滚动行为到整个页面
try {
    document.documentElement.style.scrollBehavior = 'smooth';
} catch (e) {
    // 平滑滚动不支持时的降级处理
}

// 添加键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // Alt+↑ 返回顶部
    if (e.altKey && e.key === 'ArrowUp') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Alt+↓ 滚动到底部
    if (e.altKey && e.key === 'ArrowDown') {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
});