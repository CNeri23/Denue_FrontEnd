<template>
  <div class="denue-panel">
    <div class="flex gap-4">
      <div class="flex flex-col w-1/2">
        <label class="text-sm font-medium mb-1">AGEB</label>
        <input
          type="text"
          v-model="store.ageb"
          maxlength="4"
          class="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>

      <div class="flex flex-col w-1/2">
        <label class="text-sm font-medium mb-1">Manzana</label>
        <input
          type="text"
          v-model="store.manzana"
          maxlength="3"
          class="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDenueStore } from '../../store/denue'
const store = useDenueStore()
</script>

<style scoped>
.denue-panel { border: 1px solid #ccc; height: auto; }
.inputs-container { padding: 15px; display: flex; flex-direction: column; gap: 15px; }
.input-group label { display: block; font-size: 11px; color: #666; font-weight: bold; margin-bottom: 4px; }
.input-group input { width: 100%; border: 1px solid #ccc; padding: 6px; border-radius: 3px; box-sizing: border-box; }
.info { font-size: 11px; color: #999; font-style: italic; margin-top: 10px; }
</style>