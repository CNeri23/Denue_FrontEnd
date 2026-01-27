import { defineStore } from 'pinia'
import { getEntidades } from '../api/municipio'
import { BASE } from '../services/config'

export const useDenueStore = defineStore('denue', {
  state: () => ({
    entidades: [],
    municipios: [],
    unidades: [],
    unidadSeleccionada: null,
    entidadSeleccionada: null,
    municipiosSeleccionados: [],
    localidadesSeleccionadas: [],
    personalSeleccionado: [],
    listadoPersonal: [],
    sectoresRaiz: [],
    arbolActividades: {},
    actividadesSeleccionadas: [],
    ageb: '',
    manzana: '',
    cargando: false
  }),

  actions: {
    async cargarSectoresRaiz() {
      if (this.sectoresRaiz.length > 0) return;
      this.cargando = true;
      try {
        const res = await fetch(`${BASE}/actividad/sectores`);
        const result = await res.json();
        if (result.status === 200) this.sectoresRaiz = result.data;
      } catch (e) {
        console.error("Error cargando sectores raíz:", e);
      } finally { this.cargando = false; }
    },

    getStreetViewUrl(lat, lng) {
      return `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${lat},${lng}&key=TU_API_KEY_AQUI`;
    },

    async cargarHijosActividad(nivel, clave) {
      if (this.arbolActividades[clave]) return;
      this.cargando = true;
      try {
        const res = await fetch(`${BASE}/actividad/arbol/${nivel}/${clave}`);
        const result = await res.json();
        if (result.status === 200) this.arbolActividades[clave] = result.data;
      } catch (e) {
        console.error("Error en actividades:", e);
      } finally { this.cargando = false; }
    },

    seleccionarRecursivo(nodos, checked) {
      if (!nodos) return;
      nodos.forEach(nodo => {
        const index = this.actividadesSeleccionadas.indexOf(nodo.Clave);
        if (checked && index === -1) {
          this.actividadesSeleccionadas.push(nodo.Clave);
        } else if (!checked && index > -1) {
          this.actividadesSeleccionadas.splice(index, 1);
        }
        if (nodo.Children?.length > 0) this.seleccionarRecursivo(nodo.Children, checked);
      });
    },

    async cargarPersonal() {
      try {
        const res = await fetch(`${BASE}/personal`);
        const result = await res.json();
        this.listadoPersonal = (result.data || []).map(p => ({
          Id: p.OcupacionPersonal, 
          Nombre: p.OcupacionPersonal
        }));
      } catch (e) { console.error("Error:", e); }
    },

    togglePersonal(id) {
      const index = this.personalSeleccionado.indexOf(id);
      index > -1 ? this.personalSeleccionado.splice(index, 1) : this.personalSeleccionado.push(id);
    },

    async cargarEntidades() {
      const res = await getEntidades();
      this.entidades = res.data?.map(e => ({ 
        Id: e.ClaveEntidad, 
        Nombre: e.NombreEntidad.trim() 
      })) || [];
    },

    async cargarArbolGeografico(idEntidad) {
      this.cargando = true;
      try {
        const res = await fetch(`${BASE}/municipio/arbol/${idEntidad}`);
        const result = await res.json();
        if (result.status === 200) {
          this.municipios = result.data.map(m => ({
            Id: m.Clave,
            Nombre: m.Nombre.trim(),
            Localidades: (m.Localidades || []).map(l => ({
              ...l,
              Id: `${m.Clave}${l.Id}`
            }))
          }));
        }
      } finally { this.cargando = false; }
    },

    toggleLocalidad(idUnico) {
      const index = this.localidadesSeleccionadas.indexOf(idUnico);
      index > -1 ? this.localidadesSeleccionadas.splice(index, 1) : this.localidadesSeleccionadas.push(idUnico);
    },

    toggleMunicipioCascada(mun, checked) {
      const locIds = mun.Localidades.map(l => l.Id);
      if (checked) {
        if (!this.municipiosSeleccionados.includes(mun.Id)) this.municipiosSeleccionados.push(mun.Id);
        locIds.forEach(id => { if (!this.localidadesSeleccionadas.includes(id)) this.localidadesSeleccionadas.push(id); });
      } else {
        this.municipiosSeleccionados = this.municipiosSeleccionados.filter(id => id !== mun.Id);
        this.localidadesSeleccionadas = this.localidadesSeleccionadas.filter(id => !locIds.includes(id));
      }
    }
  },

  async consultarUnidades(filtros) {
    this.cargando = true;
    try {
      const res = await fetch(`${BASE}/unidades?${new URLSearchParams(filtros)}`);
      const result = await res.json();
      // Al asignar result (que contiene .data), el watch del mapa se disparará
      this.unidades = result; 
    } catch (e) {
      console.error(e);
    } finally {
      this.cargando = false;
    }
  }
})