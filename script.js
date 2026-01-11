// ===== DOM ELEMENTS =====
const loadingScreen = document.querySelector('.loading-screen');
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const projectViews = document.querySelectorAll('.project-view');
const toast = document.querySelector('.toast');
const toastMessage = document.querySelector('.toast-message');
const downloadCvBtn = document.getElementById('downloadCv');
const currentYear = document.getElementById('currentYear');

// ===== GLOBAL VARIABLES =====
let isModalOpen = false;
let scrollPosition = 0;

// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('loaded');
        
        // Animate elements after loading
        animateOnScroll();
        
        // Start counters
        startCounters();
        
        // Animate skills
        animateSkills();
    }, 2000);
});

// ===== THEME TOGGLE =====
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    showToast(`Switched to ${newTheme} mode`);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// ===== MOBILE MENU =====
menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    
    const icon = menuToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
});

// Close menu when clicking on link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.querySelector('i').className = 'fas fa-bars';
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ===== BACK TO TOP =====
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
    
    // Update active nav link based on scroll
    updateActiveNavLink();
    
    // Animate elements on scroll
    animateOnScroll();
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== COUNTER ANIMATION =====
function startCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start counter when in viewport
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        });
        
        observer.observe(counter);
    });
}

// ===== SKILL BARS ANIMATION =====
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(() => {
                    bar.style.width = `${width}%`;
                }, 300);
                observer.unobserve(bar);
            }
        });
        
        observer.observe(bar);
    });
}

// ===== PROJECT FILTER =====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || filter === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== PROJECT MODAL =====
const projectData = {
    1: {
        title: "Campus Network Infrastructure",
        category: "Networking",
        description: "Complete network design and implementation for school campus with 500+ connected devices. This project involved planning, configuring, and deploying a robust network infrastructure.",
        details: [
            "Network segmentation using VLANs for different departments",
            "OSPF routing protocol implementation",
            "Firewall configuration and security policies",
            "Quality of Service (QoS) for priority traffic",
            "Network monitoring with PRTG"
        ],
        technologies: ["Cisco", "VLAN", "OSPF", "ACL", "QoS"],
        image: "images/project1.jpg",
        github: "https://github.com/yourusername/network-project",
        demo: "https://demo.yourportfolio.com/network-project"
    },
    2: {
        title: "Inventory Management System",
        category: "Web Development",
        description: "Full-stack web application for managing computer lab inventory with QR code integration and real-time tracking.",
        details: [
            "User authentication and role-based access",
            "QR code generation and scanning",
            "Real-time inventory updates",
            "Reporting and analytics dashboard",
            "Mobile-responsive design"
        ],
        technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap", "QR Code"],
        image: "images/project2.jpg",
        github: "https://github.com/yourusername/inventory-system",
        demo: "https://demo.yourportfolio.com/inventory-system"
    },
    3: {
        title: "Network Security Audit",
        category: "Security",
        description: "Comprehensive security assessment and penetration testing for school network infrastructure.",
        details: [
            "Vulnerability scanning with OpenVAS",
            "Penetration testing using Metasploit",
            "Network traffic analysis with Wireshark",
            "Security policy recommendations",
            "Staff security awareness training"
        ],
        technologies: ["Wireshark", "Nmap", "Metasploit", "OpenVAS", "Security"],
        image: "images/project3.jpg",
        github: "https://github.com/yourusername/security-audit",
        demo: "https://demo.yourportfolio.com/security-audit"
    },
    4: {
        title: "Enterprise WiFi Setup",
        category: "Networking",
        description: "Enterprise-grade wireless network deployment with centralized management and security features.",
        details: [
            "Site survey and heat mapping",
            "Multiple access point deployment",
            "RADIUS server for authentication",
            "Guest network with captive portal",
            "Bandwidth management and monitoring"
        ],
        technologies: ["MikroTik", "UniFi", "RADIUS", "WiFi", "Security"],
        image: "images/project4.jpg",
        github: "https://github.com/yourusername/wifi-setup",
        demo: "https://demo.yourportfolio.com/wifi-setup"
    }
};

projectViews.forEach(view => {
    view.addEventListener('click', (e) => {
        e.preventDefault();
        const projectId = view.getAttribute('data-project');
        const project = projectData[projectId];
        
        if (project) {
            showProjectModal(project);
        }
    });
});

function showProjectModal(project) {
    if (isModalOpen) return;
    isModalOpen = true;
    
    // Save current scroll position
    scrollPosition = window.pageYOffset;
    
    // Disable body scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
    
    // Create modal HTML
    const modalHTML = `
        <div class="modal-overlay" id="modalOverlay">
            <div class="modal">
                <div class="modal-header">
                    <h3>${project.title}</h3>
                    <button class="modal-close" id="modalClose">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-image">
                        <img src="${project.image}" alt="${project.title}" onerror="this.src='https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80'">
                    </div>
                    <div class="modal-content">
                        <div class="modal-category">${project.category}</div>
                        <p class="modal-description">${project.description}</p>
                        
                        <div class="modal-section">
                            <h4><i class="fas fa-list-check"></i> Project Details</h4>
                            <ul>
                                ${project.details.map(detail => `<li><i class="fas fa-check"></i> ${detail}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="modal-section">
                            <h4><i class="fas fa-code"></i> Technologies Used</h4>
                            <div class="modal-tech">
                                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                            </div>
                        </div>
                        
                        <div class="modal-actions">
                            <a href="${project.github}" target="_blank" class="btn btn-primary" id="githubBtn">
                                <i class="fab fa-github"></i> View Code
                            </a>
                            <a href="${project.demo}" target="_blank" class="btn btn-outline" id="demoBtn">
                                <i class="fas fa-external-link-alt"></i> Live Demo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add modal styles if not already added
    if (!document.getElementById('modal-styles')) {
        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                padding: 20px;
                backdrop-filter: blur(5px);
                animation: fadeIn 0.3s ease;
                overflow-y: auto;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .modal {
                background: var(--light);
                border-radius: var(--radius-lg);
                max-width: 800px;
                width: 100%;
                max-height: 85vh;
                overflow-y: auto;
                box-shadow: var(--shadow-xl);
                animation: modalSlideIn 0.3s ease;
                position: relative;
            }
            
            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(-50px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px 30px;
                border-bottom: 1px solid var(--gray-light);
                position: sticky;
                top: 0;
                background: var(--light);
                z-index: 10;
            }
            
            .modal-header h3 {
                font-size: 1.5rem;
                color: var(--dark);
                margin: 0;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 2rem;
                color: var(--gray);
                cursor: pointer;
                line-height: 1;
                transition: var(--transition);
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
            }
            
            .modal-close:hover {
                color: var(--danger);
                background: rgba(239, 68, 68, 0.1);
            }
            
            .modal-body {
                padding: 30px;
            }
            
            .modal-image {
                margin-bottom: 25px;
                border-radius: var(--radius-md);
                overflow: hidden;
                height: 300px;
            }
            
            .modal-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
            }
            
            .modal-category {
                display: inline-block;
                padding: 6px 16px;
                background: rgba(37, 99, 235, 0.1);
                color: var(--primary);
                border-radius: var(--radius-full);
                font-size: 0.8rem;
                font-weight: 500;
                margin-bottom: 15px;
            }
            
            .modal-description {
                color: var(--gray);
                margin-bottom: 25px;
                line-height: 1.7;
                font-size: 1rem;
            }
            
            .modal-section {
                margin-bottom: 25px;
            }
            
            .modal-section h4 {
                font-size: 1.1rem;
                margin-bottom: 15px;
                color: var(--dark);
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .modal-section h4 i {
                color: var(--primary);
            }
            
            .modal-section ul {
                list-style: none;
                padding-left: 0;
            }
            
            .modal-section li {
                color: var(--gray);
                margin-bottom: 12px;
                padding-left: 25px;
                position: relative;
                line-height: 1.6;
            }
            
            .modal-section li i {
                position: absolute;
                left: 0;
                top: 5px;
                color: var(--primary);
                font-size: 0.9rem;
            }
            
            .modal-tech {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }
            
            .modal-tech span {
                padding: 8px 16px;
                background: var(--gray-light);
                color: var(--dark);
                border-radius: var(--radius-full);
                font-size: 0.85rem;
                font-weight: 500;
                transition: var(--transition);
            }
            
            .modal-tech span:hover {
                background: var(--primary);
                color: white;
                transform: translateY(-2px);
            }
            
            .modal-actions {
                display: flex;
                gap: 15px;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid var(--gray-light);
            }
            
            .modal-actions .btn {
                flex: 1;
                justify-content: center;
            }
            
            @media (max-width: 768px) {
                .modal {
                    max-height: 90vh;
                    margin: 10px;
                }
                
                .modal-header {
                    padding: 15px 20px;
                }
                
                .modal-body {
                    padding: 20px;
                }
                
                .modal-image {
                    height: 200px;
                }
                
                .modal-actions {
                    flex-direction: column;
                }
                
                .modal-section li {
                    padding-left: 22px;
                    font-size: 0.95rem;
                }
            }
            
            @media (max-width: 480px) {
                .modal-header h3 {
                    font-size: 1.2rem;
                }
                
                .modal-description {
                    font-size: 0.95rem;
                }
                
                .modal-tech span {
                    padding: 6px 12px;
                    font-size: 0.8rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add event listeners
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.getElementById('modalClose');
    
    // Close modal function
    function closeModal() {
        if (!isModalOpen) return;
        
        modalOverlay.style.animation = 'fadeOut 0.3s ease';
        modalOverlay.querySelector('.modal').style.animation = 'modalSlideOut 0.3s ease';
        
        setTimeout(() => {
            modalOverlay.remove();
            
            // Re-enable body scroll
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            
            // Restore scroll position
            window.scrollTo(0, scrollPosition);
            
            isModalOpen = false;
            
            // Remove modal styles if no modals are open
            if (!document.querySelector('.modal-overlay')) {
                const modalStyles = document.getElementById('modal-styles');
                if (modalStyles) {
                    modalStyles.remove();
                }
            }
        }, 250);
    }
    
    // Add close animation styles
    const closeStyle = document.createElement('style');
    closeStyle.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        @keyframes modalSlideOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-50px);
            }
        }
    `;
    document.head.appendChild(closeStyle);
    
    // Close modal on X button click
    modalClose.addEventListener('click', closeModal);
    
    // Close modal on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape' && isModalOpen) {
            closeModal();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
    
    // Prevent modal close on modal content click
    modalOverlay.querySelector('.modal').addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Handle demo button click
    const demoBtn = document.getElementById('demoBtn');
    const githubBtn = document.getElementById('githubBtn');
    
    demoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Opening live demo in new tab...');
        setTimeout(() => {
            window.open(project.demo, '_blank');
        }, 500);
    });
    
    githubBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showToast('Opening GitHub repository...');
        setTimeout(() => {
            window.open(project.github, '_blank');
        }, 500);
    });
    
    // Remove close style after animation
    setTimeout(() => {
        closeStyle.remove();
    }, 300);
}

// ===== CONTACT FORM =====
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const subject = contactForm.querySelector('input[placeholder="Subject"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate form submission
    showToast(`Thank you ${name}! Your message has been sent. I'll get back to you soon.`, 'success');
    
    // Reset form
    contactForm.reset();
    
    // In a real application, you would send data to a server here
    console.log('Form submitted:', { name, email, subject, message });
});

// ===== DOWNLOAD CV =====
downloadCvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showToast('Downloading CV...', 'info');
    
    // Simulate download
    setTimeout(() => {
        // In a real application, this would link to your actual CV file
        const link = document.createElement('a');
        link.href = '#';
        link.download = 'Muhammad_Rizki_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, 1000);
});

// ===== TOAST NOTIFICATION =====
function showToast(message, type = 'success') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span class="toast-message">${message}</span>
        </div>
    `;
    
    // Add toast styles if not already added
    if (!document.getElementById('toast-styles')) {
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            .toast {
                position: fixed;
                bottom: 30px;
                left: 30px;
                background: var(--light);
                padding: 15px 25px;
                border-radius: var(--radius-md);
                box-shadow: var(--shadow-lg);
                display: flex;
                align-items: center;
                gap: 15px;
                transform: translateX(-150%);
                transition: transform 0.3s ease;
                z-index: 1000;
                max-width: 400px;
                animation: toastSlideIn 0.3s ease forwards;
            }
            
            @keyframes toastSlideIn {
                from { transform: translateX(-150%); }
                to { transform: translateX(0); }
            }
            
            [data-theme="dark"] .toast {
                background: var(--gray-dark);
            }
            
            .toast.show {
                transform: translateX(0);
            }
            
            .toast-content {
                display: flex;
                align-items: center;
                gap: 15px;
            }
            
            .toast-content i {
                color: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--danger)' : 'var(--warning)'};
                font-size: 1.2rem;
            }
            
            .toast-message {
                font-weight: 500;
                color: var(--dark);
                font-size: 0.95rem;
            }
            
            @media (max-width: 768px) {
                .toast {
                    left: 20px;
                    right: 20px;
                    bottom: 20px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'toastSlideOut 0.3s ease forwards';
        
        const slideOutStyle = document.createElement('style');
        slideOutStyle.textContent = `
            @keyframes toastSlideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(-150%); opacity: 0; }
            }
        `;
        document.head.appendChild(slideOutStyle);
        
        setTimeout(() => {
            toast.remove();
            slideOutStyle.remove();
            
            // Remove toast styles if no toasts are showing
            if (!document.querySelector('.toast')) {
                const toastStyles = document.getElementById('toast-styles');
                if (toastStyles) {
                    toastStyles.remove();
                }
            }
        }, 300);
    }, 3000);
}

// ===== ANIMATE ON SCROLL =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.project-card, .skill-category, .achievement-card');
    
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// ===== SET CURRENT YEAR =====
currentYear.textContent = new Date().getFullYear();

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
    // Set initial styles for animation
    document.querySelectorAll('.project-card, .skill-category, .achievement-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Add tooltip functionality
    document.querySelectorAll('[data-tooltip]').forEach(el => {
        el.addEventListener('mouseenter', () => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = el.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = el.getBoundingClientRect();
            tooltip.style.position = 'fixed';
            tooltip.style.top = `${rect.top - 40}px`;
            tooltip.style.left = `${rect.left + rect.width / 2}px`;
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.background = 'var(--dark)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '6px 12px';
            tooltip.style.borderRadius = 'var(--radius-sm)';
            tooltip.style.fontSize = '0.8rem';
            tooltip.style.zIndex = '1000';
            tooltip.style.whiteSpace = 'nowrap';
            tooltip.style.pointerEvents = 'none';
            
            el._tooltip = tooltip;
        });
        
        el.addEventListener('mouseleave', () => {
            if (el._tooltip) {
                el._tooltip.remove();
                delete el._tooltip;
            }
        });
    });
    
    // Add social link handlers
    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = icon.getAttribute('title');
            showToast(`Opening ${platform}...`, 'info');
            
            // Simulate opening social media
            setTimeout(() => {
                window.open(icon.href, '_blank');
            }, 500);
        });
    });
    
    // Add newsletter form handler
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            if (email) {
                showToast('Thanks for subscribing!', 'success');
                newsletterForm.reset();
            }
        });
    }
});

// ===== TYPING EFFECT FOR HERO =====
const heroTitle = document.querySelector('.hero-title .highlight');
const titles = ['Code & Cables', 'Networks & Security', 'Solutions & Systems', 'Technology & Innovation'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isPaused = false;

function typeEffect() {
    if (!heroTitle) return;
    
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        heroTitle.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
    } else {
        heroTitle.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentTitle.length) {
        isPaused = true;
        setTimeout(() => {
            isPaused = false;
            isDeleting = true;
        }, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
    }
    
    const speed = isDeleting ? 50 : isPaused ? 1000 : 100;
    setTimeout(typeEffect, speed);
}

// Start typing effect after page loads
setTimeout(() => {
    if (heroTitle) {
        typeEffect();
    }
}, 1000);

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.querySelector('i').className = 'fas fa-bars';
            }
            
            // Calculate scroll position
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            // Smooth scroll
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});
