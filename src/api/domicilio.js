import { BASE } from '../services/config'

/**
 * Obtener domicilios (listado con paginación)
 * @param {Object} params { page, limit }
 */
export async function getDomicilios(params = {}) {
  const qs = new URLSearchParams(params).toString()
  const url = qs
    ? `${BASE}/domicilio?${qs}`
    : `${BASE}/domicilio`

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Error al obtener domicilios')
  }

  return await res.json()
}

/**
 * Obtener domicilio por ID
 */
export async function getDomicilioById(id) {
  const res = await fetch(`${BASE}/domicilio/${id}`)

  if (!res.ok) {
    throw new Error('Error al obtener el domicilio')
  }

  return await res.json()
}

/**
 * Obtener domicilios por código postal
 */
export async function getDomiciliosByCP(cp) {
  const res = await fetch(`${BASE}/domicilio/cp/${cp}`)

  if (!res.ok) {
    throw new Error('Error al obtener domicilios por código postal')
  }

  return await res.json()
}
