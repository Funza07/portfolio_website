// Enhanced Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Ensure light theme on load as requested
    html.setAttribute('data-color-scheme', 'light');
    updateThemeIcon('light');
    
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        const currentTheme = html.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Apply theme change with animation
        document.body.style.transition = 'all 0.5s ease';
        html.setAttribute('data-color-scheme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add visual feedback
        this.style.transform = 'scale(1.2) rotate(180deg)';
        setTimeout(() => {
            this.style.transform = '';
            document.body.style.transition = '';
        }, 500);
        
        console.log('Theme switched to:', newTheme); // Debug log
    });
    
    function updateThemeIcon(theme) {
        themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
});

// Enhanced Smooth Scrolling Navigation with offset for fixed header
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = 80; // Fixed header height
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                // Smooth scroll with custom animation
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Add active state animation
                this.style.transform = 'scale(1.1)';
                this.style.color = 'var(--color-primary)';
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.color = '';
                }, 300);
                
                console.log('Navigating to:', targetId); // Debug log
            }
        });
    });
});

// Enhanced Parallax Scrolling Effects
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3;
    const fastRate = scrolled * -0.5;
    const slowRate = scrolled * -0.1;
    
    // Hero section parallax
    const heroPattern = document.querySelector('.hero-pattern');
    if (heroPattern) {
        heroPattern.style.transform = `translateY(${rate}px) scale(${1 + scrolled * 0.0001})`;
        heroPattern.style.opacity = Math.max(0.2, 1 - scrolled / 600);
    }
    
    // Parallax effect for floating shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        const rotateSpeed = scrolled * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${rotateSpeed + (index * 20)}deg)`;
        shape.style.opacity = Math.max(0.3, 1 - scrolled / 800);
    });
    
    // Parallax effect for particles
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const speed = 0.05 + (index * 0.03);
        const rotateSpeed = scrolled * 0.05;
        particle.style.transform = `translateY(${scrolled * speed}px) rotate(${rotateSpeed}deg)`;
    });
    
    // Background patterns parallax
    const geometricBg = document.querySelector('.geometric-bg');
    if (geometricBg) {
        geometricBg.style.transform = `translateY(${slowRate}px)`;
    }
    
    const hexagonGrid = document.querySelector('.hexagon-grid');
    if (hexagonGrid) {
        hexagonGrid.style.transform = `translateY(${rate * 0.5}px)`;
    }
    
    // Header transparency effect
    const header = document.querySelector('.header');
    if (header) {
        const opacity = Math.min(0.95, 0.8 + scrolled / 200);
        header.style.background = `rgba(255, 255, 255, ${opacity * 0.15})`;
    }
    
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Enhanced Rotating Job Titles with smooth transitions
const jobTitles = ["C++ Developer", "MERN Stack Developer", "Game Developer", "AI/ML Enthusiast"];
let currentTitleIndex = 0;
const rotatingTitle = document.getElementById('rotatingTitle');

function rotateTitle() {
    if (rotatingTitle) {
        // Fade out with scale effect
        rotatingTitle.style.opacity = '0';
        rotatingTitle.style.transform = 'translateY(15px) scale(0.9)';
        
        setTimeout(() => {
            currentTitleIndex = (currentTitleIndex + 1) % jobTitles.length;
            rotatingTitle.textContent = jobTitles[currentTitleIndex];
            
            // Fade in with scale effect
            rotatingTitle.style.opacity = '1';
            rotatingTitle.style.transform = 'translateY(0px) scale(1)';
        }, 300);
    }
}

// Start rotating titles
setInterval(rotateTitle, 3500);

// Enhanced cursor following effect
let mouseX = 0;
let mouseY = 0;
let cursor = null;

function createCursor() {
    if (window.innerWidth <= 768) return; // Don't create on mobile
    
    cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
}

function updateCursor() {
    if (cursor) {
        cursor.style.left = mouseX - 10 + 'px';
        cursor.style.top = mouseY - 10 + 'px';
    }
    requestAnimationFrame(updateCursor);
}

document.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Initialize cursor
document.addEventListener('DOMContentLoaded', function() {
    createCursor();
    if (cursor) {
        updateCursor();
    }
});

// Enhanced Contact Form Submission with animations
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        const formInputs = this.querySelectorAll('input, textarea');
        
        // Disable form and show loading state
        formInputs.forEach(input => input.disabled = true);
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        submitBtn.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
        submitBtn.style.transform = 'scale(0.98)';
        
        // Simulate sending with enhanced animation
        setTimeout(() => {
            submitBtn.textContent = 'Sent! ✓';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            submitBtn.style.transform = 'scale(1.05)';
            
            // Create success particles
            createSuccessParticles(submitBtn);
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.style.transform = '';
                submitBtn.disabled = false;
                formInputs.forEach(input => {
                    input.disabled = false;
                    input.value = '';
                });
            }, 2500);
        }, 1500);
        
        // Show enhanced success message
        showSuccessMessage();
    });
});

function createSuccessParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: #10b981;
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            left: ${centerX}px;
            top: ${centerY}px;
        `;
        document.body.appendChild(particle);
        
        const angle = (i / 12) * Math.PI * 2;
        const velocity = 60 + Math.random() * 40;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = 0, y = 0, opacity = 1;
        
        function animateParticle() {
            x += vx * 0.02;
            y += vy * 0.02 + 0.5; // gravity
            opacity -= 0.02;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animateParticle);
            } else {
                document.body.removeChild(particle);
            }
        }
        
        animateParticle();
    }
}

function showSuccessMessage() {
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #10b981, #059669);
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transform: translateX(100%);
        transition: transform 0.4s ease;
        font-weight: 500;
    `;
    successMsg.textContent = '✓ Message sent successfully! (Demo)';
    document.body.appendChild(successMsg);
    
    // Animate in
    setTimeout(() => {
        successMsg.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out
    setTimeout(() => {
        successMsg.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(successMsg)) {
                document.body.removeChild(successMsg);
            }
        }, 400);
    }, 3500);
}

// Enhanced Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav__links');
    
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        const isActive = navLinks.classList.contains('active');
        
        if (isActive) {
            navLinks.style.animation = 'slideUp 0.3s ease forwards';
            setTimeout(() => {
                navLinks.classList.remove('active');
            }, 300);
        } else {
            navLinks.classList.add('active');
            navLinks.style.animation = 'slideDown 0.3s ease forwards';
        }
        
        // Animate hamburger icon
        this.style.transform = isActive ? 'rotate(0deg)' : 'rotate(90deg)';
        this.textContent = isActive ? '☰' : '✕';
    });
    
    // Close mobile menu when clicking a link
    navLinks.querySelectorAll('.nav__link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.style.transform = 'rotate(0deg)';
            hamburger.textContent = '☰';
        });
    });
});

// Enhanced intersection observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            
            // Add staggered animation for child elements
            const children = entry.target.querySelectorAll('.card, .skill-group, .cert-badge, .achievement-item');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.style.animation = `fadeInUp 0.6s ease forwards`;
                    child.style.animationDelay = `${index * 0.1}s`;
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
});

// Enhanced Space Shooter Game with particle effects
class SpaceShooterGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.gameRunning = false;
        this.gameOver = false;
        this.score = 0;
        this.health = 3;
        this.particles = [];
        this.stars = [];
        
        // Initialize starfield
        this.initStars();
        
        // Game objects
        this.player = {
            x: this.canvas.width / 2 - 25,
            y: this.canvas.height - 60,
            width: 50,
            height: 40,
            speed: 6
        };
        
        this.bullets = [];
        this.enemies = [];
        this.keys = {};
        
        // Bind methods
        this.update = this.update.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        
        // Add event listeners
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
        
        // Touch controls
        this.setupTouchControls();
    }
    
    initStars() {
        this.stars = [];
        for (let i = 0; i < 100; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1,
                speed: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.8 + 0.2
            });
        }
    }
    
    updateStars() {
        this.stars.forEach(star => {
            star.y += star.speed;
            if (star.y > this.canvas.height) {
                star.y = -star.size;
                star.x = Math.random() * this.canvas.width;
            }
        });
    }
    
    drawStars() {
        this.stars.forEach(star => {
            this.ctx.save();
            this.ctx.globalAlpha = star.opacity;
            this.ctx.fillStyle = '#ffffff';
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }
    
    setupTouchControls() {
        const controls = document.getElementById('spaceControls');
        if (controls) {
            controls.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const action = e.target.dataset.action;
                if (action) {
                    this.keys[action] = true;
                    e.target.style.transform = 'scale(0.9)';
                    e.target.style.background = 'rgba(33, 128, 141, 0.4)';
                }
            });
            
            controls.addEventListener('touchend', (e) => {
                e.preventDefault();
                const action = e.target.dataset.action;
                if (action) {
                    this.keys[action] = false;
                    e.target.style.transform = 'scale(1)';
                    e.target.style.background = '';
                }
            });
        }
    }
    
    handleKeyDown(e) {
        switch(e.code) {
            case 'ArrowLeft':
                this.keys.left = true;
                break;
            case 'ArrowRight':
                this.keys.right = true;
                break;
            case 'Space':
                e.preventDefault();
                this.keys.shoot = true;
                break;
        }
    }
    
    handleKeyUp(e) {
        switch(e.code) {
            case 'ArrowLeft':
                this.keys.left = false;
                break;
            case 'ArrowRight':
                this.keys.right = false;
                break;
            case 'Space':
                this.keys.shoot = false;
                break;
        }
    }
    
    start() {
        this.gameRunning = true;
        this.gameOver = false;
        this.score = 0;
        this.health = 3;
        this.bullets = [];
        this.enemies = [];
        this.particles = [];
        this.player.x = this.canvas.width / 2 - 25;
        this.lastBulletTime = 0;
        this.lastEnemyTime = 0;
        this.initStars();
        this.update();
    }
    
    stop() {
        this.gameRunning = false;
    }
    
    createParticle(x, y, color = '#FFD700', count = 8) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 6,
                vy: (Math.random() - 0.5) * 6,
                life: 1,
                decay: 0.02 + Math.random() * 0.02,
                size: Math.random() * 3 + 1,
                color: color
            });
        }
    }
    
    updateParticles() {
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx *= 0.98; // friction
            particle.vy *= 0.98;
            particle.life -= particle.decay;
            return particle.life > 0;
        });
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.life;
            this.ctx.fillStyle = particle.color;
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = 10;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }
    
    update() {
        if (!this.gameRunning) return;
        
        this.clearCanvas();
        this.updateStars();
        this.drawStars();
        this.handleInput();
        this.updateBullets();
        this.updateEnemies();
        this.updateParticles();
        this.checkCollisions();
        this.draw();
        this.drawParticles();
        this.drawUI();
        
        if (this.health <= 0) {
            this.gameOver = true;
            this.drawGameOver();
            return;
        }
        
        requestAnimationFrame(this.update);
    }
    
    clearCanvas() {
        // Space gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#000611');
        gradient.addColorStop(0.5, '#001122');
        gradient.addColorStop(1, '#000000');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    handleInput() {
        if (this.keys.left && this.player.x > 0) {
            this.player.x -= this.player.speed;
        }
        if (this.keys.right && this.player.x < this.canvas.width - this.player.width) {
            this.player.x += this.player.speed;
        }
        if (this.keys.shoot && Date.now() - this.lastBulletTime > 150) {
            this.bullets.push({
                x: this.player.x + this.player.width / 2 - 2,
                y: this.player.y,
                width: 4,
                height: 12,
                speed: 8
            });
            this.lastBulletTime = Date.now();
            // Enhanced muzzle flash
            this.createParticle(this.player.x + this.player.width / 2, this.player.y, '#FFD700', 4);
        }
    }
    
    updateBullets() {
        this.bullets = this.bullets.filter(bullet => {
            bullet.y -= bullet.speed;
            return bullet.y > -bullet.height;
        });
    }
    
    updateEnemies() {
        if (Date.now() - this.lastEnemyTime > 800) {
            this.enemies.push({
                x: Math.random() * (this.canvas.width - 40),
                y: -40,
                width: 40,
                height: 30,
                speed: 2 + Math.random() * 3,
                health: 1
            });
            this.lastEnemyTime = Date.now();
        }
        
        this.enemies = this.enemies.filter(enemy => {
            enemy.y += enemy.speed;
            if (enemy.y > this.canvas.height) {
                this.health--;
                return false;
            }
            return true;
        });
    }
    
    checkCollisions() {
        // Bullet-enemy collisions
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            for (let j = this.enemies.length - 1; j >= 0; j--) {
                if (this.isColliding(this.bullets[i], this.enemies[j])) {
                    // Enhanced explosion effect
                    this.createParticle(
                        this.enemies[j].x + this.enemies[j].width / 2, 
                        this.enemies[j].y + this.enemies[j].height / 2, 
                        '#FF4444', 
                        12
                    );
                    this.bullets.splice(i, 1);
                    this.enemies.splice(j, 1);
                    this.score += 10;
                    break;
                }
            }
        }
        
        // Player-enemy collisions
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            if (this.isColliding(this.player, this.enemies[i])) {
                this.createParticle(
                    this.player.x + this.player.width / 2, 
                    this.player.y + this.player.height / 2, 
                    '#FF0000', 
                    15
                );
                this.enemies.splice(i, 1);
                this.health--;
            }
        }
    }
    
    isColliding(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
    
    draw() {
        // Enhanced player ship
        this.ctx.save();
        this.ctx.shadowColor = '#8B5CF6';
        this.ctx.shadowBlur = 15;
        
        // Ship body gradient
        const playerGradient = this.ctx.createLinearGradient(
            this.player.x, this.player.y, 
            this.player.x, this.player.y + this.player.height
        );
        playerGradient.addColorStop(0, '#A855F7');
        playerGradient.addColorStop(1, '#7C3AED');
        
        this.ctx.fillStyle = playerGradient;
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
        
        // Engine glow
        if (Math.random() < 0.7) {
            this.createParticle(
                this.player.x + this.player.width / 2, 
                this.player.y + this.player.height, 
                '#00FFFF', 
                2
            );
        }
        
        // Enhanced bullets with glow
        this.ctx.shadowColor = '#FBBF24';
        this.ctx.shadowBlur = 8;
        this.bullets.forEach(bullet => {
            const bulletGradient = this.ctx.createLinearGradient(
                bullet.x, bullet.y, 
                bullet.x, bullet.y + bullet.height
            );
            bulletGradient.addColorStop(0, '#FCD34D');
            bulletGradient.addColorStop(1, '#F59E0B');
            
            this.ctx.fillStyle = bulletGradient;
            this.ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        });
        
        // Enhanced enemies with glow
        this.ctx.shadowColor = '#EF4444';
        this.ctx.shadowBlur = 12;
        this.enemies.forEach(enemy => {
            const enemyGradient = this.ctx.createLinearGradient(
                enemy.x, enemy.y, 
                enemy.x, enemy.y + enemy.height
            );
            enemyGradient.addColorStop(0, '#F87171');
            enemyGradient.addColorStop(1, '#DC2626');
            
            this.ctx.fillStyle = enemyGradient;
            this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        });
        
        this.ctx.restore();
    }
    
    drawUI() {
        this.ctx.save();
        this.ctx.shadowColor = '#000';
        this.ctx.shadowBlur = 4;
        this.ctx.fillStyle = '#FFF';
        this.ctx.font = 'bold 16px Arial';
        
        this.ctx.fillText(`Score: ${this.score}`, 10, 25);
        this.ctx.fillText(`Health: ${this.health}`, 10, 45);
        
        // Health bar
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(10, 55, 100, 10);
        this.ctx.fillStyle = this.health > 1 ? '#10B981' : '#EF4444';
        this.ctx.fillRect(10, 55, (this.health / 3) * 100, 10);
        
        this.ctx.restore();
    }
    
    drawGameOver() {
        this.ctx.save();
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#FFF';
        this.ctx.font = 'bold 28px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.shadowColor = '#000';
        this.ctx.shadowBlur = 4;
        
        this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 30);
        this.ctx.font = 'bold 20px Arial';
        this.ctx.fillText(`Final Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 10);
        this.ctx.font = '16px Arial';
        this.ctx.fillText('Click Start Game to play again', this.canvas.width / 2, this.canvas.height / 2 + 40);
        
        this.ctx.restore();
    }
}

// Enhanced Racing Game with particle effects
class RacingGame {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.gameRunning = false;
        this.gameOver = false;
        this.score = 0;
        this.health = 3;
        this.speed = 2;
        this.particles = [];
        
        // Game objects
        this.player = {
            x: this.canvas.width / 2 - 20,
            y: this.canvas.height - 80,
            width: 40,
            height: 60,
            lane: 1, // 0=left, 1=center, 2=right
            targetX: this.canvas.width / 2 - 20
        };
        
        this.obstacles = [];
        this.keys = {};
        this.roadOffset = 0;
        
        // Bind methods
        this.update = this.update.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        
        // Add event listeners
        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);
        
        // Touch controls
        this.setupTouchControls();
    }
    
    setupTouchControls() {
        const controls = document.getElementById('racingControls');
        if (controls) {
            controls.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const action = e.target.dataset.action;
                if (action) {
                    this.keys[action] = true;
                    e.target.style.transform = 'scale(0.9)';
                    e.target.style.background = 'rgba(33, 128, 141, 0.4)';
                }
            });
            
            controls.addEventListener('touchend', (e) => {
                e.preventDefault();
                const action = e.target.dataset.action;
                if (action) {
                    this.keys[action] = false;
                    e.target.style.transform = 'scale(1)';
                    e.target.style.background = '';
                }
            });
        }
    }
    
    handleKeyDown(e) {
        switch(e.code) {
            case 'ArrowLeft':
                this.keys.left = true;
                break;
            case 'ArrowRight':
                this.keys.right = true;
                break;
        }
    }
    
    handleKeyUp(e) {
        switch(e.code) {
            case 'ArrowLeft':
                this.keys.left = false;
                break;
            case 'ArrowRight':
                this.keys.right = false;
                break;
        }
    }
    
    start() {
        this.gameRunning = true;
        this.gameOver = false;
        this.score = 0;
        this.health = 3;
        this.speed = 2;
        this.obstacles = [];
        this.particles = [];
        this.player.lane = 1;
        this.updatePlayerTarget();
        this.lastObstacleTime = 0;
        this.roadOffset = 0;
        this.update();
    }
    
    stop() {
        this.gameRunning = false;
    }
    
    updatePlayerTarget() {
        const lanePositions = [80, 160, 240];
        this.player.targetX = lanePositions[this.player.lane] - this.player.width / 2;
    }
    
    createSparkles(x, y, count = 5) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x + Math.random() * 40,
                y: y + Math.random() * 60,
                vx: (Math.random() - 0.5) * 3,
                vy: Math.random() * 3 + 1,
                life: 1,
                decay: 0.02,
                size: Math.random() * 2 + 1,
                color: '#FFD700'
            });
        }
    }
    
    createCrashEffect(x, y) {
        for (let i = 0; i < 15; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 1,
                decay: 0.015,
                size: Math.random() * 4 + 2,
                color: i < 5 ? '#FF0000' : (i < 10 ? '#FFA500' : '#FFFF00')
            });
        }
    }
    
    updateParticles() {
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.1; // gravity
            particle.life -= particle.decay;
            return particle.life > 0;
        });
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.life;
            this.ctx.fillStyle = particle.color;
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = 5;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
    }
    
    update() {
        if (!this.gameRunning) return;
        
        this.clearCanvas();
        this.drawRoad();
        this.handleInput();
        this.updatePlayer();
        this.updateObstacles();
        this.updateParticles();
        this.checkCollisions();
        this.draw();
        this.drawParticles();
        this.drawUI();
        this.score += 1;
        this.speed += 0.0005;
        
        // Add engine sparkles
        if (Math.random() < 0.4) {
            this.createSparkles(this.player.x + this.player.width / 2, this.player.y + this.player.height, 2);
        }
        
        if (this.health <= 0) {
            this.gameOver = true;
            this.drawGameOver();
            return;
        }
        
        requestAnimationFrame(this.update);
    }
    
    clearCanvas() {
        // Enhanced gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(0.3, '#98FB98');
        gradient.addColorStop(1, '#228B22');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Add some clouds
        this.drawClouds();
    }
    
    drawClouds() {
        this.ctx.save();
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        for (let i = 0; i < 3; i++) {
            const cloudX = 50 + i * 120 + Math.sin(Date.now() * 0.001 + i) * 20;
            const cloudY = 30 + i * 15;
            this.ctx.beginPath();
            this.ctx.arc(cloudX, cloudY, 20, 0, Math.PI * 2);
            this.ctx.arc(cloudX + 15, cloudY, 25, 0, Math.PI * 2);
            this.ctx.arc(cloudX + 30, cloudY, 20, 0, Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.restore();
    }
    
    drawRoad() {
        // Enhanced road with gradient and borders
        const roadGradient = this.ctx.createLinearGradient(60, 0, 300, 0);
        roadGradient.addColorStop(0, '#1a1a1a');
        roadGradient.addColorStop(0.5, '#404040');
        roadGradient.addColorStop(1, '#1a1a1a');
        this.ctx.fillStyle = roadGradient;
        this.ctx.fillRect(60, 0, 240, this.canvas.height);
        
        // Road edges with glow
        this.ctx.save();
        this.ctx.shadowColor = '#FFFF00';
        this.ctx.shadowBlur = 8;
        this.ctx.fillStyle = '#FFFF00';
        this.ctx.fillRect(58, 0, 4, this.canvas.height);
        this.ctx.fillRect(298, 0, 4, this.canvas.height);
        this.ctx.restore();
        
        // Animated lane dividers
        this.ctx.fillStyle = '#FFF';
        this.roadOffset += this.speed * 4;
        if (this.roadOffset > 40) this.roadOffset = 0;
        
        for (let y = -this.roadOffset; y < this.canvas.height; y += 40) {
            this.ctx.fillRect(140, y, 4, 20);
            this.ctx.fillRect(220, y, 4, 20);
        }
    }
    
    handleInput() {
        if (this.keys.left && this.player.lane > 0) {
            this.player.lane--;
            this.updatePlayerTarget();
            this.keys.left = false;
        }
        if (this.keys.right && this.player.lane < 2) {
            this.player.lane++;
            this.updatePlayerTarget();
            this.keys.right = false;
        }
    }
    
    updatePlayer() {
        // Smooth lane transition
        const lerpSpeed = 0.15;
        this.player.x += (this.player.targetX - this.player.x) * lerpSpeed;
    }
    
    updateObstacles() {
        if (Date.now() - this.lastObstacleTime > 1200 / this.speed) {
            this.obstacles.push({
                x: 0,
                y: -60,
                width: 40,
                height: 60,
                lane: Math.floor(Math.random() * 3),
                speed: this.speed * 2.5,
                type: Math.random() < 0.8 ? 'car' : 'truck'
            });
            this.lastObstacleTime = Date.now();
        }
        
        this.obstacles = this.obstacles.filter(obstacle => {
            obstacle.y += obstacle.speed;
            
            // Update obstacle position based on lane
            const lanePositions = [80, 160, 240];
            obstacle.x = lanePositions[obstacle.lane] - obstacle.width / 2;
            
            return obstacle.y < this.canvas.height;
        });
    }
    
    checkCollisions() {
        for (let i = this.obstacles.length - 1; i >= 0; i--) {
            if (this.isColliding(this.player, this.obstacles[i])) {
                // Enhanced crash effect
                this.createCrashEffect(
                    this.player.x + this.player.width / 2,
                    this.player.y + this.player.height / 2
                );
                this.obstacles.splice(i, 1);
                this.health--;
            }
        }
    }
    
    isColliding(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }
    
    draw() {
        this.ctx.save();
        
        // Enhanced player car with gradient and glow
        this.ctx.shadowColor = '#3B82F6';
        this.ctx.shadowBlur = 15;
        const carGradient = this.ctx.createLinearGradient(
            this.player.x, this.player.y, 
            this.player.x, this.player.y + this.player.height
        );
        carGradient.addColorStop(0, '#60A5FA');
        carGradient.addColorStop(0.5, '#3B82F6');
        carGradient.addColorStop(1, '#1D4ED8');
        this.ctx.fillStyle = carGradient;
        this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
        
        // Car details
        this.ctx.fillStyle = '#1E40AF';
        this.ctx.fillRect(this.player.x + 5, this.player.y + 10, 30, 15); // windshield
        
        // Enhanced obstacles with different types
        this.obstacles.forEach(obstacle => {
            this.ctx.shadowColor = '#EF4444';
            this.ctx.shadowBlur = 10;
            
            if (obstacle.type === 'truck') {
                obstacle.width = 45;
                obstacle.height = 70;
                const truckGradient = this.ctx.createLinearGradient(
                    obstacle.x, obstacle.y, 
                    obstacle.x, obstacle.y + obstacle.height
                );
                truckGradient.addColorStop(0, '#DC2626');
                truckGradient.addColorStop(1, '#991B1B');
                this.ctx.fillStyle = truckGradient;
            } else {
                const carGradient = this.ctx.createLinearGradient(
                    obstacle.x, obstacle.y, 
                    obstacle.x, obstacle.y + obstacle.height
                );
                carGradient.addColorStop(0, '#F87171');
                carGradient.addColorStop(1, '#EF4444');
                this.ctx.fillStyle = carGradient;
            }
            
            this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
        
        this.ctx.restore();
    }
    
    drawUI() {
        this.ctx.save();
        this.ctx.shadowColor = '#000';
        this.ctx.shadowBlur = 4;
        this.ctx.fillStyle = '#FFF';
        this.ctx.font = 'bold 16px Arial';
        
        const scoreText = `Score: ${Math.floor(this.score / 10)}`;
        const healthText = `Health: ${this.health}`;
        const speedText = `Speed: ${this.speed.toFixed(1)}`;
        
        this.ctx.fillText(scoreText, 10, 25);
        this.ctx.fillText(healthText, 10, 45);
        this.ctx.fillText(speedText, 10, 65);
        
        // Enhanced health bar
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(10, 75, 100, 8);
        this.ctx.fillStyle = this.health > 1 ? '#10B981' : '#EF4444';
        this.ctx.fillRect(10, 75, (this.health / 3) * 100, 8);
        
        // Speed meter
        this.ctx.fillStyle = '#333';
        this.ctx.fillRect(120, 75, 80, 8);
        this.ctx.fillStyle = '#F59E0B';
        this.ctx.fillRect(120, 75, Math.min(80, (this.speed / 5) * 80), 8);
        
        this.ctx.restore();
    }
    
    drawGameOver() {
        this.ctx.save();
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#FFF';
        this.ctx.font = 'bold 28px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.shadowColor = '#000';
        this.ctx.shadowBlur = 4;
        
        this.ctx.fillText('GAME OVER', this.canvas.width / 2, this.canvas.height / 2 - 40);
        this.ctx.font = 'bold 20px Arial';
        this.ctx.fillText(`Final Score: ${Math.floor(this.score / 10)}`, this.canvas.width / 2, this.canvas.height / 2 - 10);
        this.ctx.font = '16px Arial';
        this.ctx.fillText('Click Start Game to play again', this.canvas.width / 2, this.canvas.height / 2 + 20);
        
        this.ctx.restore();
    }
}

// Initialize Games with enhanced features
let spaceShooterGame, racingGame;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize games
    spaceShooterGame = new SpaceShooterGame('spaceShooterCanvas');
    racingGame = new RacingGame('racingCanvas');
    
    // Enhanced game start buttons
    const spaceGameBtn = document.getElementById('startSpaceGame');
    const racingGameBtn = document.getElementById('startRacingGame');
    
    spaceGameBtn.addEventListener('click', function() {
        if (spaceShooterGame.gameRunning) {
            spaceShooterGame.stop();
            this.textContent = 'Start Game';
            this.style.background = '';
            this.style.transform = '';
        } else {
            spaceShooterGame.start();
            this.textContent = 'Stop Game';
            this.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            this.style.transform = 'scale(1.05)';
        }
    });
    
    racingGameBtn.addEventListener('click', function() {
        if (racingGame.gameRunning) {
            racingGame.stop();
            this.textContent = 'Start Game';
            this.style.background = '';
            this.style.transform = '';
        } else {
            racingGame.start();
            this.textContent = 'Stop Game';
            this.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            this.style.transform = 'scale(1.05)';
        }
    });
    
    // Enhanced hover effects for all interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .card, .skill-group, .cert-badge, .achievement-item, .nav__link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (!this.style.transform) {
                this.style.transform = 'translateY(-3px)';
                this.style.transition = 'all 0.3s ease';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

// Prevent default touch behavior on game controls
document.addEventListener('touchstart', function(e) {
    if (e.target.classList.contains('control-btn')) {
        e.preventDefault();
    }
}, { passive: false });

document.addEventListener('touchmove', function(e) {
    if (e.target.classList.contains('control-btn')) {
        e.preventDefault();
    }
}, { passive: false });

// Add enhanced CSS animations
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
    
    .pulse {
        animation: pulse 2s ease-in-out infinite;
    }
`;
document.head.appendChild(enhancedStyles);

console.log('Enhanced portfolio loaded with all features active!');