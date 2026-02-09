// ============================================
// FLOATING HEARTS BACKGROUND
// ============================================
const heartsContainer = document.getElementById('heartsContainer');
const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💘', '💞'];

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    
    const startX = Math.random() * window.innerWidth;
    const drift = (Math.random() - 0.5) * 200;
    const duration = Math.random() * 5 + 8;
    const delay = Math.random() * 5;
    const size = Math.random() * 2 + 1;
    
    heart.style.left = startX + 'px';
    heart.style.setProperty('--drift', drift + 'px');
    heart.style.animationDuration = duration + 's';
    heart.style.animationDelay = delay + 's';
    heart.style.fontSize = size + 'rem';
    
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, (duration + delay) * 1000);
}

// Create hearts continuously
setInterval(createFloatingHeart, 500);

// Initial hearts
for (let i = 0; i < 20; i++) {
    setTimeout(createFloatingHeart, i * 200);
}

// ============================================
// ROSE PETALS ANIMATION
// ============================================
const petalsCanvas = document.getElementById('petalsCanvas');
const petalsCtx = petalsCanvas.getContext('2d');

petalsCanvas.width = window.innerWidth;
petalsCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    petalsCanvas.width = window.innerWidth;
    petalsCanvas.height = window.innerHeight;
});

class Petal {
    constructor() {
        this.x = Math.random() * petalsCanvas.width;
        this.y = -20;
        this.size = Math.random() * 15 + 10;
        this.speedY = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 5 - 2.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.color = `rgba(${Math.random() * 50 + 200}, ${Math.random() * 50 + 50}, ${Math.random() * 50 + 100}, ${this.opacity})`;
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
        
        if (this.x > petalsCanvas.width) this.x = 0;
        if (this.x < 0) this.x = petalsCanvas.width;
        
        if (this.y > petalsCanvas.height) {
            this.y = -20;
            this.x = Math.random() * petalsCanvas.width;
        }
    }

    draw() {
        petalsCtx.save();
        petalsCtx.translate(this.x, this.y);
        petalsCtx.rotate(this.rotation * Math.PI / 180);
        
        // Draw petal shape
        petalsCtx.beginPath();
        petalsCtx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
        petalsCtx.fillStyle = this.color;
        petalsCtx.fill();
        
        petalsCtx.restore();
    }
}

const petals = [];
for (let i = 0; i < 50; i++) {
    petals.push(new Petal());
}

function animatePetals() {
    petalsCtx.clearRect(0, 0, petalsCanvas.width, petalsCanvas.height);
    
    petals.forEach(petal => {
        petal.update();
        petal.draw();
    });
    
    requestAnimationFrame(animatePetals);
}

animatePetals();

// ============================================
// OPENING ENVELOPE
// ============================================
const openingCard = document.getElementById('openingCard');
const contentWrapper = document.getElementById('contentWrapper');
const openBtn = document.getElementById('openBtn');

openBtn.addEventListener('click', () => {
    openingCard.classList.add('hidden');
    contentWrapper.classList.add('visible');
    
    // Trigger celebration effects
    createHeartBurst();
    playOpeningSound();
});

function createHeartBurst() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.position = 'fixed';
            heart.style.fontSize = '3rem';
            heart.style.zIndex = '10001';
            heart.style.pointerEvents = 'none';
            
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            heart.style.left = centerX + 'px';
            heart.style.top = centerY + 'px';
            
            document.body.appendChild(heart);
            
            const angle = (Math.PI * 2 * i) / 30;
            const velocity = Math.random() * 300 + 200;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let posX = 0;
            let posY = 0;
            let opacity = 1;
            
            function animate() {
                posX += vx * 0.016;
                posY += vy * 0.016 + 200 * 0.016;
                opacity -= 0.02;
                
                heart.style.transform = `translate(${posX}px, ${posY}px) rotate(${posX}deg)`;
                heart.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    heart.remove();
                }
            }
            
            animate();
        }, i * 30);
    }
}

// ============================================
// LOVE COUNTER
// ============================================
let seconds = 0;
let heartbeats = 0;
let smiles = 0;

function updateCounters() {
    seconds++;
    heartbeats = seconds * 1.2; // Average heartbeats per second
    smiles = Math.floor(seconds / 5); // A smile every 5 seconds
    
    document.getElementById('seconds').textContent = seconds.toLocaleString();
    document.getElementById('heartbeats').textContent = Math.floor(heartbeats).toLocaleString();
    document.getElementById('smiles').textContent = smiles.toLocaleString();
}

setInterval(updateCounters, 1000);

// ============================================
// INTERACTIVE HEARTS MESSAGES
// ============================================
const messageHearts = document.querySelectorAll('.message-heart');
const messageDisplay = document.getElementById('messageDisplay');

messageHearts.forEach(heart => {
    heart.addEventListener('click', function() {
        const message = this.dataset.message;
        messageDisplay.textContent = message;
        messageDisplay.classList.add('active');
        
        // Create mini heart burst
        createMiniHeartBurst(this);
        
        setTimeout(() => {
            messageDisplay.classList.remove('active');
        }, 3000);
    });
});

function createMiniHeartBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.textContent = '💕';
        heart.style.position = 'fixed';
        heart.style.fontSize = '1.5rem';
        heart.style.zIndex = '10001';
        heart.style.pointerEvents = 'none';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        
        document.body.appendChild(heart);
        
        const angle = (Math.PI * 2 * i) / 10;
        const distance = 100;
        const targetX = Math.cos(angle) * distance;
        const targetY = Math.sin(angle) * distance;
        
        let progress = 0;
        
        function animate() {
            progress += 0.05;
            const currentX = targetX * progress;
            const currentY = targetY * progress;
            const opacity = 1 - progress;
            
            heart.style.transform = `translate(${currentX}px, ${currentY}px)`;
            heart.style.opacity = opacity;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                heart.remove();
            }
        }
        
        animate();
    }
}

// ============================================
// MUSIC TOGGLE
// ============================================
const musicToggle = document.getElementById('musicToggle');
let isMusicPlaying = false;
let audioContext = null;
let currentOscillator = null;

musicToggle.addEventListener('click', () => {
    if (!isMusicPlaying) {
        isMusicPlaying = true;
        musicToggle.classList.add('playing');
        playRomanticMelody();
    } else {
        isMusicPlaying = false;
        musicToggle.classList.remove('playing');
        if (currentOscillator) {
            currentOscillator.stop();
            currentOscillator = null;
        }
    }
});

function playRomanticMelody() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    // Simple romantic melody notes (Love Story pattern)
    const melody = [
        { freq: 523.25, duration: 0.4 }, // C5
        { freq: 587.33, duration: 0.4 }, // D5
        { freq: 659.25, duration: 0.4 }, // E5
        { freq: 698.46, duration: 0.6 }, // F5
        { freq: 783.99, duration: 0.4 }, // G5
        { freq: 698.46, duration: 0.4 }, // F5
        { freq: 659.25, duration: 0.4 }, // E5
        { freq: 587.33, duration: 0.8 }, // D5
    ];
    
    let noteIndex = 0;
    
    function playNote() {
        if (!isMusicPlaying || noteIndex >= melody.length) {
            noteIndex = 0;
            if (isMusicPlaying) {
                setTimeout(playNote, 500);
            }
            return;
        }
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = melody[noteIndex].freq;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + melody[noteIndex].duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + melody[noteIndex].duration);
        
        currentOscillator = oscillator;
        
        noteIndex++;
        setTimeout(playNote, melody[noteIndex - 1].duration * 1000);
    }
    
    playNote();
}

function playOpeningSound() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(1046.50, audioContext.currentTime + 0.5);
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// PARALLAX EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallaxElements = document.querySelectorAll('.love-letter, .reasons-section, .memory-section');
    
    parallaxElements.forEach((el, index) => {
        const speed = (index + 1) * 0.02;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// CURSOR SPARKLES
// ============================================
document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.1) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.fontSize = '1rem';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '10000';
        sparkle.style.animation = 'sparkle-fade 1s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
});

// Add sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle-fade {
        0% {
            opacity: 1;
            transform: scale(0) translateY(0);
        }
        50% {
            opacity: 1;
            transform: scale(1.5) translateY(-20px);
        }
        100% {
            opacity: 0;
            transform: scale(0) translateY(-40px);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reason-card, .polaroid, .final-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c❤️ Happy Valentine\'s Day Nabila! ❤️', 'font-size: 24px; color: #d63447; font-weight: bold;');
console.log('%cWith endless love from Mahamudul Hasan 💕', 'font-size: 16px; color: #ff6b9d; font-style: italic;');
