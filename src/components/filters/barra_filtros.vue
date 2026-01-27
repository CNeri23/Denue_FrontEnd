<template>
  <div class="contenedor-principal">
    <div class="filtros-horizontales">
      
      <div class="columna-filtro">
        <button class="btn-desplegable" @click="togglePanel('actividades')">
          Actividad económica 
          <span class="flecha">{{ showActividades ? '▲' : '▼' }}</span>
        </button>
        <div v-if="showActividades" class="panel-flotante">
          <Actividad />
        </div>
      </div>

      <div class="columna-filtro">
        <button class="btn-desplegable" @click="togglePanel('geografia')">
          Área geográfica 
          <span class="flecha">{{ showGeografia ? '▲' : '▼' }}</span>
        </button>
        <div v-if="showGeografia" class="panel-flotante">
          <Geografico />
        </div>
      </div>

      <div class="columna-filtro">
        <button class="btn-desplegable" @click="togglePanel('personal')">
          Tamaño del establecimiento 
          <span class="flecha">{{ showPersonal ? '▲' : '▼' }}</span>
        </button>
        <div v-if="showPersonal" class="panel-flotante">
          <Personal />
        </div>
      </div>

      <div class="columna-filtro">
        <AgebManzana />
      </div>

      <div class="columna-filtro columna-boton">
        <button 
          class="btn-consultar-principal" 
          @click="consultar" 
          :disabled="store.cargando"
        >
          <span v-if="store.cargando" class="loader"></span>
          {{ store.cargando ? 'Cargando...' : 'Consultar' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Actividad from './actividad.vue'
import Personal from './personal.vue'
import Geografico from './geografico.vue'
import AgebManzana from './agebManzana.vue'
import { useDenueStore } from '../../store/denue'
import { getUnidades } from '../../api/unidad'

const store = useDenueStore()

const showActividades = ref(false)
const showGeografia = ref(false)
const showPersonal = ref(false)

const togglePanel = (panel) => {
  showActividades.value = panel === 'actividades' ? !showActividades.value : false
  showGeografia.value = panel === 'geografia' ? !showGeografia.value : false
  showPersonal.value = panel === 'personal' ? !showPersonal.value : false
}

async function consultar() {
  showActividades.value = false
  showGeografia.value = false
  showPersonal.value = false
  
  store.unidadSeleccionada = null

  const params = {
    actividad: store.actividadesSeleccionadas.join(','),
    cve_ent: store.entidadSeleccionada,
    municipio: store.municipiosSeleccionados.join(','),
    localidad: store.localidadesSeleccionadas.join(','), 
    per_ocu: store.personalSeleccionado.join(','),
    ageb: store.ageb,
    manzana: store.manzana,
    q: store.searchQuery 
  }

  const filtrosLimpios = Object.fromEntries(
    Object.entries(params).filter(([_, value]) => 
      value !== null && 
      value !== undefined && 
      value !== '' && 
      value !== 'null'
    )
  )

  try {
    store.cargando = true;
    const res = await getUnidades(filtrosLimpios);
    
    // Axios entrega el JSON del servidor en res.data
    if (res.data && Array.isArray(res.data.data)) {
      // GUARDAMOS EL OBJETO COMPLETO
      store.unidades = res.data; 
      console.log(`Éxito: Se encontraron ${res.data.data.length} unidades.`);
    } else {
      store.unidades = { data: [] };
      console.warn("La respuesta no tiene el formato esperado o está vacía.");
    }

  } catch (e) {
    console.error('Error en la petición:', e);
    store.unidades = { data: [] };
  } finally {
    store.cargando = false;
  }
}
</script>

<style scoped>
.contenedor-principal { 
  padding: 15px; 
  background: #ffffff; 
  border-bottom: 1px solid #eaeaea;
  position: relative; 
  z-index: 1000; 
}

.filtros-horizontales { 
  display: flex; 
  gap: 12px; 
  align-items: flex-start; 
}

.columna-filtro { 
  flex: 1; 
  position: relative; 
}

.columna-boton { 
  flex: 0 0 160px; 
}

.btn-desplegable {
  width: 100%; 
  padding: 12px; 
  background: #fdfdfd; 
  border: 1px solid #d1d1d1;
  text-align: left; 
  font-weight: 600; 
  color: #444;
  cursor: pointer; 
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: border-color 0.2s;
}

.btn-desplegable:hover {
  border-color: #2c3e50;
  background: #fff;
}

.panel-flotante {
  position: absolute; 
  top: 110%; 
  left: 0; 
  width: 100%;
  min-width: 280px;
  background: white; 
  border: 1px solid #ddd; 
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  border-radius: 8px;
  z-index: 2000; 
  overflow: hidden;
}

.btn-consultar-principal {
  width: 100%; 
  padding: 12px; 
  background: #2c3e50; 
  color: white;
  border: none; 
  border-radius: 6px; 
  font-weight: bold; 
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.3s;
}

.btn-consultar-principal:hover:not(:disabled) {
  background: #1a252f;
}

.btn-consultar-principal:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.flecha {
  font-size: 0.7em;
  color: #7f8c8d;
}

.loader {
  width: 14px;
  height: 14px;
  border: 2px solid #FFF;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>