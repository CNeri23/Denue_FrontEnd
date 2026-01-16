<template>
  <input
    placeholder="Buscar actividad económica"
    v-model="q"
    @input="buscar"
  />

  <ul v-if="resultados.length">
    <li v-for="a in resultados" :key="a.codigo_act" @click="seleccionar(a)">
      {{ a.nombre_act }}
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'
import { buscarActividad } from '../../api/actividad.js'
import { useDenueStore } from '../../store/denue.js'

const store = useDenueStore()
const q = ref('')
const resultados = ref([])

async function buscar() {
  if (q.value.length < 3) return
  const res = await buscarActividad(q.value)
  resultados.value = res.data
}

function seleccionar(a) {
  store.actividad = a
  resultados.value = []
}
</script>
