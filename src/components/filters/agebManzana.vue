<template>
  <div class="denue-panel">
    <div class="header-orange">Detalle Geográfico</div>
    <div class="inputs-container">
      <div class="input-group">
        <label>AGEB</label>
        <input type="text" v-model="store.ageb" placeholder="Ej. 012A" maxlength="4">
      </div>
      <div class="input-group">
        <label>Manzana</label>
        <input type="text" v-model="store.manzana" placeholder="Ej. 001" maxlength="3">
      </div>
      <p class="info">Filtros opcionales para mayor precisión.</p>
    </div>
  </div>
</template>

<script setup>
import { useDenueStore } from '../../store/denue'
const store = useDenueStore()
</script>

<style scoped>
.denue-panel { border: 1px solid #ccc; height: 350px; }
.header-orange { background: #f0ad4e; color: white; padding: 8px; font-weight: bold; font-size: 13px; }
.inputs-container { padding: 15px; display: flex; flex-direction: column; gap: 15px; }
.input-group label { display: block; font-size: 11px; color: #666; font-weight: bold; margin-bottom: 4px; }
.input-group input { width: 100%; border: 1px solid #ccc; padding: 6px; border-radius: 3px; box-sizing: border-box; }
.info { font-size: 11px; color: #999; font-style: italic; margin-top: 10px; }
</style>