<template>
  <div class="node-wrapper">
    <div class="row">
      <span v-if="nodo.Children && nodo.Children.length" class="toggle-btn" @click="abierto = !abierto">
        {{ abierto ? '-' : '+' }}
      </span>
      <span v-else class="spacer"></span>

      <input 
        type="checkbox" 
        :value="nodo.Clave" 
        v-model="store.actividadesSeleccionadas"
        @change="e => store.seleccionarRecursivo(nodo.Children, e.target.checked)"
      >
      <span class="node-text">({{ nodo.Clave }}) {{ nodo.Nombre }}</span>
    </div>

    <div v-if="abierto && nodo.Children" class="indent">
      <ActividadNodo 
        v-for="hijo in nodo.Children" 
        :key="hijo.Clave" 
        :nodo="hijo" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDenueStore } from '../../store/denue';

const props = defineProps({ nodo: Object });
const store = useDenueStore();
const abierto = ref(false);
</script>

<style scoped>
.row { display: flex; align-items: center; gap: 6px; padding: 2px 0; white-space: nowrap; }
.indent { margin-left: 18px; border-left: 1px dotted #bbb; }
.toggle-btn { width: 14px; height: 14px; border: 1px solid #aaa; display: flex; align-items: center; justify-content: center; font-size: 10px; background: #fff; cursor: pointer; }
.spacer { width: 14px; }
.node-text { font-size: 11px; color: #444; }
</style>