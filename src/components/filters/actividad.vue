<template>
  <div class="denue-panel">
    <div class="header-selection">
      <label class="row select-all">
        <input 
          type="checkbox" 
          :checked="esTodoSeleccionado"
          @change="e => toggleSeleccionarTodo(e.target.checked)">
        <span class="text-bold">Todas las unidades</span>
      </label>
    </div>

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
import { reactive, onMounted, computed } from 'vue'
import { useDenueStore } from '../../store/denue'
import ActividadNodo from './ActividadNodo.vue'

const store = useDenueStore()
const desplegados = reactive({})

onMounted(() => store.cargarSectoresRaiz())

const esTodoSeleccionado = computed(() => {
  return store.sectoresRaiz.length > 0 && 
         store.sectoresRaiz.every(sec => store.actividadesSeleccionadas.includes(sec.Clave))
})

async function toggleSector(clave) {
  desplegados[clave] = !desplegados[clave]
  if (desplegados[clave]) await store.cargarHijosActividad('sector', clave)
}

// Modificada para asegurar que los hijos existan antes de seleccionar
async function toggleSeleccionSector(sec, checked) {
  // 1. Asegurar que los hijos estén cargados si se va a marcar
  if (checked && !store.arbolActividades[sec.Clave]) {
    await store.cargarHijosActividad('sector', sec.Clave)
  }

  // 2. Marcar/Desmarcar el padre
  const index = store.actividadesSeleccionadas.indexOf(sec.Clave)
  if (checked && index === -1) store.actividadesSeleccionadas.push(sec.Clave)
  else if (!checked) store.actividadesSeleccionadas = store.actividadesSeleccionadas.filter(c => c !== sec.Clave)
  
  // 3. Aplicar recursividad a los hijos ya cargados
  if (store.arbolActividades[sec.Clave]) {
    store.seleccionarRecursivo(store.arbolActividades[sec.Clave], checked)
  }
}

async function toggleSeleccionarTodo(checked) {
  // Usamos un bucle for...of para poder usar await y asegurar 
  // que cada rama se cargue y se seleccione correctamente
  for (const sec of store.sectoresRaiz) {
    await toggleSeleccionSector(sec, checked)
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