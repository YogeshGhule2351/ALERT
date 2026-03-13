/**
 * Landing Page JavaScript for SMART IRRIGATION AND PRECISION FARMING
 */

// Emergency sound effect (optional - requires audio file)
function playEmergencySound() {
    // You can add an emergency sound file here if needed
    // const audio = new Audio('emergency-sound.mp3');
    // audio.play();
}

// Add emergency countdown timer
function startEmergencyCountdown() {
    let seconds = 10;
    const countdownElement = document.createElement('div');
    countdownElement.className = 'emergency-countdown';
    countdownElement.innerHTML = `<h3>⏰ FARMING RESPONSE TIME: ${seconds}s</h3>`;
    
    const ctaBox = document.querySelector('.cta-box');
    if (ctaBox) {
        ctaBox.insertBefore(countdownElement, ctaBox.firstChild);
    }
    
    const countdownInterval = setInterval(() => {
        seconds--;
        countdownElement.innerHTML = `<h3>⏰ FARMING RESPONSE TIME: ${seconds}s</h3>`;
        
        if (seconds <= 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = '<h3>⚠️ TIME CRITICAL - ACT NOW!</h3>';
            countdownElement.style.color = '#ff0000';
            countdownElement.style.animation = 'emergency-blink 0.5s infinite';
        }
    }, 1000);
}

// Add floating emergency alerts
function createFloatingAlert() {
    const alert = document.createElement('div');
    alert.className = 'floating-alert';
    alert.innerHTML = '🌾 FARMING ALERT 🌾';
    alert.style.cssText = `
        position: fixed;
        top: -50px;
        left: 50%;
        transform: translateX(-50%);
        background: #ff0000;
        color: white;
        padding: 10px 20px;
        border-radius: 25px;
        font-weight: bold;
        z-index: 1000;
        animation: floatDown 3s ease-in-out;
    `;
    
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// Add CSS animation for floating alerts
const style = document.createElement('style');
style.textContent = `
    @keyframes floatDown {
        0% { top: -50px; opacity: 0; }
        20% { top: 100px; opacity: 1; }
        80% { top: 100px; opacity: 1; }
        100% { top: -50px; opacity: 0; }
    }
    
    .emergency-countdown h3 {
        color: #ffff00;
        font-size: 1.5rem;
        margin-bottom: 20px;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }
`;
document.head.appendChild(style);

// Initialize landing page effects
document.addEventListener('DOMContentLoaded', function() {
    // Start farming countdown
    startEmergencyCountdown();
    
    // Create floating alerts periodically
    setInterval(createFloatingAlert, 8000);
    
    // Add hover effects to farming button
    const emergencyBtn = document.querySelector('.btn-emergency');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        emergencyBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
        
        emergencyBtn.addEventListener('click', function(e) {
            // Add farming click effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 0, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    }
    
    // Add parallax effect to background
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.body.style.backgroundPosition = `${x * 50}px ${y * 50}px`;
    });
    
    // Add keyboard shortcut for farming (Space key)
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space' && e.target === document.body) {
            e.preventDefault();
            if (emergencyBtn) {
                emergencyBtn.click();
            }
        }
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);
