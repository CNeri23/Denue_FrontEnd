<template>
  <select v-model="store.municipio">
    <option value="">Municipio</option>
    <option v-for="m in municipios" :key="m.Id" :value="m">
      {{ m.Nombre }}
    </option>
  </select>

  <select v-model="store.localidad" :disabled="!store.municipio">
    <option value="">Localidad</option>
    <option v-for="l in localidades" :key="l.Id" :value="l">
      {{ l.Nombre }}
    </option>
  </select>

  <input v-model="store.ageb" placeholder="AGEB (4)" maxlength="4" />
  <input v-model="store.manzana" placeholder="Manzana (3)" maxlength="3" />
</template>

<script setup>
import { ref, watch } from 'vue'
import { useDenueStore } from '../../store/denue.js'
import { getMunicipiosEdomex } from '../../api/municipio'
import { getLocalidadesByMunicipio } from '../../api/localidad'

const store = useDenueStore()
const municipios = ref([])
const localidades = ref([])

getMunicipiosEdomex().then(r => municipios.value = r.data)

watch(() => store.municipio, async (m) => {
  store.localidad = null
  if (m) {
    const res = await getLocalidadesByMunicipio(m.Id)
    localidades.value = res.data
  }
})
</script>
