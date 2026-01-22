<template>
  <div class="denue-panel">
    <div class="tree-container">
      <div v-for="p in store.listadoPersonal" :key="p.Id" class="tree-item">
        <label class="row">
          <input 
            type="checkbox" 
            :checked="store.personalSeleccionado.includes(p.Id)" 
            @change="store.togglePersonal(p.Id)"
          >
          <span class="text-xs">{{ p.Nombre }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useDenueStore } from '../../store/denue'

const store = useDenueStore()

onMounted(() => {
  if (store.listadoPersonal.length === 0) {
    store.cargarPersonal()
  }
})
</script>

<style scoped>
.denue-panel { border: 1px solid #ccc; height: auto; display: flex; flex-direction: column; background: #fff; }
.tree-container { flex: 1; overflow-y: auto; padding: 5px; }
.row { display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 4px 0; }
.text-xs { font-size: 11px; color: #333; }
</style>