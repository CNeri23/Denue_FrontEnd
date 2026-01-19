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

    // Sectores base del DENUE para iniciar el árbol
    sectoresBase: [
      { Clave: '11', Nombre: 'Agricultura, cría y explotación de animales...' },
      { Clave: '21', Nombre: 'Minería' },
      { Clave: '22', Nombre: 'Generación, transmisión y dist...' },
      { Clave: '23', Nombre: 'Construcción' },
      { Clave: '31-33', Nombre: 'Industrias manufactureras' },
      // Agrega los demás sectores según el catálogo oficial
    ],
    arbolActividades: {}, // Aquí guardaremos los hijos cargados: { '11': [datos_del_back] }
    actividadesSeleccionadas: [],
    
    ageb: '',
    manzana: '',
    cargando: false
  }),

  actions: {
    // --- LÓGICA DE ACTIVIDADES ---
    async cargarHijosActividad(nivel, clave) {
      if (this.arbolActividades[clave]) return; // Evitar recargar si ya existe
      
      this.cargando = true;
      try {
        const res = await fetch(`${BASE}/actividad/arbol/${nivel}/${clave}`);
        const result = await res.json();
        if (result.status === 200) {
          // Guardamos los hijos directamente asociados a la clave del padre
          this.arbolActividades[clave] = result.data;
        }
      } catch (e) {
        console.error("Error cargando hijos de actividad:", e);
      } finally {
        this.cargando = false;
      }
    },

    // Selección recursiva (Padre marca a todos los hijos)
    seleccionarRecursivo(nodos, checked) {
      nodos.forEach(nodo => {
        const index = this.actividadesSeleccionadas.indexOf(nodo.Clave);
        
        if (checked && index === -1) {
          this.actividadesSeleccionadas.push(nodo.Clave);
        } else if (!checked && index > -1) {
          this.actividadesSeleccionadas.splice(index, 1);
        }

        // Si tiene hijos cargados en el objeto Children del back, procesarlos
        if (nodo.Children && nodo.Children.length > 0) {
          this.seleccionarRecursivo(nodo.Children, checked);
        }
      });
    },

    // --- LÓGICA GEOGRÁFICA ---
    async cargarEntidades() {
      const res = await getEntidades();
      this.entidades = res.data?.map(e => ({ Id: e.ClaveEntidad, Nombre: e.NombreEntidad.trim() })) || [];
    },

    async cargarArbolGeografico(idEntidad) {
      const res = await fetch(`${BASE}/municipio/arbol/${idEntidad}`);
      const result = await res.json();
      if (result.status === 200) {
        this.municipios = result.data.map(m => ({
          Id: m.Clave,
          Nombre: m.Nombre.trim(),
          Localidades: m.Localidades || []
        }));
      }
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