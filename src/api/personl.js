import { BASE } from '../services/config'

/**
 * Obtener personal (listado con paginación)
 * @param {Object} params { page, limit }
 */
export async function getPersonal(params = {}) {
  const qs = new URLSearchParams(params).toString()
  const url = qs
    ? `${BASE}/personal?${qs}`
    : `${BASE}/personal`

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Error al obtener el personal')
  }

  return await res.json()
}

/**
 * Obtener personal por ID
 */
export async function getPersonalById(id) {
  const res = await fetch(`${BASE}/personal/${id}`)

  if (!res.ok) {
    throw new Error('Error al obtener el registro de personal')
  }

  return await res.json()
}
