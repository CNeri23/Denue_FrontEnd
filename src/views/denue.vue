<template>
  <div class="denue-page">
    <BarraFiltros />
    <Mapa />
  </div>
</template>

<script setup>
import BarraFiltros from '../components/filters/barra_filtros.vue'
import Mapa from '../components/map/mapa.vue'
</script>

<style scoped>
.denue-page {
  max-width: 1300px;
  margin: 0 auto;
  padding: 16px;
}
</style>
