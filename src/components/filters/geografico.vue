<template>
  <div class="campo">
    <label>Municipios y Localidades</label>
    <ul>
      <li>
        <strong>{{ store.entidad.Nombre }}</strong>
        <ul>
          <li v-for="mun in store.municipios" :key="mun.Id">
            <span @click="toggleMunicipio(mun)" style="cursor:pointer">
              {{ mun.Nombre }} <button @click.stop="toggleMunicipio(mun)">+</button>
            </span>

            <!-- Localidades -->
            <ul v-if="mun.localidades.length && municipioDesplegado === mun">
              <li v-for="loc in mun.localidades" :key="loc.Id">
                <span
                  @click="store.seleccionarLocalidad(loc)"
                  :class="{ selected: store.localidad === loc }"
                >
                  {{ loc.Nombre }}
                </span>
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
const municipioDesplegado = ref(null)

onMounted(() => {
  if (!store.municipios.length) store.cargarMunicipios()
})

function toggleMunicipio(mun) {
  municipioDesplegado.value = municipioDesplegado.value === mun ? null : mun
  store.seleccionarMunicipio(mun)
}
</script>

<style>
.selected {
  font-weight: bold;
  color: blue;
}
ul {
  list-style-type: none;
  padding-left: 1em;
}
li button {
  margin-left: 0.5em;
}
</style>
