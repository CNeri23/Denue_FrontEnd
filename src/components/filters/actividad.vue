<template>
  <div class="filter-panel">
    <div class="panel-header">
      <i class="icon-briefcase"></i>
      <span>Actividades Económicas</span>
    </div>
    
    <div class="scroll-container">
      <div v-for="(subsectores, sector) in store.arbolActividades" :key="sector" class="tree-node">
        <div class="node-row sector" @click="toggleSector(sector)">
          <span class="arrow" :class="{ rotated: sectorDesplegado === sector }">▶</span>
          <span class="text">{{ sector }}</span>
        </div>

        <div v-if="sectorDesplegado === sector" class="node-children">
          <div v-for="(ramas, subsector) in subsectores" :key="subsector">
            <div class="node-row subsector" @click="toggleSubsector(subsector)">
              <span class="arrow" :class="{ rotated: subsectorDesplegado === subsector }">▶</span>
              <span class="text">{{ subsector }}</span>
            </div>

            <div v-if="subsectorDesplegado === subsector" class="node-children">
              <div v-for="(subramas, rama) in ramas" :key="rama">
                <div class="node-row rama" @click="toggleRama(rama)">
                  <span class="arrow" :class="{ rotated: ramaDesplegada === rama }">▶</span>
                  <span class="text">{{ rama }}</span>
                </div>

                <div v-if="ramaDesplegada === rama" class="node-children">
                  <label v-for="subrama in subramas" :key="subrama.Id" class="checkbox-item">
                    <input type="checkbox" :value="subrama" v-model="store.actividadesSeleccionadas">
                    <span class="custom-check"></span>
                    <span class="label-text">{{ subrama.Nombre }}</span>
                  </label>
                </div>
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
const sectorDesplegado = ref(null)
const subsectorDesplegado = ref(null)
const ramaDesplegada = ref(null)

onMounted(() => { if (!store.actividades.length) store.cargarActividades() })

function toggleSector(sec) { sectorDesplegado.value = sectorDesplegado.value === sec ? null : sec }
function toggleSubsector(sub) { subsectorDesplegado.value = subsectorDesplegado.value === sub ? null : sub }
function toggleRama(ram) { ramaDesplegada.value = ramaDesplegada.value === ram ? null : ram }
</script>