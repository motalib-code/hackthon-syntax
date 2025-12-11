/* ===========================================
   AgriScan AI - Interactive JavaScript
   =========================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initScrollReveal();
    initParticles();
    initMobileNav();
    initDemo();
    initSmoothScroll();
});

/* ===========================================
   Navbar
   =========================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ===========================================
   Mobile Navigation
   =========================================== */
function initMobileNav() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    
    toggle.addEventListener('click', () => {
        menu.classList.toggle('active');
        toggle.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    const links = menu.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.classList.remove('active');
        });
    });
}

/* ===========================================
   Scroll Reveal Animation
   =========================================== */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}

/* ===========================================
   Particle Effect
   =========================================== */
function initParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    
    // Random animation duration
    const duration = 10 + Math.random() * 20;
    particle.style.animationDuration = duration + 's';
    
    // Random delay
    particle.style.animationDelay = Math.random() * duration + 's';
    
    // Random size
    const size = 2 + Math.random() * 4;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random color (green or cyan)
    particle.style.background = Math.random() > 0.5 ? '#00ff88' : '#00d4ff';
    
    container.appendChild(particle);
}

/* ===========================================
   Smooth Scroll
   =========================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ===========================================
   Demo Section Interactivity
   =========================================== */
function initDemo() {
    const processBtn = document.getElementById('processBtn');
    const uploadBtn = document.getElementById('uploadBtn');
    const mapLoading = document.getElementById('mapLoading');
    
    // Mock data sets
    const mockData = [
        {
            pests: '3 locations',
            npk: 'Low Nitrogen',
            yield: '4.2 tons/ha',
            health: 78,
            date: 'Dec 10, 2025',
            coverage: '250 hectares'
        },
        {
            pests: '1 location',
            npk: 'Low Phosphorus',
            yield: '4.8 tons/ha',
            health: 85,
            date: 'Dec 11, 2025',
            coverage: '320 hectares'
        },
        {
            pests: '5 locations',
            npk: 'Low Potassium',
            yield: '3.9 tons/ha',
            health: 65,
            date: 'Dec 12, 2025',
            coverage: '180 hectares'
        },
        {
            pests: '0 locations',
            npk: 'Optimal',
            yield: '5.1 tons/ha',
            health: 92,
            date: 'Dec 13, 2025',
            coverage: '400 hectares'
        }
    ];
    
    let currentDataIndex = 0;
    
    // Process button click
    processBtn.addEventListener('click', () => {
        // Show loading
        mapLoading.classList.add('active');
        processBtn.disabled = true;
        processBtn.innerHTML = '<span class="btn-icon">⏳</span> Processing...';
        
        // Simulate processing time
        setTimeout(() => {
            // Update to next data set
            currentDataIndex = (currentDataIndex + 1) % mockData.length;
            updateDemoData(mockData[currentDataIndex]);
            
            // Randomize map zones
            randomizeMapZones();
            
            // Hide loading
            mapLoading.classList.remove('active');
            processBtn.disabled = false;
            processBtn.innerHTML = '<span class="btn-icon">🔄</span> Process New Flight';
        }, 2000);
    });
    
    // Upload button click
    uploadBtn.addEventListener('click', () => {
        // Simulate file selection feedback
        uploadBtn.innerHTML = '<span>✅</span> Flight Data Loaded';
        uploadBtn.style.borderColor = '#00ff88';
        uploadBtn.style.color = '#00ff88';
        
        setTimeout(() => {
            uploadBtn.innerHTML = '<span>📁</span> Select Flight Data';
            uploadBtn.style.borderColor = '';
            uploadBtn.style.color = '';
        }, 2000);
    });
    
    // Zone hover tooltips
    const zones = document.querySelectorAll('.zone');
    zones.forEach(zone => {
        zone.addEventListener('mouseenter', () => {
            zone.style.zIndex = '10';
        });
        zone.addEventListener('mouseleave', () => {
            zone.style.zIndex = '';
        });
    });
}

function updateDemoData(data) {
    // Update pest count
    const pestsEl = document.getElementById('pestsDetected');
    pestsEl.textContent = data.pests;
    pestsEl.parentElement.parentElement.querySelector('.result-status').className = 
        'result-status ' + (data.pests === '0 locations' ? 'good' : 'critical');
    pestsEl.parentElement.parentElement.querySelector('.result-status').textContent = 
        data.pests === '0 locations' ? 'Clear' : 'Critical';
    
    // Update NPK status
    const npkEl = document.getElementById('npkStatus');
    npkEl.textContent = data.npk;
    npkEl.parentElement.parentElement.querySelector('.result-status').className = 
        'result-status ' + (data.npk === 'Optimal' ? 'good' : 'warning');
    npkEl.parentElement.parentElement.querySelector('.result-status').textContent = 
        data.npk === 'Optimal' ? 'Good' : 'Warning';
    
    // Update yield
    const yieldEl = document.getElementById('predictedYield');
    yieldEl.textContent = data.yield;
    
    // Update health
    const healthEl = document.getElementById('overallHealth');
    healthEl.textContent = data.health + '%';
    const healthFill = document.querySelector('.health-fill');
    healthFill.style.width = data.health + '%';
    
    // Update flight info
    document.getElementById('flightDate').textContent = data.date;
    document.getElementById('coverage').textContent = data.coverage;
}

function randomizeMapZones() {
    const zones = document.querySelectorAll('.zone');
    const zoneTypes = ['healthy', 'healthy', 'healthy', 'warning', 'pest-detected'];
    
    zones.forEach(zone => {
        // Remove existing classes and pest markers
        zone.classList.remove('healthy', 'warning', 'pest-detected');
        const existingMarker = zone.querySelector('.pest-marker');
        if (existingMarker) existingMarker.remove();
        
        // Add random type
        const randomType = zoneTypes[Math.floor(Math.random() * zoneTypes.length)];
        zone.classList.add(randomType);
        
        // Add pest marker if needed
        if (randomType === 'pest-detected') {
            const marker = document.createElement('div');
            marker.className = 'pest-marker';
            marker.textContent = '🐛';
            zone.appendChild(marker);
        }
    });
}

/* ===========================================
   Additional Enhancements
   =========================================== */

// Add hover effects to tech cards
document.querySelectorAll('.tech-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Add typing effect to hero subtitle (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (target - start) * easeOutQuart);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(update);
}

// Initialize counters when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('.stat-value');
            if (statValue) {
                const text = statValue.textContent;
                // Only animate numeric values
                if (/^\d+/.test(text)) {
                    const num = parseInt(text);
                    const suffix = text.replace(/^\d+/, '');
                    animateCounter(statValue, num);
                    setTimeout(() => {
                        statValue.textContent = num + suffix;
                    }, 2100);
                }
            }
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});
