<template>
  <div class="denue-panel">
    <div class="tree-container">
      <div v-for="sec in store.sectoresRaiz" :key="sec.Clave" class="root-node">
        <div class="row" @click="toggleSector(sec.Clave)">
          <span class="toggle-btn">{{ desplegados[sec.Clave] ? '-' : '+' }}</span>
          <input 
            type="checkbox" 
            @click.stop 
            :checked="store.actividadesSeleccionadas.includes(sec.Clave)"
            @change="e => toggleSeleccionSector(sec, e.target.checked)">
          <span class="text-bold">({{ sec.Clave }}) {{ sec.Nombre }}</span>
        </div>
        <div v-if="desplegados[sec.Clave]" class="indent">
          <ActividadNodo v-for="hijo in store.arbolActividades[sec.Clave]" :key="hijo.Clave" :nodo="hijo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useDenueStore } from '../../store/denue'
import ActividadNodo from './ActividadNodo.vue'

const store = useDenueStore()
const desplegados = reactive({})

onMounted(() => store.cargarSectoresRaiz())

async function toggleSector(clave) {
  desplegados[clave] = !desplegados[clave]
  if (desplegados[clave]) await store.cargarHijosActividad('sector', clave)
}

function toggleSeleccionSector(sec, checked) {
  const index = store.actividadesSeleccionadas.indexOf(sec.Clave)
  if (checked && index === -1) store.actividadesSeleccionadas.push(sec.Clave)
  else if (!checked) store.actividadesSeleccionadas = store.actividadesSeleccionadas.filter(c => c !== sec.Clave)
  
  if (store.arbolActividades[sec.Clave]) {
    store.seleccionarRecursivo(store.arbolActividades[sec.Clave], checked)
  }
}
</script>

<style scoped>
.denue-panel { border: 1px solid #ccc; height: 350px; display: flex; flex-direction: column; }
.tree-container { flex: 1; overflow-y: auto; padding: 5px; }
.row { display: flex; align-items: center; gap: 5px; cursor: pointer; padding: 2px 0; }
.text-bold { font-size: 11px; }
.indent { margin-left: 15px; border-left: 1px dotted #ccc; }
.toggle-btn { width: 16px; text-align: center; border: 1px solid #ccc; font-size: 10px; background: #eee; }
</style>