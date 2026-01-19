import { defineStore } from 'pinia'
import { getActividades } from '../api/actividad'
import { getEntidades, getMunicipiosByEntidad } from '../api/municipio'
import { getLocalidadesByMunicipio } from '../api/localidad'

export const useDenueStore = defineStore('denue', {
  state: () => ({
    // Catálogos base
    entidades: [],
    municipios: [], // Estructura: [{ Id, Nombre, localidades: [] }]

    // Selecciones actuales
    entidad: null,
    municipio: null,
    localidad: null,

    // Actividades
    actividades: [],
    arbolActividades: {},
    actividadesSeleccionadas: [],

    // Filtros opcionales
    ageb: null,
    manzana: null,

    // Resultados de la consulta final
    unidades: [],
    cargando: false
  }),

  actions: {
    // --- SECCIÓN ENTIDADES ---
    async cargarEntidades() {
      try {
        const res = await getEntidades();
        // Ajuste según tu respuesta de Postman:
        this.entidades = res.data?.map(e => ({
          Id: e.id_entidad,      // <--- Aquí estaba el error, antes decía 'Id'
          Nombre: e.NombreEntidad // <--- Ajustado a 'NombreEntidad'
        })) ?? [];
        console.log("Entidades procesadas con éxito:", this.entidades);
      } catch (e) {
        console.error('Error al cargar entidades:', e);
      }
    },

    async seleccionarEntidad(ent) {
      // Ahora ent.Id ya no será undefined porque lo mapeamos arriba
      if (!ent || !ent.Id) {
        console.error("ID de entidad sigue siendo inválido:", ent);
        return;
      }
      this.entidad = ent;
      this.municipio = null;
      this.localidad = null;
      this.municipios = []; 
      await this.cargarMunicipios(ent.Id); 
    },

    // --- SECCIÓN MUNICIPIOS ---
    async cargarMunicipios(entidadId) {
      this.cargando = true;
      try {
        const res = await getMunicipiosByEntidad(entidadId);
        
        // Tu JSON tiene la data en res.data
        const listaOriginal = res.data || [];

        this.municipios = listaOriginal.map(m => ({
          // Ajuste según tu JSON real:
          Id: m.IdMunicipio, 
          Nombre: m.NombreMunicipio.trim(),
          localidades: [] 
        }));
        
        console.log("Municipios procesados:", this.municipios);
      } catch (e) {
        console.error('Error al cargar municipios:', e);
        this.municipios = [];
      } finally {
        this.cargando = false;
      }
    },

    async cargarLocalidades(mun) {
      if (!mun || (mun.localidades && mun.localidades.length > 0)) return;
      
      try {
        const res = await getLocalidadesByMunicipio(mun.Id);
        const listaLoc = res.data || [];
        
        const index = this.municipios.findIndex(m => m.Id === mun.Id);
        if (index !== -1) {
          this.municipios[index].localidades = listaLoc.map(l => ({
            // Revisa si en localidades también usas Mayúsculas:
            Id: l.IdLocalidad || l.id,
            Nombre: (l.NombreLocalidad || l.nombre || '').trim()
          }));
        }
      } catch (e) {
        console.error('Error al cargar localidades:', e);
      }
    },

    // --- SECCIÓN ACTIVIDADES (ÁRBOL) ---
    async cargarActividades() {
      if (this.actividades.length > 0) return
      
      try {
        const res = await getActividades({ limit: 1000 })
        const data = res.data ? res.data : res
        
        this.actividades = data.map(a => ({
          Id: a.CodigoActividad,
          Nombre: a.NombreActividad.trim(),
          NombreSector: a.NombreSector.trim(),
          NombreSubsector: a.NombreSubsector.trim(),
          NombreRama: a.NombreRama.trim(),
          NombreSubrama: a.NombreSubrama.trim()
        }))

        // Construcción del árbol jerárquico
        const tree = {}
        this.actividades.forEach(a => {
          if (!tree[a.NombreSector]) tree[a.NombreSector] = {}
          if (!tree[a.NombreSector][a.NombreSubsector]) tree[a.NombreSector][a.NombreSubsector] = {}
          if (!tree[a.NombreSector][a.NombreSubsector][a.NombreRama]) tree[a.NombreSector][a.NombreSubsector][a.NombreRama] = []
          
          // Evitar duplicados en el último nivel
          const existe = tree[a.NombreSector][a.NombreSubsector][a.NombreRama].some(s => s.Id === a.Id)
          if (!existe) {
            tree[a.NombreSector][a.NombreSubsector][a.NombreRama].push({ 
              Id: a.Id, 
              Nombre: a.NombreSubrama 
            })
          }
        })
        this.arbolActividades = tree
      } catch (e) {
        console.error('Error al cargar actividades:', e)
      }
    },

    seleccionarMunicipio(mun) {
      this.municipio = mun
      this.localidad = null
      this.cargarLocalidades(mun)
    },

    seleccionarLocalidad(loc) {
      this.localidad = loc
    }
  }
})