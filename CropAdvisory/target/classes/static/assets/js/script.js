<script src="script.js"></script>// Global Variables
let currentSection = 'home';

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeImageUpload();
    initializeAnimations();
});

// Navigation Functions
function initializeNavigation() {
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            navMenu.classList.remove('active');

            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Section Navigation
function showDashboard() {
    hideAllSections();
    document.getElementById('dashboard').style.display = 'block';
    currentSection = 'dashboard';
    updateNavigation('dashboard');
}

function showHome() {
    hideAllSections();
    document.getElementById('home').style.display = 'flex';
    currentSection = 'home';
    updateNavigation('home');
}

function hideAllSections() {
    const sections = ['home', 'features', 'dashboard'];
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            element.style.display = 'none';
        }
    });
}

function updateNavigation(activeSection) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeSection}`) {
            link.classList.add('active');
        }
    });
}

function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({
        behavior: 'smooth'
    });
}

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Add animation class
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modal.classList.remove('show');

        // Reset forms
        resetForms(modalId);
    }
}

function resetForms(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        const forms = modal.querySelectorAll('form');
        forms.forEach(form => form.reset());

        // Hide image preview
        const imagePreview = modal.querySelector('#imagePreview');
        if (imagePreview) {
            imagePreview.style.display = 'none';
        }

        // Show upload area
        const uploadArea = modal.querySelector('#uploadArea');
        if (uploadArea) {
            uploadArea.style.display = 'block';
        }
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        const modalId = event.target.id;
        closeModal(modalId);
    }
});

// Feature Functions
function openCropAdvisory() {
    openModal('cropAdvisoryModal');
}

function openPestDetection() {
    openModal('pestDetectionModal');
}

function openFertilizerAdvisory() {
    openModal('fertilizerModal');
}

function openWeatherAlerts() {
    openModal('weatherModal');
}

// Image Upload Functionality
function initializeImageUpload() {
    const imageUpload = document.getElementById('imageUpload');
    const uploadArea = document.getElementById('uploadArea');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');

    if (imageUpload && uploadArea) {
        // Handle file selection
        imageUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                displayImagePreview(file);
            }
        });

        // Handle drag and drop
        uploadArea.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--primary-dark)';
            uploadArea.style.backgroundColor = 'rgba(45, 125, 50, 0.1)';
        });

        uploadArea.addEventListener('dragleave', function(e) {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--primary-color)';
            uploadArea.style.backgroundColor = 'rgba(45, 125, 50, 0.05)';
        });

        uploadArea.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadArea.style.borderColor = 'var(--primary-color)';
            uploadArea.style.backgroundColor = 'rgba(45, 125, 50, 0.05)';

            const files = e.dataTransfer.files;
            if (files.length > 0 && files[0].type.startsWith('image/')) {
                displayImagePreview(files[0]);
            }
        });

        // Click to upload
        uploadArea.addEventListener('click', function() {
            imageUpload.click();
        });
    }
}

function displayImagePreview(file) {
    const uploadArea = document.getElementById('uploadArea');
    const imagePreview = document.getElementById('imagePreview');
    const previewImg = document.getElementById('previewImg');

    const reader = new FileReader();
    reader.onload = function(e) {
        previewImg.src = e.target.result;
        uploadArea.style.display = 'none';
        imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

// Analysis Functions
function getCropRecommendation() {
    const soilType = document.getElementById('soilType').value;
    const season = document.getElementById('season').value;
    const location = document.getElementById('location').value;
    const farmSize = document.getElementById('farmSize').value;

    if (!soilType || !season || !location || !farmSize) {
        showNotification('Please fill in all fields', 'warning');
        return;
    }

    // Show loading
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="loading"></i> Analyzing...';
    button.disabled = true;

    // Simulate API call
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        closeModal('cropAdvisoryModal');

        // Show results
        showCropResults(soilType, season, location, farmSize);
    }, 2000);
}

function analyzePest() {
    const previewImg = document.getElementById('previewImg');

    if (!previewImg.src) {
        showNotification('Please upload an image first', 'warning');
        return;
    }

    // Show loading
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="loading"></i> Analyzing...';
    button.disabled = true;

    // Simulate AI analysis
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        closeModal('pestDetectionModal');

        // Show results
        showPestResults();
    }, 3000);
}

function getFertilizerRecommendation() {
    const cropType = document.getElementById('cropType').value;
    const growthStage = document.getElementById('growthStage').value;
    const nitrogen = document.getElementById('nitrogen').value;
    const phosphorus = document.getElementById('phosphorus').value;
    const potassium = document.getElementById('potassium').value;

    if (!cropType || !growthStage || !nitrogen || !phosphorus || !potassium) {
        showNotification('Please fill in all fields', 'warning');
        return;
    }

    // Show loading
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="loading"></i> Calculating...';
    button.disabled = true;

    // Simulate calculation
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        closeModal('fertilizerModal');

        // Show results
        showFertilizerResults(cropType, growthStage, nitrogen, phosphorus, potassium);
    }, 1500);
}

// Results Display Functions
function showCropResults(soilType, season, location, farmSize) {
    const resultsContent = `
        <div class="results-card">
            <h3><i class="fas fa-seedling"></i> Recommended Crops</h3>
            <ul class="recommendation-list">
                <li><strong>Rice</strong> - Highly suitable for ${soilType} soil in ${season} season</li>
                <li><strong>Wheat</strong> - Good yield potential with proper irrigation</li>
                <li><strong>Sugarcane</strong> - Excellent market prospects in your area</li>
            </ul>
            <div class="confidence-bar">
                <div class="confidence-fill" style="width: 92%"></div>
            </div>
            <p><small>Confidence: 92%</small></p>
        </div>
        <div class="results-card">
            <h3><i class="fas fa-chart-line"></i> Yield Predictions</h3>
            <ul class="recommendation-list">
                <li>Rice: 45-55 quintals per hectare</li>
                <li>Expected revenue: ₹85,000 - ₹95,000 per hectare</li>
                <li>Investment required: ₹25,000 per hectare</li>
            </ul>
        </div>
        <div class="results-card">
            <h3><i class="fas fa-lightbulb"></i> Farming Tips</h3>
            <ul class="recommendation-list">
                <li>Best sowing time: Next 2-3 weeks</li>
                <li>Use drip irrigation for water efficiency</li>
                <li>Apply organic compost before sowing</li>
            </ul>
        </div>
    `;

    showResults('Crop Advisory Results', resultsContent);
}

function showPestResults() {
    const resultsContent = `
        <div class="results-card">
            <h3><i class="fas fa-bug"></i> Pest Detection Results</h3>
            <div class="confidence-bar">
                <div class="confidence-fill" style="width: 87%"></div>
            </div>
            <p><strong>Detected:</strong> Brown Plant Hopper (87% confidence)</p>
            <p><strong>Severity:</strong> Moderate infestation</p>
        </div>
        <div class="results-card">
            <h3><i class="fas fa-medical-kit"></i> Treatment Recommendations</h3>
            <ul class="recommendation-list">
                <li>Apply Imidacloprid 17.8% SL @ 0.3ml/liter</li>
                <li>Spray during evening hours for best results</li>
                <li>Repeat treatment after 10-15 days if needed</li>
                <li>Monitor field regularly for re-infestation</li>
            </ul>
        </div>
        <div class="results-card">
            <h3><i class="fas fa-shield-alt"></i> Prevention Tips</h3>
            <ul class="recommendation-list">
                <li>Maintain proper field hygiene</li>
                <li>Use yellow sticky traps for monitoring</li>
                <li>Avoid over-fertilization with nitrogen</li>
                <li>Plant resistant varieties in next season</li>
            </ul>
        </div>
    `;

    showResults('Pest Detection Results', resultsContent);
}

function showFertilizerResults(cropType, growthStage, nitrogen, phosphorus, potassium) {
    const resultsContent = `
        <div class="results-card">
            <h3><i class="fas fa-flask"></i> Fertilizer Recommendations</h3>
            <p><strong>Crop:</strong> ${cropType.charAt(0).toUpperCase() + cropType.slice(1)}</p>
            <p><strong>Growth Stage:</strong> ${growthStage.charAt(0).toUpperCase() + growthStage.slice(1)}</p>
        </div>
        <div class="results-card">
            <h3><i class="fas fa-calculator"></i> NPK Requirements</h3>
            <ul class="recommendation-list">
                <li><strong>Nitrogen (N):</strong> 45 kg/hectare (Current: ${nitrogen} ppm - Deficient)</li>
                <li><strong>Phosphorus (P):</strong> 20 kg/hectare (Current: ${phosphorus} ppm - Adequate)</li>
                <li><strong>Potassium (K):</strong> 30 kg/hectare (Current: ${potassium} ppm - Low)</li>
            </ul>
        </div>
        <div class="results-card">
            <h3><i class="fas fa-calendar-alt"></i> Application Schedule</h3>
            <ul class="recommendation-list">
                <li><strong>Base Application:</strong> DAP - 100 kg/hectare at sowing</li>
                <li><strong>Top Dressing 1:</strong> Urea - 50 kg/hectare after 3 weeks</li>
                <li><strong>Top Dressing 2:</strong> Urea - 50 kg/hectare after 6 weeks</li>
                <li><strong>Micronutrients:</strong> Foliar spray at flowering stage</li>
            </ul>
        </div>
        <div class="results-card">
            <h3><i class="fas fa-coins"></i> Cost Estimation</h3>
            <ul class="recommendation-list">
                <li>Total fertilizer cost: ₹8,500 per hectare</li>
                <li>Expected yield increase: 15-20%</li>
                <li>Return on investment: 280%</li>
                <li>Additional revenue: ₹18,000 per hectare</li>
            </ul>
        </div>
    `;

    showResults('Fertilizer Advisory Results', resultsContent);
}

function showResults(title, content) {
    document.getElementById('resultsTitle').textContent = title;
    document.getElementById('resultsContent').innerHTML = content;
    openModal('resultsModal');

    // Animate confidence bars
    setTimeout(() => {
        const confidenceFills = document.querySelectorAll('.confidence-fill');
        confidenceFills.forEach(fill => {
            const width = fill.style.width;
            fill.style.width = '0%';
            setTimeout(() => {
                fill.style.width = width;
            }, 100);
        });
    }, 300);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        z-index: 3000;
        background: var(--background-white);
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-heavy);
        border-left: 4px solid var(--${type === 'warning' ? 'warning' : type === 'error' ? 'error' : 'info'}-color);
        display: flex;
        align-items: center;
        gap: 1rem;
        min-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'warning': return 'exclamation-triangle';
        case 'error': return 'exclamation-circle';
        case 'success': return 'check-circle';
        default: return 'info-circle';
    }
}

// Animation Observers
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .stat-card, .action-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Counter animation for dashboard stats
    animateCounters();
}

function animateCounters() {
    const counterElements = document.querySelectorAll('.stat-value');

    counterElements.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = counter.textContent.replace(/\d+/, Math.floor(current).toString());
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent.replace(/\d+/, target.toString());
            }
        };

        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(counter);
    });
}

// Weather Data (Mock)
function updateWeatherData() {
    // This would typically fetch from a weather API
    const weatherData = {
        temperature: 28,
        humidity: 65,
        rainfall: 12,
        windSpeed: 8
    };

    // Update weather widgets if they exist
    updateWeatherWidgets(weatherData);
}

function updateWeatherWidgets(data) {
    const weatherElements = {
        temperature: document.querySelector('.weather-temp'),
        humidity: document.querySelector('.weather-humidity'),
        rainfall: document.querySelector('.weather-rain'),
        wind: document.querySelector('.weather-wind')
    };

    if (weatherElements.temperature) weatherElements.temperature.textContent = `${data.temperature}°C`;
    if (weatherElements.humidity) weatherElements.humidity.textContent = `${data.humidity}%`;
    if (weatherElements.rainfall) weatherElements.rainfall.textContent = `${data.rainfall}mm`;
    if (weatherElements.wind) weatherElements.wind.textContent = `${data.windSpeed} km/h`;
}

// Data Export Functions
function exportToPDF() {
    // This would integrate with a PDF library like jsPDF
    showNotification('PDF export feature will be implemented with jsPDF library', 'info');
}

function exportToExcel() {
    // This would integrate with SheetJS library
    showNotification('Excel export feature will be implemented with SheetJS library', 'info');
}

// Local Storage Functions (for demo purposes - in real app this would be backend)
function saveRecommendation(type, data) {
    const recommendations = JSON.parse(localStorage.getItem('recommendations') || '[]');
    recommendations.push({
        id: Date.now(),
        type: type,
        data: data,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('recommendations', JSON.stringify(recommendations));
}

function getRecommendations() {
    return JSON.parse(localStorage.getItem('recommendations') || '[]');
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            filterContent(query);
        });
    }
}

function filterContent(query) {
    const searchableElements = document.querySelectorAll('.feature-card, .alert-item');

    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(query) || query === '') {
            element.style.display = '';
        } else {
            element.style.display = 'none';
        }
    });
}

// Print Functionality
function printResults() {
    window.print();
}

// Share Functionality
function shareResults() {
    if (navigator.share) {
        navigator.share({
            title: 'Smart Crop Advisory Results',
            text: 'Check out my crop advisory results from CropSmart',
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Link copied to clipboard!', 'success');
        }).catch(() => {
            showNotification('Unable to share. Please copy the URL manually.', 'error');
        });
    }
}

// Keyboard Shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key to close modals
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal[style*="block"]');
        openModals.forEach(modal => {
            closeModal(modal.id);
        });
    }

    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.focus();
        }
    }
});

// Add CSS for additional animations
const additionalCSS = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }

    .notification {
        animation: slideInRight 0.3s ease-out;
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
    }

    .notification-close {
        background: none;
        border: none;
        cursor: pointer;
        color: var(--text-secondary);
        padding: 0.25rem;
        border-radius: 4px;
        transition: all 0.2s ease;
    }

    .notification-close:hover {
        background: rgba(0, 0, 0, 0.1);
        color: var(--text-primary);
    }
`;

// Add the additional CSS to the page
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

function initializeApp() {
    initializeNavigation();
    initializeImageUpload();
    initializeAnimations();
    initializeSearch();
    updateWeatherData();

    // Set up periodic updates
    setInterval(updateWeatherData, 300000); // Update weather every 5 minutes
}

// Service Worker Registration (for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        });
    }
}