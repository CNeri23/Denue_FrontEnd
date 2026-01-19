<template>
  <div class="denue-panel">
    <div class="header-orange">Actividades Económicas</div>
    
    <div class="tree-container" v-if="store">
      <div v-for="sector in store.sectoresBase" :key="sector.Clave" class="tree-item">
        <div class="row">
          <span class="toggle-btn" @click="toggleNodo('sector', sector.Clave)">
            {{ desplegados[sector.Clave] ? '-' : '+' }}
          </span>
          <input type="checkbox" @change="e => handleSeleccionMasiva(sector.Clave, e.target.checked)">
          <span class="text-bold" @click="toggleNodo('sector', sector.Clave)">{{ sector.Nombre }}</span>
        </div>

        <div v-if="desplegados[sector.Clave]" class="ml-4">
          <NodeItem 
            v-for="hijo in store.arbolActividades[sector.Clave]" 
            :key="hijo.Clave" 
            :nodo="hijo" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useDenueStore } from '../../store/denue'
import NodeItem from './NodeItem.vue' // Crearemos este sub-componente abajo

const store = useDenueStore()
const desplegados = reactive({})

async function toggleNodo(nivel, clave) {
  desplegados[clave] = !desplegados[clave]
  if (desplegados[clave]) {
    await store.cargarHijosActividad(nivel, clave)
  }
}

function handleSeleccionMasiva(clave, checked) {
  const nodos = store.arbolActividades[clave] || []
  store.seleccionarRecursivo(nodos, checked)
}
</script>