// Global variables
let map;
let currentMarker = null;
let currentCoordinates = null;

/**
 * Get URL parameters
 * @returns {Object} - Object containing URL parameters
 */
function getUrlParameters() {
    const params = new URLSearchParams(window.location.search);
    return {
        lat: parseFloat(params.get('lat')),
        lng: parseFloat(params.get('lng'))
    };
}

/**
 * Initialize the map with coordinates from URL
 */
function initMap() {
    // Get coordinates from URL parameters
    const params = getUrlParameters();
    
    // Check if coordinates are valid
    if (isNaN(params.lat) || isNaN(params.lng)) {
        // Show error and redirect back if no valid coordinates
        document.getElementById('coordText').textContent = 'Invalid coordinates';
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        return;
    }
    
    // Store current coordinates
    currentCoordinates = [params.lat, params.lng];
    
    // Update coordinates display
    document.getElementById('coordText').textContent = 
        `Latitude: ${params.lat.toFixed(6)}, Longitude: ${params.lng.toFixed(6)}`;
    
    // Create the map instance
    map = L.map('map').setView(currentCoordinates, 13);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Add marker at the location
    addMarker(currentCoordinates);
    
    // Add share functionality
    document.getElementById('shareBtn').addEventListener('click', shareOnWhatsApp);
}

/**
 * Add a marker to the map at specified coordinates
 * @param {Array} coordinates - [latitude, longitude]
 */
function addMarker(coordinates) {
    // Remove existing marker if it exists
    if (currentMarker) {
        map.removeLayer(currentMarker);
    }
    
    // Create new marker with popup
    currentMarker = L.marker(coordinates).addTo(map);
    currentMarker.bindPopup(`
        <strong>🌾 Farm Location</strong><br>
        Latitude: ${coordinates[0].toFixed(6)}<br>
        Longitude: ${coordinates[1].toFixed(6)}<br>
        <br>
        <strong>Status: 🌱 Farm Active</strong>
    `).openPopup();
}

/**
 * Share current location on WhatsApp
 */
function shareOnWhatsApp() {
    if (!currentCoordinates) {
        alert('No location data available');
        return;
    }
    
    const lat = currentCoordinates[0].toFixed(6);
    const lng = currentCoordinates[1].toFixed(6);
    
    // Create share message with location details and Google Maps link
    const message = `🌾 FARMING LOCATION ALERT 🌾\n\n🌱 Farm Location Details!\n\n📍 Location Details:\nLatitude: ${lat}\nLongitude: ${lng}\n\n🗺️ View on map: https://www.google.com/maps?q=${lat},${lng}\n\n🌾 SMART IRRIGATION AND PRECISION FARMING\n\nCheck out this farm location!`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp share URL
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
}

/**
 * Handle keyboard shortcuts
 */
function handleKeyboardShortcuts(event) {
    // ESC key to go back
    if (event.key === 'Escape') {
        window.location.href = 'index.html';
    }
    
    // 'S' key to share
    if (event.key === 's' || event.key === 'S') {
        shareOnWhatsApp();
    }
}

/**
 * Initialize the map page
 */
function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initMap();
            document.addEventListener('keydown', handleKeyboardShortcuts);
        });
    } else {
        // DOM is already loaded
        initMap();
        document.addEventListener('keydown', handleKeyboardShortcuts);
    }
}

// Initialize the map page
init();
