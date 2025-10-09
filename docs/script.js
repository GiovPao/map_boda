// Load Leaflet from CDN
const leafletScript = document.createElement("script");
leafletScript.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
leafletScript.onload = initMap;
document.head.appendChild(leafletScript);

function initMap() {
  // Create the map
  const map = L.map("map").setView([43.321, -1.99], 14);

  // Add OpenStreetMap tiles
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
  }).addTo(map);

const ringIcon = L.divIcon({
  html: `<div class="marker-pin blue"></div>
         <img src="assets/icons/wedding-ring.png" class="marker-icon" />`,               // The emoji
  className: "custom-div-icon",  // The CSS class from the <style> block
  iconSize: [36, 36],       // Size of the icon
  iconAnchor: [18, 36]      // Point of the icon which will correspond to marker's location
});

const champagneIcon = L.divIcon({
  className: "custom-div-icon",
  html: `<div class="marker-pin blue"></div>
         <img src="assets/icons/champagne-glass.png" class="marker-icon" />`,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});
  // Example locations
  const locations = [
    {
      name: "Capilla de San Pedro Apóstol",
      lng: -1.9880802727290503,
      lat: 43.323729,
      address: "P.º del Muelle, 2, 20003 Donostia-San Sebastian, Gipuzkoa",
      contact: "+1 555-1234",
      website:
        "https://www.google.com/maps/dir//Capilla+de+San+Pedro+Ap%C3%B3stol,+P.%C2%BA+del+Muelle,+2,+20003+Donostia,+Gipuzkoa/@43.3235899,-1.988796,18.77z/data=!4m9!4m8!1m0!1m5!1m1!1s0xd51a54d32987a8d:0x157ebdd186ea07ed!2m2!1d-1.9880744!2d43.3236819!3e0?entry=ttu&g_ep=EgoyMDI1MDkyOS4wIKXMDSoASAFQAw%3D%3D",
      icon: ringIcon
    },
    {
      name: "Hotel Londres",
      lat: 43.31822, 
      lng: -1.98513,
      address: "Zubieta Kalea, 2, 20007 Donostia, Gipuzkoa",
      contact: "+49 30 123456",
      website:
        "https://www.google.com/maps/dir//Hotel+de+Londres,+Zubieta+Kalea,+2,+20007+Donostia,+Gipuzkoa/@43.3181046,-1.995257,15z/data=!3m1!5s0xd51a553999a5e03:0x9de6c08a24b8433!4m9!4m8!1m0!1m5!1m1!1s0xd51a55391c1c7d9:0x44362d1de262a158!2m2!1d-1.9849787!2d43.3181051!3e0?entry=ttu&g_ep=EgoyMDI1MDkyOS4wIKXMDSoASAFQAw%3D%3D",
      icon: champagneIcon
    }
  ];

  // Add markers with Google Maps arrow link in popup
  locations.forEach((loc) => {
    const popupContent =
      `<strong>${loc.name}</strong><br>` +
      (loc.address ? loc.address + "<br>" : "") +
      `<a href="${loc.website}" target="_blank" style="text-decoration:none; font-size:18px;">➡️ Google Maps</a>`;
    L.marker([loc.lat, loc.lng], { icon: loc.icon }).addTo(map).bindPopup(popupContent);
  });

  // GeoJSON line content
  const geojsonLine = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [
        [-1.98513, 43.31822],
        [-1.98509, 43.31828],
        [-1.98518, 43.31831],
        [-1.98534, 43.31839],
        [-1.98534, 43.31839],
        [-1.98501, 43.31884],
        [-1.98488, 43.31923],
        [-1.98489, 43.31932],
        [-1.98496, 43.31969],
        [-1.98496, 43.31971],
        [-1.98505, 43.32023],
        [-1.98513, 43.32035],
        [-1.98524, 43.32044],
        [-1.98614, 43.32091],
        [-1.98616, 43.32094],
        [-1.98616, 43.32094],
        [-1.98617, 43.32097],
        [-1.98654, 43.32159],
        [-1.98657, 43.32162],
        [-1.98661, 43.32167],
        [-1.98672, 43.32177],
        [-1.98677, 43.32182],
        [-1.98677, 43.32182],
        [-1.98692, 43.32185],
        [-1.98692, 43.32185],
        [-1.98703, 43.32197],
        [-1.98751, 43.32294],
        [-1.98758, 43.32305],
        [-1.9879, 43.32359],
        [-1.9879, 43.32359],
        [-1.9880802727290503, 43.323729]
      ]
    }
  };

  // Add GeoJSON line to map
  L.geoJSON(geojsonLine, {
    style: { color: "blue", weight: 4, opacity: 0.6, dashArray: "4 10" }
  }).addTo(map);

  // Zoom map to fit both markers and the line
  const group = new L.featureGroup([
    L.marker([locations[0].lat, locations[0].lng]),
    L.marker([locations[1].lat, locations[1].lng])
  ]);
  map.fitBounds(group.getBounds().pad(0.2));
}
