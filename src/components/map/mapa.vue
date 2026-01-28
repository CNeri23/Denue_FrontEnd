<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import 'leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'

import { useDenueStore } from '../../store/denue'

const store = useDenueStore()
let map = null
let clusterLayer = null

onMounted(() => {
  map = L.map('map').setView([19.43, -99.13], 8)
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map)

  // 👇 CLUSTER en vez de layerGroup
  clusterLayer = L.markerClusterGroup({
    chunkedLoading: true,   // 🔥 evita que se congele
    chunkDelay: 50
  })

  map.addLayer(clusterLayer)
})

watch(
  () => store.unidadesMapa.data,
  (lista) => {
    if (!map || !clusterLayer) return

    clusterLayer.clearLayers()
    const bounds = []

    lista.forEach(u => {
      const lat = parseFloat(u.latitud)
      const lng = parseFloat(u.longitud)

      if (!isNaN(lat) && !isNaN(lng)) {
        const marker = L.marker([lat, lng])
          .bindPopup(`
            <b>${u.nombreEstablecimiento}</b><br>
            ${u.act_nombre}
          `)

        clusterLayer.addLayer(marker)
        bounds.push([lat, lng])
      }
    })

    if (bounds.length) {
      map.fitBounds(bounds, { padding: [50, 50] })
    }
  },
  { deep: true }
)
</script>

<style scoped>
.map-container, #map { width: 100%; height: 100%; min-height: 550px; border-radius: 8px; z-index: 1; }

  #map { 
    height: 100%; 
    width: 100%; 
    min-height: 550px; /* Esto es vital */
  }
</style>