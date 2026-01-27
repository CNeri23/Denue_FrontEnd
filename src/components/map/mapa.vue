<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script setup>
import { onMounted, watch, nextTick } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useDenueStore } from '../../store/denue'

const store = useDenueStore()
let map = null
let markersLayer = null

const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41]
})

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

onMounted(() => {
  map = L.map('map').setView([19.43, -99.13], 8)
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  markersLayer = L.layerGroup().addTo(map)
})

watch(() => store.unidades, async (nuevas) => {
  if (!map || !markersLayer) return;

  // CodeIgniter manda los datos en nuevas.data
  const lista = nuevas?.data || [];
  console.log(`Pintando en mapa: ${lista.length} unidades`);

  markersLayer.clearLayers();
  const bounds = [];

  lista.forEach(u => {
    // Usamos los nombres que configuramos en el Controller
    const lat = parseFloat(u.latitud);
    const lng = parseFloat(u.longitud);
    
    if (!isNaN(lat) && !isNaN(lng)) {
      const marker = L.marker([lat, lng], { icon: defaultIcon })
        .bindPopup(`
          <b>${u.nombreEstablecimiento || u.nom_estab || 'Sin nombre'}</b><br>
          <small>${u.act_nombre || 'Sin actividad'}</small>
        `)
        .on('click', () => { 
          store.unidadSeleccionada = u; 
        });
      
      markersLayer.addLayer(marker);
      bounds.push([lat, lng]);
    }
  });

  if (bounds.length > 0) {
    map.fitBounds(bounds, { padding: [50, 50] });
  }
}, { deep: true });
</script>

<style scoped>
.map-container, #map { width: 100%; height: 100%; min-height: 550px; border-radius: 8px; z-index: 1; }

  #map { 
    height: 100%; 
    width: 100%; 
    min-height: 550px; /* Esto es vital */
  }
</style>