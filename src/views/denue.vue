<template>
  <div class="denue-page">
    <BarraFiltros />
    
    <div class="layout-contenedor">
      <div class="mapa-wrapper">
        <Mapa />
      </div>

      <Transition name="slide">
        <div v-if="store.unidadSeleccionada" class="panel-lateral">
          <button class="close-btn" @click="store.unidadSeleccionada = null">×</button>
          <h3>Detalles del Establecimiento</h3>
          <hr>
          <div class="info">
            <p><strong>Nombre:</strong> {{ store.unidadSeleccionada.nombreEstablecimiento }}</p>
            <p><strong>Actividad:</strong> {{ store.unidadSeleccionada.act_nombre }}</p>
            <p><strong>Tamaño:</strong> {{ store.unidadSeleccionada.personalOcupado }}</p>
            <p><strong>Dirección:</strong> {{ store.unidadSeleccionada.nom_vial }} #{{ store.unidadSeleccionada.numero_ext }}</p>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import BarraFiltros from '../components/filters/barra_filtros.vue'
import Mapa from '../components/map/mapa.vue'
import { useDenueStore } from '../store/denue'

const store = useDenueStore()
</script>

<style scoped>
.denue-page { max-width: 100vw; padding: 10px; }
.layout-contenedor { display: flex; position: relative; height: 80vh; gap: 10px; margin-top: 10px; }
.mapa-wrapper { flex: 1; z-index: 1; }
.panel-lateral { 
  width: 350px; 
  background: white; 
  border: 1px solid #ccc; 
  box-shadow: -2px 0 10px rgba(0,0,0,0.1); 
  padding: 20px; 
  z-index: 10;
  overflow-y: auto;
}
.close-btn { float: right; cursor: pointer; border: none; background: none; font-size: 20px; }

/* Animación simple */
.slide-enter-active, .slide-leave-active { transition: all 0.3s ease; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); opacity: 0; }
</style>