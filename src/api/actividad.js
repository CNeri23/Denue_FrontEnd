import { BASE } from '../services/config'

/**
 * Obtener actividades paginadas
 */
export async function getActividades({ limit = 10, page = 1 } = {}) {
  const res = await fetch(`${BASE}/actividad?limit=${limit}&page=${page}`)
  if (!res.ok) {
    throw new Error('Error al obtener actividades')
  }
  return await res.json()
}

/**
 * Obtener actividad por ID
 */
export async function getActividadById(id) {
  const res = await fetch(`${BASE}/actividad/${id}`)
  if (!res.ok) {
    throw new Error(`Error al obtener actividad con ID ${id}`)
  }
  return await res.json()
}

/**
 * Buscar actividades
 */
export async function buscarActividad(q) {
  if (!q) {
    throw new Error('El término de búsqueda es requerido')
  }

  const res = await fetch(`${BASE}/actividad/buscar?q=${encodeURIComponent(q)}`)
  if (!res.ok) {
    throw new Error('Error al buscar actividades')
  }

  return await res.json()
}

/**
 * Obtener árbol jerárquico de actividades
 * nivel: sector | subsector | rama | subrama
 */
export async function getArbolActividad(nivel, clave) {
  if (!nivel || !clave) {
    throw new Error('Nivel y clave son requeridos')
  }

  const res = await fetch(
    `${BASE}/actividad/arbol/${nivel}/${clave}`
  )

  if (!res.ok) {
    throw new Error('Error al obtener el árbol de actividades')
  }

  return await res.json()
}
