<template>
  <div class="contenedor-principal">
    <div class="filtros-horizontales">
      
      <div class="columna-filtro">
        <button class="btn-desplegable" @click="togglePanel('actividades')">
          Actividad económica <span class="flecha">{{ showActividades ? '▲' : '▼' }}</span>
        </button>
        <div v-if="showActividades" class="panel-flotante">
          <Actividad />
        </div>
      </div>

      <div class="columna-filtro">
        <button class="btn-desplegable" @click="togglePanel('geografia')">
          Área geográfica <span class="flecha">{{ showGeografia ? '▲' : '▼' }}</span>
        </button>
        <div v-if="showGeografia" class="panel-flotante">
          <Geografico />
        </div>
      </div>

      <div class="columna-filtro">
        <button class="btn-desplegable" @click="togglePanel('personal')">
          Tamaño del establecimiento <span class="flecha">{{ showPersonal ? '▲' : '▼' }}</span>
        </button>
        <div v-if="showPersonal" class="panel-flotante">
          <Personal />
        </div>
      </div>

      <div class="columna-filtro">
        <AgebManzana />
      </div>

      <div class="columna-filtro columna-boton">
        <button class="btn-consultar-principal" @click="consultar" :disabled="store.cargando">
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

// Estados para controlar la visibilidad de los paneles
const showActividades = ref(false)
const showGeografia = ref(false)
const showPersonal = ref(false)

// Función para alternar paneles (cierra los demás al abrir uno)
const togglePanel = (panel) => {
  showActividades.value = panel === 'actividades' ? !showActividades.value : false
  showGeografia.value = panel === 'geografia' ? !showGeografia.value : false
  showPersonal.value = panel === 'personal' ? !showPersonal.value : false
}

async function consultar() {
  // Cerrar paneles abiertos al iniciar la consulta
  showActividades.value = false
  showGeografia.value = false
  showPersonal.value = false

  const filtros = {
    actividades: store.actividadesSeleccionadas,
    entidad: store.entidadSeleccionada,
    municipios: store.municipiosSeleccionados,
    localidades: store.localidadesSeleccionadas,
    personal: store.personalSeleccionado,
    ageb: store.ageb || null,
    manzana: store.manzana || null
  }

  try {
    store.cargando = true
    const res = await getUnidades(filtros)
    store.unidades = res.data?.data ?? []
  } catch (e) {
    console.error('Error en la consulta:', e)
  } finally {
    store.cargando = false
  }
}
</script>

<style scoped>
.contenedor-principal { 
  padding: 10px; 
  background: #fff; 
  position: relative; 
  z-index: 1000; 
}

.filtros-horizontales { 
  display: flex; 
  gap: 10px; 
  align-items: flex-start; 
}

.columna-filtro { 
  flex: 1; 
  position: relative; 
}

.columna-boton { 
  flex: 0 0 150px; 
}

.btn-desplegable {
  width: 100%; 
  padding: 10px; 
  background: #f8f9fa; 
  border: 1px solid #ddd;
  text-align: left; 
  font-weight: bold; 
  cursor: pointer; 
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.panel-flotante {
  position: absolute; 
  top: 100%; 
  left: 0; 
  width: 100%;
  background: white; 
  border: 1px solid #ccc; 
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 1001; 
  margin-top: 5px;
}

.btn-consultar-principal {
  width: 100%; 
  padding: 10px; 
  background: #2c3e50; 
  color: white;
  border: none; 
  border-radius: 4px; 
  font-weight: bold; 
  cursor: pointer;
}

.btn-consultar-principal:disabled {
  background: #95a5a6;
  cursor: not-allowed;
}

.flecha {
  font-size: 0.8em;
}
</style>