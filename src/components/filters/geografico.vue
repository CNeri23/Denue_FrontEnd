<template>
  <div class="denue-panel">
    <div class="header-orange">Área geográfica</div>
    
    <div class="tree-container" v-if="store">
      <div v-for="ent in store.entidades" :key="ent.Id" class="tree-item">
        <div class="row">
          <span class="toggle-btn" @click="handleToggleEntidad(ent)">
            {{ entidadAbierta === ent.Id ? '-' : '+' }}
          </span>
          <input 
            type="checkbox" 
            :checked="store.entidadSeleccionada === ent.Id"
            @change="handleToggleEntidad(ent)"
          >
          <span class="text-bold" @click="handleToggleEntidad(ent)">{{ ent.Nombre }}</span>
        </div>

        <div v-if="entidadAbierta === ent.Id" class="ml-4">
          <div v-if="store.cargando" class="loading">Cargando municipios...</div>
          
          <div v-for="mun in store.municipios" :key="mun.Id" class="tree-item">
            <div class="row">
              <span class="toggle-btn" @click="handleToggleMunicipio(mun)">
                {{ municipioAbierto === mun.Id ? '-' : '+' }}
              </span>
              <input 
                type="checkbox" 
                :checked="store.municipiosSeleccionados.includes(mun.Id)"
                @change="e => store.toggleMunicipioCascada(mun, e.target.checked)"
              >
              <span @click="handleToggleMunicipio(mun)">{{ mun.Nombre }}</span>
            </div>

            <div v-if="municipioAbierto === mun.Id" class="ml-8">
              <div v-for="loc in mun.Localidades" :key="loc.Id" class="row no-hover">
                <input 
                  type="checkbox" 
                  :value="loc.Id" 
                  v-model="store.localidadesSeleccionadas"
                >
                <span class="text-xs">{{ loc.Nombre }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="loading-msg">Cargando árbol geográfico...</div>

    <div class="footer-inputs">
      <div class="input-field">
        <label>AGEB (opcional)</label>
        <input type="text" v-model="store.ageb" maxlength="4" placeholder="000A">
      </div>
      <div class="input-field">
        <label>Manzana (opcional)</label>
        <input type="text" v-model="store.manzana" maxlength="3" placeholder="000">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDenueStore } from '../../store/denue'

const store = useDenueStore()

// Estados locales para la expansión visual del árbol
const entidadAbierta = ref(null)
const municipioAbierto = ref(null)

onMounted(() => {
  if (!store.entidades?.length) {
    store.cargarEntidades()
  }
})

async function handleToggleEntidad(ent) {
  if (entidadAbierta.value === ent.Id) {
    entidadAbierta.value = null
  } else {
    entidadAbierta.value = ent.Id
    store.entidadSeleccionada = ent.Id
    // Cargamos municipios y localidades de esa entidad
    await store.cargarArbolGeografico(ent.Id)
  }
}

function handleToggleMunicipio(mun) {
  municipioAbierto.value = municipioAbierto.value === mun.Id ? null : mun.Id
}
</script>

<style scoped>
.denue-panel { border: 1px solid #ccc; background: #fff; }
.header-orange { background: #f0ad4e; color: white; padding: 6px 10px; font-weight: bold; font-size: 14px; }
.tree-container { height: 300px; overflow-y: auto; padding: 5px; background: #fff; }
.row { display: flex; align-items: center; gap: 8px; padding: 3px 5px; cursor: pointer; font-size: 12px; color: #333; }
.row:hover { background: #f5f5f5; }
.no-hover:hover { background: transparent; }
.toggle-btn { 
  width: 16px; height: 16px; border: 1px solid #999; 
  display: flex; align-items: center; justify-content: center; 
  background: #eee; font-size: 11px; font-weight: bold; 
}
.ml-4 { margin-left: 18px; border-left: 1px dotted #ccc; }
.ml-8 { margin-left: 25px; }
.text-bold { font-weight: bold; }
.text-xs { font-size: 11px; }
.loading { font-size: 11px; padding: 5px; color: #888; font-style: italic; }
.loading-msg { padding: 20px; font-size: 12px; color: #666; }
.footer-inputs { display: flex; gap: 10px; padding: 10px; background: #f8f8f8; border-top: 1px solid #ddd; }
.input-field label { display: block; font-size: 10px; color: #777; margin-bottom: 2px; }
.input-field input { width: 85px; padding: 4px; border: 1px solid #ccc; font-size: 12px; }
</style>