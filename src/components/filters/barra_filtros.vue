<template>
  <div class="filtros">
    <Actividad />
    <Geografico tipo="municipio" />
    <Geografico tipo="localidad" />
    <AgebManzana />

    <button @click="consultar">Consultar</button>
  </div>
</template>

<script setup>
import Actividad from './actividad.vue'
import Geografico from './geografico.vue'
import AgebManzana from './agebManzana.vue'

import { useDenueStore } from '../../store/denue'
import { getUnidades } from '../../api/unidad'

const store = useDenueStore()

async function consultar() {
  const filtros = {
    actividades: store.actividadesSeleccionadas.map(a => a.Id),
    municipio: store.municipio?.Id,
    localidad: store.localidad?.Id,
    ageb: store.ageb || null,
    manzana: store.manzana || null
  }

  try {
    const res = await getUnidades(filtros)
    store.unidades = res.data?.data ?? []
  } catch (e) {
    console.error('Error consultando unidades', e)
    store.unidades = []
  }
}
</script>
