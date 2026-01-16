import { defineStore } from 'pinia'

export const useDenueStore = defineStore('denue', {
  state: () => ({
    actividad: null,
    municipio: null,
    localidad: null,
    ageb: null,
    manzana: null,
    unidades: []
  }),

  actions: {
    resetGeo() {
      this.municipio = null
      this.localidad = null
      this.ageb = null
      this.manzana = null
    }
  }
})
