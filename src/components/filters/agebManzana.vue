<template>
  <div class="campo">
    <label>AGEB (opcional)</label>
    <input
      type="text"
      :value="store.ageb || ''"
      @input="store.ageb = $event.target.value || null"
    />

    <label>Manzana (opcional)</label>
    <input
      type="text"
      :value="store.manzana || ''"
      @input="store.manzana = $event.target.value || null"
    />
  </div>
</template>

<script setup>
import { useDenueStore } from '../../store/denue'
const store = useDenueStore()
</script>
