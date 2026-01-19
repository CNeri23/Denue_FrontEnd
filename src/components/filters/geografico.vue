<template>
  <div class="filter-panel">
    <div class="panel-header">
      <i class="icon-map"></i>
      <span>Ubicación Geográfica</span>
    </div>
    
    <div class="scroll-container">
      <div v-for="ent in store.entidades" :key="ent.Id" class="tree-node">
        <div class="node-row sector" @click="handleEntidadToggle(ent)">
          <span class="arrow" :class="{ rotated: entidadDesplegada === ent.Id }">▶</span>
          <span class="text">{{ ent.Nombre }}</span>
        </div>

        <div v-if="entidadDesplegada === ent.Id" class="node-children">
          <div v-if="store.cargando" class="loading-msg">Cargando municipios...</div>
          
          <div v-for="mun in store.municipios" :key="mun.Id">
            <div class="node-row subsector" @click="handleMunicipioToggle(mun)">
              <span class="arrow" :class="{ rotated: municipioDesplegado === mun.Id }">▶</span>
              <span class="text">{{ mun.Nombre }}</span>
            </div>

            <div v-if="municipioDesplegado === mun.Id" class="node-children">
              <div 
                v-for="loc in mun.localidades" 
                :key="loc.Id"
                class="selectable-item"
                :class="{ selected: store.localidad?.Id === loc.Id }"
                @click="store.seleccionarLocalidad(loc)"
              >
                <span class="dot">•</span>
                <span class="text">{{ loc.Nombre }}</span>
              </div>
              <div v-if="mun.localidades && !mun.localidades.length" class="loading-msg">
                Cargando localidades...
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
const entidadDesplegada = ref(null)
const municipioDesplegado = ref(null)

onMounted(() => {
  store.cargarEntidades()
})

async function handleEntidadToggle(ent) {
  if (entidadDesplegada.value === ent.Id) {
    entidadDesplegada.value = null
  } else {
    entidadDesplegada.value = ent.Id
    // Cargamos los municipios de esta entidad
    await store.seleccionarEntidad(ent)
  }
}

function handleMunicipioToggle(mun) {
  if (municipioDesplegado.value === mun.Id) {
    municipioDesplegado.value = null
  } else {
    municipioDesplegado.value = mun.Id
    store.seleccionarMunicipio(mun)
  }
}
</script>

<style scoped>
/* Reutiliza los estilos que ya tienes para Actividades */
.loading-msg {
  padding: 5px 20px;
  font-size: 0.75rem;
  color: #666;
  font-style: italic;
}
.selectable-item {
  display: flex;
  align-items: center;
  padding: 6px 20px;
  cursor: pointer;
  font-size: 0.8rem;
  color: #aaa;
}
.selectable-item.selected {
  color: #42b883;
  background: rgba(66, 184, 131, 0.1);
}
.dot { margin-right: 10px; }
</style>