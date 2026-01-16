import { BASE } from '../services/config'

export async function buscarActividad(q) {
  const res = await fetch(`${BASE}/actividad/buscar?q=${q}`)
  return res.json()
}

export async function obtenerArbol(nivel, clave) {
  const res = await fetch(`${BASE}/actividad/arbol/${nivel}/${clave}`)
  return res.json()
}
