<template>
  <div class="denue-panel">
    <div class="header-orange">Actividad económica</div>
    
    <div class="tree-container" v-if="store">
      <div v-for="sec in store.sectoresRaiz" :key="sec.Clave" class="root-node">
        <div class="row">
          <span class="toggle-btn" @click="toggleSector(sec.Clave)">
            {{ desplegados[sec.Clave] ? '-' : '+' }}
          </span>
          <input type="checkbox" @change="e => store.seleccionarRecursivo(store.arbolActividades[sec.Clave], e.target.checked)">
          <span class="text-bold" @click="toggleSector(sec.Clave)">{{ sec.Nombre }}</span>
        </div>

        <div v-if="desplegados[sec.Clave]" class="indent">
          <ActividadNodo 
            v-for="hijo in store.arbolActividades[sec.Clave]" 
            :key="hijo.Clave" 
            :nodo="hijo" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useDenueStore } from '../../store/denue';
import ActividadNodo from './ActividadNodo.vue';

const store = useDenueStore();
const desplegados = reactive({});

async function toggleSector(clave) {
  desplegados[clave] = !desplegados[clave];
  if (desplegados[clave]) {
    await store.cargarHijosActividad('sector', clave);
  }
}
</script>

<style scoped>
.denue-panel { border: 1px solid #ccc; background: #fff; margin-bottom: 10px; }
.header-orange { background: #f0ad4e; color: white; padding: 6px 10px; font-weight: bold; font-size: 14px; }
.tree-container { height: 350px; overflow: auto; padding: 5px; }
.row { display: flex; align-items: center; gap: 8px; padding: 2px 0; cursor: pointer; }
.toggle-btn { width: 16px; height: 16px; border: 1px solid #999; display: flex; align-items: center; justify-content: center; background: #eee; font-size: 12px; font-weight: bold; }
.text-bold { font-weight: bold; font-size: 12px; color: #333; }
.indent { margin-left: 20px; border-left: 1px dotted #ccc; }
</style>