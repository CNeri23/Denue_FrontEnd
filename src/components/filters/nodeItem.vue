<template>
  <div class="tree-node">
    <div class="row">
      <span v-if="nodo.Children" class="toggle-btn" @click="abierto = !abierto">
        {{ abierto ? '-' : '+' }}
      </span>
      <span v-else class="indent"></span>
      
      <input 
        type="checkbox" 
        :value="nodo.Clave" 
        v-model="store.actividadesSeleccionadas"
        @change="e => checkHijos(e.target.checked)"
      >
      <span :class="{'text-xs': nodo.Type === 'Actividad'}">{{ nodo.Nombre }}</span>
    </div>

    <div v-if="abierto && nodo.Children" class="ml-4">
      <NodeItem 
        v-for="hijo in nodo.Children" 
        :key="hijo.Clave" 
        :nodo="hijo" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDenueStore } from '../../store/denue'

const props = defineProps(['nodo'])
const store = useDenueStore()
const abierto = ref(false)

function checkHijos(checked) {
  if (props.nodo.Children) {
    store.seleccionarRecursivo(props.nodo.Children, checked)
  }
}
</script>

<style scoped>
.row { display: flex; align-items: center; gap: 6px; padding: 2px 0; font-size: 12px; }
.toggle-btn { width: 14px; height: 14px; border: 1px solid #999; display: flex; align-items: center; justify-content: center; background: #eee; cursor: pointer; }
.ml-4 { margin-left: 15px; border-left: 1px dotted #ccc; }
.indent { width: 14px; }
.text-xs { font-size: 11px; color: #555; }
</style>