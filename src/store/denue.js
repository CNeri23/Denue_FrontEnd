import { defineStore } from 'pinia'
import { getActividades } from '../api/actividad'
import { getMunicipiosEdomex } from '../api/municipio'
import { getLocalidadesByMunicipio } from '../api/localidad'

export const useDenueStore = defineStore('denue', {
  state: () => ({
    // catálogos
    entidad: { Id: 15, Nombre: 'Estado de México' },
    municipios: [], // { Id, Nombre, localidades: [] }

    // selecciones
    municipio: null,
    localidad: null,
    actividades: [],
    arbolActividades: [],
    actividadesSeleccionadas: [],

    // opcionales
    ageb: null,
    manzana: null,

    // resultado
    unidades: []
  }),

  actions: {
    // Actividades
    async cargarActividades() {
      if (this.actividades.length) return
      try {
        const res = await getActividades({ limit: 1000 })
        this.actividades = res.data?.map(a => ({
          Id: a.CodigoActividad,
          Nombre: a.NombreActividad.trim(),
          ClaveSector: a.ClaveSector,
          NombreSector: a.NombreSector.trim(),
          ClaveSubsector: a.ClaveSubsector,
          NombreSubsector: a.NombreSubsector.trim(),
          ClaveRama: a.ClaveRama,
          NombreRama: a.NombreRama.trim(),
          ClaveSubrama: a.ClaveSubrama,
          NombreSubrama: a.NombreSubrama.trim()
        })) ?? []

        const tree = {}
        this.actividades.forEach(a => {
          if (!tree[a.NombreSector]) tree[a.NombreSector] = {}
          if (!tree[a.NombreSector][a.NombreSubsector]) tree[a.NombreSector][a.NombreSubsector] = {}
          if (!tree[a.NombreSector][a.NombreSubsector][a.NombreRama]) tree[a.NombreSector][a.NombreSubsector][a.NombreRama] = []
          tree[a.NombreSector][a.NombreSubsector][a.NombreRama].push({ Id: a.Id, Nombre: a.NombreSubrama })
        })
        this.arbolActividades = tree
      } catch (e) {
        console.error('Error cargando actividades', e)
        this.actividades = []
      }
    },

    // Municipios
    async cargarMunicipios() {
      if (this.municipios.length) return
      try {
        const res = await getMunicipiosEdomex()
        this.municipios = res.data?.map(m => ({
          Id: m.IdMunicipio,
          Nombre: m.NombreMunicipio.trim(),
          localidades: [], // se llenarán al desplegar
        })) ?? []
      } catch (e) {
        console.error('Error cargando municipios', e)
        this.municipios = []
      }
    },

    // Localidades
    async cargarLocalidades(mun) {
      if (!mun) return
      try {
        const res = await getLocalidadesByMunicipio(mun.Id)
        mun.localidades = res.data?.map(l => ({
          Id: l.IdLocalidad,
          Nombre: l.NombreLocalidad.trim()
        })) ?? []
      } catch (e) {
        console.error('Error cargando localidades', e)
        mun.localidades = []
      }
    },

    // Selección jerárquica
    seleccionarMunicipio(mun) {
      this.municipio = mun
      this.localidad = null
      if (!mun.localidades.length) this.cargarLocalidades(mun)
    },
    seleccionarLocalidad(loc) {
      this.localidad = loc
    }
  }
})
