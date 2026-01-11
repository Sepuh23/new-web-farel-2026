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
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
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
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
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
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
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
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
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
    // Create modal HTML
    const modalHTML = `
        <div class="modal-overlay" id="modalOverlay">
            <div class="modal">
                <div class="modal-header">
                    <h3>${project.title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-image">
                        <img src="${project.image}" alt="${project.title}">
                    </div>
                    <div class="modal-content">
                        <div class="modal-category">${project.category}</div>
                        <p class="modal-description">${project.description}</p>
                        
                        <div class="modal-section">
                            <h4>Project Details</h4>
                            <ul>
                                ${project.details.map(detail => `<li>${detail}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="modal-section">
                            <h4>Technologies Used</h4>
                            <div class="modal-tech">
                                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                            </div>
                        </div>
                        
                        <div class="modal-actions">
                            <a href="#" class="btn btn-primary">
                                <i class="fab fa-github"></i> View Code
                            </a>
                            <a href="#" class="btn btn-outline">
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
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            padding: 20px;
            backdrop-filter: blur(5px);
        }
        
        .modal {
            background: var(--light);
            border-radius: var(--radius-lg);
            max-width: 800px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: var(--shadow-xl);
            animation: modalSlideIn 0.3s ease;
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
        }
        
        .modal-header h3 {
            font-size: 1.5rem;
            color: var(--dark);
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 2rem;
            color: var(--gray);
            cursor: pointer;
            line-height: 1;
            transition: var(--transition);
        }
        
        .modal-close:hover {
            color: var(--danger);
        }
        
        .modal-body {
            padding: 30px;
        }
        
        .modal-image {
            margin-bottom: 20px;
            border-radius: var(--radius-md);
            overflow: hidden;
        }
        
        .modal-image img {
            width: 100%;
            height: 200px;
            object-fit: cover;
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
        }
        
        .modal-section {
            margin-bottom: 25px;
        }
        
        .modal-section h4 {
            font-size: 1.1rem;
            margin-bottom: 10px;
            color: var(--dark);
        }
        
        .modal-section ul {
            list-style: none;
            padding-left: 20px;
        }
        
        .modal-section li {
            color: var(--gray);
            margin-bottom: 8px;
            position: relative;
        }
        
        .modal-section li::before {
            content: '•';
            color: var(--primary);
            font-weight: bold;
            position: absolute;
            left: -15px;
        }
        
        .modal-tech {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .modal-tech span {
            padding: 6px 12px;
            background: var(--gray-light);
            color: var(--gray);
            border-radius: var(--radius-full);
            font-size: 0.8rem;
        }
        
        .modal-actions {
            display: flex;
            gap: 15px;
            margin-top: 30px;
        }
        
        @media (max-width: 768px) {
            .modal {
                max-width: 95%;
            }
            
            .modal-actions {
                flex-direction: column;
            }
        }
    `;
    
    document.head.appendChild(style);
    
    // Add event listeners
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.querySelector('.modal-close');
    
    modalClose.addEventListener('click', () => {
        modalOverlay.remove();
        document.head.removeChild(style);
    });
    
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.remove();
            document.head.removeChild(style);
        }
    });
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Restore body scroll when modal closes
    modalOverlay.addEventListener('transitionend', () => {
        if (!document.body.contains(modalOverlay)) {
            document.body.style.overflow = 'auto';
        }
    });
}

// ===== CONTACT FORM =====
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    showToast('Message sent successfully! I will get back to you soon.');
    
    // Reset form
    contactForm.reset();
    
    // In a real application, you would send data to a server here
    console.log('Form submitted:', data);
});

// ===== DOWNLOAD CV =====
downloadCvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showToast('Downloading CV...');
    
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
function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
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
            
            el._tooltip = tooltip;
        });
        
        el.addEventListener('mouseleave', () => {
            if (el._tooltip) {
                el._tooltip.remove();
                delete el._tooltip;
            }
        });
    });
});

// ===== TYPING EFFECT FOR HERO =====
const heroTitle = document.querySelector('.hero-title .highlight');
const titles = ['Code & Cables', 'Networks & Security', 'Solutions & Systems', 'Technology & Innovation'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isPaused = false;

function typeEffect() {
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

// Start typing effect
setTimeout(typeEffect, 1000);