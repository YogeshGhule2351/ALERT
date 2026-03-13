// Global variables
let currentCoordinates = null;

/**
 * Validate latitude and longitude coordinates
 * @param {number} lat - Latitude value
 * @param {number} lng - Longitude value
 * @returns {Object} - Validation result with isValid and message properties
 */
function validateCoordinates(lat, lng) {
    // Check if values are numbers
    if (isNaN(lat) || isNaN(lng)) {
        return {
            isValid: false,
            message: 'Please enter valid numeric values for latitude and longitude.'
        };
    }
    
    // Check latitude range
    if (lat < -90 || lat > 90) {
        return {
            isValid: false,
            message: 'Latitude must be between -90 and 90 degrees.'
        };
    }
    
    // Check longitude range
    if (lng < -180 || lng > 180) {
        return {
            isValid: false,
            message: 'Longitude must be between -180 and 180 degrees.'
        };
    }
    
    return {
        isValid: true,
        message: ''
    };
}

/**
 * Display error message to the user
 * @param {string} message - Error message to display
 */
function showError(message) {
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = message;
    errorElement.classList.add('show');
    
    // Hide error message after 5 seconds
    setTimeout(() => {
        errorElement.classList.remove('show');
    }, 5000);
}

/**
 * Hide error message
 */
function hideError() {
    const errorElement = document.getElementById('errorMessage');
    errorElement.classList.remove('show');
}

/**
 * Handle the "Show Location" button click
 */
function handleShowLocation() {
    // Get input values
    const latInput = document.getElementById('latitude');
    const lngInput = document.getElementById('longitude');
    
    const lat = parseFloat(latInput.value);
    const lng = parseFloat(lngInput.value);
    
    // Hide any existing error message
    hideError();
    
    // Validate coordinates
    const validation = validateCoordinates(lat, lng);
    
    if (!validation.isValid) {
        showError(validation.message);
        return;
    }
    
    // Store current coordinates
    currentCoordinates = [lat, lng];
    
    // Navigate to map page with coordinates
    const latFormatted = lat.toFixed(6);
    const lngFormatted = lng.toFixed(6);
    window.location.href = `map.html?lat=${latFormatted}&lng=${lngFormatted}`;
}

/**
 * Handle Enter key press in input fields
 * @param {Event} event - Keyboard event
 */
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        handleShowLocation();
    }
}

/**
 * Share current location on WhatsApp
 */
function shareOnWhatsApp() {
    if (!currentCoordinates) {
        showError('Please set a location first before sharing.');
        return;
    }
    
    const lat = currentCoordinates[0].toFixed(6);
    const lng = currentCoordinates[1].toFixed(6);
    
    // Create share message with location details and Google Maps link
    const message = `📍 Check out this location:\n\nLatitude: ${lat}\nLongitude: ${lng}\n\n🗺️ View on map: https://www.google.com/maps?q=${lat},${lng}\n\nShared via Coordinate Map Finder`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp share URL
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
}

/**
 * Initialize event listeners when DOM is loaded
 */
function initEventListeners() {
    // Show Location button click event
    document.getElementById('showLocation').addEventListener('click', handleShowLocation);
    
    // Share Location button click event
    document.getElementById('shareLocation').addEventListener('click', shareOnWhatsApp);
    
    // Enter key events for input fields
    document.getElementById('latitude').addEventListener('keypress', handleKeyPress);
    document.getElementById('longitude').addEventListener('keypress', handleKeyPress);
    
    // Clear error message when user starts typing
    document.getElementById('latitude').addEventListener('input', hideError);
    document.getElementById('longitude').addEventListener('input', hideError);
}

/**
 * Main initialization function
 */
function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initEventListeners();
        });
    } else {
        // DOM is already loaded
        initEventListeners();
    }
}

// Initialize the application
init();
