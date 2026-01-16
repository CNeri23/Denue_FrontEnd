<template>
  <section class="barra">
    <FiltroActividad />
    <FiltroGeografico />
    <button @click="consultar">Consultar</button>
  </section>
</template>

<script setup>
import { useDenueStore } from '../../store/denue.js'
import { getUnidades } from '../../api/unidad.js'
import FiltroActividad from './actividad.vue'
import FiltroGeografico from './geografico.vue'

const store = useDenueStore()

async function consultar() {
  const res = await getUnidades({
    actividad: store.actividad?.Codigo,
    municipio: store.municipio?.Id,
    localidad: store.localidad?.Id,
    ageb: store.ageb,
    manzana: store.manzana
  })

  store.unidades = res.data
}
</script>
