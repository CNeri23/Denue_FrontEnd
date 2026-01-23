<template>
  <div class="denue-panel">
    <div class="header-selection">
      <label class="row select-all">
        <input 
          type="checkbox" 
          :checked="esTodoSeleccionado"
          @change="e => toggleSeleccionarTodoPersonal(e.target.checked)">
        <span class="text-bold">Todos los tamaños</span>
      </label>
    </div>

    <div class="tree-container">
      <div v-for="p in store.listadoPersonal" :key="p.Id" class="tree-item">
        <label class="row">
          <input 
            type="checkbox" 
            :checked="store.personalSeleccionado.includes(p.Id)" 
            @change="store.togglePersonal(p.Id)">
          <span class="text-xs">{{ p.Nombre }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useDenueStore } from '../../store/denue'

const store = useDenueStore()

onMounted(() => {
  if (store.listadoPersonal.length === 0) {
    store.cargarPersonal()
  }
})

// Verifica si todos los elementos del listado están en el array de seleccionados
const esTodoSeleccionado = computed(() => {
  return store.listadoPersonal.length > 0 && 
         store.personalSeleccionado.length === store.listadoPersonal.length
})

// Función para seleccionar o limpiar todo
function toggleSeleccionarTodoPersonal(checked) {
  if (checked) {
    // Mapeamos todos los IDs del listado al array de seleccionados
    store.personalSeleccionado = store.listadoPersonal.map(p => p.Id)
  } else {
    // Vaciamos el array
    store.personalSeleccionado = []
  }
}
</script>

<style scoped>
.denue-panel { border: 1px solid #ccc; height: auto; max-height: 350px; display: flex; flex-direction: column; background: #fff; }
.header-selection { padding: 8px; border-bottom: 1px solid #eee; background-color: #f9f9f9; }
.select-all { cursor: pointer; }
.tree-container { flex: 1; overflow-y: auto; padding: 5px; }
.row { display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 4px 0; }
.text-bold { font-size: 11px; font-weight: bold; color: #333; }
.text-xs { font-size: 11px; color: #333; }
</style>