<template>
  <div id="map" style="height:600px"></div>
</template>

<script setup>
import L from 'leaflet'
import { onMounted, watch } from 'vue'
import { useDenueStore } from '../../store/denue'

const store = useDenueStore()
let map

onMounted(() => {
  map = L.map('map').setView([19.35, -99.6], 8)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
    .addTo(map)
})

watch(() => store.unidades, (data) => {
  data.forEach(u => {
    if (!u.Latitud || !u.Longitud) return
    L.marker([u.Latitud, u.Longitud])
      .addTo(map)
      .bindPopup(u.Nombre)
  })
})
</script>
