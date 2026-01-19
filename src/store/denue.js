import { defineStore } from 'pinia'
import { getEntidades } from '../api/municipio'
import { BASE } from '../services/config'

export const useDenueStore = defineStore('denue', {
  state: () => ({
    entidades: [],
    municipios: [],
    entidadSeleccionada: null,
    municipiosSeleccionados: [],
    localidadesSeleccionadas: [],

    // Sectores raíz para iniciar el árbol de actividades
    sectoresRaiz: [
      { Clave: '11', Nombre: 'Agricultura, cría y explotación de animales...' },
      { Clave: '21', Nombre: 'Minería' },
      { Clave: '22', Nombre: 'Generación, transmisión y dist. de energía...' },
      { Clave: '23', Nombre: 'Construcción' },
      { Clave: '31-33', Nombre: 'Industrias manufactureras' },
      { Clave: '43', Nombre: 'Comercio al por mayor' },
      { Clave: '46', Nombre: 'Comercio al por menor' }
    ],
    arbolActividades: {}, // Almacena hijos: { '11': [data], '111': [data] }
    actividadesSeleccionadas: [],
    
    ageb: '',
    manzana: '',
    cargando: false
  }),

  actions: {
    // CARGA DE ACTIVIDADES (Basado en tu Controller)
    async cargarHijosActividad(nivel, clave) {
      if (this.arbolActividades[clave]) return;
      this.cargando = true;
      try {
        const res = await fetch(`${BASE}/actividad/arbol/${nivel}/${clave}`);
        const result = await res.json();
        if (result.status === 200) {
          this.arbolActividades[clave] = result.data;
        }
      } catch (e) {
        console.error("Error en actividades:", e);
      } finally {
        this.cargando = false;
      }
    },

    // Selección en cascada recursiva
    seleccionarRecursivo(nodos, checked) {
      if (!nodos) return;
      nodos.forEach(nodo => {
        const index = this.actividadesSeleccionadas.indexOf(nodo.Clave);
        if (checked && index === -1) this.actividadesSeleccionadas.push(nodo.Clave);
        else if (!checked && index > -1) this.actividadesSeleccionadas.splice(index, 1);

        if (nodo.Children && nodo.Children.length > 0) {
          this.seleccionarRecursivo(nodo.Children, checked);
        }
      });
    },

    // GEOGRAFÍA
    async cargarEntidades() {
      const res = await getEntidades();
      this.entidades = res.data?.map(e => ({ Id: e.ClaveEntidad, Nombre: e.NombreEntidad.trim() })) || [];
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
            Localidades: m.Localidades || []
          }));
        }
      } finally { this.cargando = false; }
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
  }
})