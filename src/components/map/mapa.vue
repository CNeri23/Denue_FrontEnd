<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script setup>
import L from 'leaflet'
import { onMounted, watch, nextTick } from 'vue'
import { useDenueStore } from '../../store/denue'

const store = useDenueStore()

let map
let markersLayer

onMounted(async () => {
  map = L.map('map').setView([19.35, -99.6], 8)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
  }).addTo(map)

  markersLayer = L.layerGroup().addTo(map)

  // 🔑 MUY IMPORTANTE
  await nextTick()
  map.invalidateSize()
})

watch(
  () => store.unidades,
  (data) => {
    if (!map || !markersLayer) return

    markersLayer.clearLayers()

    if (!data || !data.length) return

    const bounds = []

    data.forEach(u => {
      if (!u.Latitud || !u.Longitud) return

      const marker = L.marker([u.Latitud, u.Longitud])
        .bindPopup(`
          <strong>${u.Nombre}</strong><br>
          ${u.Calle || ''}
        `)

      markersLayer.addLayer(marker)
      bounds.push([u.Latitud, u.Longitud])
    })

    if (bounds.length) {
      map.fitBounds(bounds, { padding: [40, 40] })
    }
  },
  { deep: true }
)
</script>

<style scoped>
.map-container {
  width: 100%;
  background: #1e1e1e;
  border-radius: 12px;
  padding: 8px;
}

#map {
  width: 100%;
  height: 70vh;
  min-height: 520px;
  border-radius: 10px;
}
</style>
