import { BASE } from '../services/config'

/**
 * Obtener municipios paginados
 */
export async function getMunicipios({ limit = 20, page = 1 } = {}) {
  const res = await fetch(`${BASE}/municipio?limit=${limit}&page=${page}`)
  if (!res.ok) {
    throw new Error('Error al obtener municipios')
  }
  return await res.json()
}

/**
 * Obtener un municipio por ID
 */
export async function getMunicipioById(id) {
  const res = await fetch(`${BASE}/municipio/${id}`)
  if (!res.ok) {
    throw new Error(`Error al obtener municipio con ID ${id}`)
  }
  return await res.json()
}

/**
 * Obtener municipios por entidad federativa
 */
export async function getMunicipiosByEntidad(idEntidad) {
  const res = await fetch(`${BASE}/municipio/por-entidad/${idEntidad}`)
  if (!res.ok) {
    throw new Error('Error al obtener municipios por entidad')
  }
  return await res.json()
}

/**
 * Alias específico para Estado de México
 */
export async function getMunicipiosEdomex() {
  return getMunicipiosByEntidad(15)
}

export async function getEntidades() {
  const res = await fetch(`${BASE}/entidadFederativa`) 
  if (!res.ok) {
    throw new Error('Error al obtener entidades federativas')
  }
  return await res.json()
} // Sin la coma aquí si es un archivo de exportación pura