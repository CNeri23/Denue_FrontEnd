<template>
  <div class="campo">
    <label>Actividades</label>
    <ul>
      <li v-for="(subsectores, sector) in store.arbolActividades" :key="sector">
        <span @click="toggleSector(sector)">{{ sector }} <button @click.stop="toggleSector(sector)">+</button></span>
        <ul v-if="sectorDesplegado === sector">
          <li v-for="(ramas, subsector) in subsectores" :key="subsector">
            <span @click="toggleSubsector(subsector)">{{ subsector }} <button @click.stop="toggleSubsector(subsector)">+</button></span>
            <ul v-if="subsectorDesplegado === subsector">
              <li v-for="(subramas, rama) in ramas" :key="rama">
                <span @click="toggleRama(rama)">{{ rama }} <button @click.stop="toggleRama(rama)">+</button></span>
                <ul v-if="ramaDesplegada === rama">
                  <li v-for="subrama of subramas" :key="subrama.Id">
                    <input type="checkbox" :value="subrama" v-model="store.actividadesSeleccionadas"> {{ subrama.Nombre }}
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDenueStore } from '../../store/denue'

const store = useDenueStore()

const sectorDesplegado = ref(null)
const subsectorDesplegado = ref(null)
const ramaDesplegada = ref(null)

onMounted(() => {
  if (!store.actividades.length) store.cargarActividades()
})

function toggleSector(sec) { sectorDesplegado.value = sectorDesplegado.value === sec ? null : sec }
function toggleSubsector(sub) { subsectorDesplegado.value = subsectorDesplegado.value === sub ? null : sub }
function toggleRama(ram) { ramaDesplegada.value = ramaDesplegada.value === ram ? null : ram }
</script>
