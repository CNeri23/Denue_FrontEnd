<template>
  <div class="denue-panel">
    <div class="tree-container">
      <div v-for="ent in store.entidades" :key="ent.Id" class="tree-item">
        <div class="row" @click="handleToggleEntidad(ent)">
          <span class="toggle-btn">{{ entidadAbierta === ent.Id ? '-' : '+' }}</span>
          <input type="checkbox" @click.stop :checked="store.entidadSeleccionada === ent.Id" @change="handleToggleEntidad(ent)">
          <span class="text-bold">{{ ent.Nombre }}</span>
        </div>
        <div v-if="entidadAbierta === ent.Id" class="ml-4">
          <div v-for="mun in store.municipios" :key="mun.Id" class="tree-item">
            <div class="row" @click="handleToggleMunicipio(mun)">
              <span class="toggle-btn">{{ municipioAbierto === mun.Id ? '-' : '+' }}</span>
              <input type="checkbox" @click.stop :checked="store.municipiosSeleccionados.includes(mun.Id)" @change="e => store.toggleMunicipioCascada(mun, e.target.checked)">
              <span>{{ mun.Nombre }}</span>
            </div>
            <div v-if="municipioAbierto === mun.Id" class="ml-8">
              <div v-for="loc in mun.Localidades" :key="loc.Id" class="row">
                <input type="checkbox" :checked="store.localidadesSeleccionadas.includes(loc.Id)" @change="store.toggleLocalidad(loc.Id)">
                <span class="text-xs">{{ loc.Nombre }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDenueStore } from '../../store/denue'
const store = useDenueStore()
const entidadAbierta = ref(null)
const municipioAbierto = ref(null)

onMounted(() => { if (!store.entidades.length) store.cargarEntidades() })

async function handleToggleEntidad(ent) {
  if (entidadAbierta.value === ent.Id) entidadAbierta.value = null
  else {
    entidadAbierta.value = ent.Id
    store.entidadSeleccionada = ent.Id
    await store.cargarArbolGeografico(ent.Id)
  }
}
function handleToggleMunicipio(mun) {
  municipioAbierto.value = municipioAbierto.value === mun.Id ? null : mun.Id
}
</script>

<style scoped>
.denue-panel { border: 1px solid #ccc; height: 350px; display: flex; flex-direction: column; }
.tree-container { flex: 1; overflow-y: auto; padding: 5px; }
.row { display: flex; align-items: center; gap: 5px; cursor: pointer; font-size: 11px; padding: 2px 0; }
.toggle-btn { width: 16px; text-align: center; border: 1px solid #ccc; font-size: 10px; background: #eee; }
.ml-4 { margin-left: 12px; border-left: 1px dotted #ccc; }
.ml-8 { margin-left: 15px; }
</style>