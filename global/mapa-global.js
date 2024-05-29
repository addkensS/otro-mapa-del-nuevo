document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let currentLocationMarker = null;
    let routeCoordinates = [];

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(position => {
            const { latitude, longitude } = position.coords;

            if (currentLocationMarker) {
                map.removeLayer(currentLocationMarker);
            }

            currentLocationMarker = L.marker([latitude, longitude]).addTo(map);
            map.setView([latitude, longitude], 16);
        }, error => {
            console.error('Error de geolocalización:', error);
        });
    }

    document.getElementById('createRouteBtn').addEventListener('click', () => {
        if (routeCoordinates.length > 0) {
            routeCoordinates.forEach(coordinate => {
                L.marker(coordinate).addTo(map);
            });

            const polyline = L.polyline(routeCoordinates, { color: 'red' }).addTo(map);
            map.fitBounds(polyline.getBounds());
        } else {
            alert('No se han agregado puntos a la ruta.');
        }
    });

    map.on('click', (event) => {
        const { lat, lng } = event.latlng;
        routeCoordinates.push([lat, lng]);
        L.marker([lat, lng]).addTo(map);
    });
});