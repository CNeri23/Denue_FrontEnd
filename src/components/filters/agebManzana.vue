<template>
  <div class="filter-panel">
    <div class="panel-header">
      <i class="icon-layers"></i>
      <span>Detalle Geográfico (Opcional)</span>
    </div>
    
    <div class="inputs-grid">
      <div class="input-group">
        <label>AGEB</label>
        <input 
          type="text" 
          v-model="store.ageb" 
          placeholder="Ej. 012A"
          maxlength="4"
        >
      </div>
      
      <div class="input-group">
        <label>Manzana</label>
        <input 
          type="text" 
          v-model="store.manzana" 
          placeholder="Ej. 001"
          maxlength="3"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDenueStore } from '../../store/denue'
const store = useDenueStore()
</script>

<style scoped>
.inputs-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  padding: 15px;
  background: #1a1a1b;
}

.input-group label {
  display: block;
  font-size: 0.7rem;
  color: #888;
  margin-bottom: 5px;
  text-transform: uppercase;
}

.input-group input {
  width: 100%;
  background: #111;
  border: 1px solid #333;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.2s;
}

.input-group input:focus {
  border-color: #42b883;
}
</style>