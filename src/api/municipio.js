import { BASE } from '../services/config'

// ... (tus otras funciones se mantienen)

/**
 * NUEVA: Obtener árbol completo (Municipios + Localidades)
 * Ruta en backend: api/municipio/arbol/([0-9]+)
 */
export async function getArbolGeografico(idEntidad) {
  const res = await fetch(`${BASE}/municipio/arbol/${idEntidad}`)
  if (!res.ok) {
    throw new Error('Error al obtener el árbol geográfico')
  }
  return await res.json()
}

export async function getEntidades() {
  const res = await fetch(`${BASE}/entidadFederativa`) 
  if (!res.ok) {
    throw new Error('Error al obtener entidades federativas')
  }
  return await res.json()
}