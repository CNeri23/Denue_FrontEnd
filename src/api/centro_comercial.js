import { BASE } from '../services/config'

/**
 * Obtener centros comerciales (listado con paginación)
 * @param {Object} params { page, limit }
 */
export async function getCentrosComerciales(params = {}) {
  const qs = new URLSearchParams(params).toString()
  const url = qs
    ? `${BASE}/centrocomercial?${qs}`
    : `${BASE}/centrocomercial`

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Error al obtener los centros comerciales')
  }

  return await res.json()
}

/**
 * Obtener centro comercial por ID
 */
export async function getCentroComercialById(id) {
  const res = await fetch(`${BASE}/centrocomercial/${id}`)

  if (!res.ok) {
    throw new Error('Error al obtener el centro comercial')
  }

  return await res.json()
}

/**
 * Buscar centros comerciales (autocomplete)
 */
export async function buscarCentroComercial(q) {
  const res = await fetch(`${BASE}/centrocomercial/buscar?q=${encodeURIComponent(q)}`)

  if (!res.ok) {
    throw new Error('Error al buscar centros comerciales')
  }

  return await res.json()
}
