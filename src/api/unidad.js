import { BASE } from '../services/config'

export async function getUnidades(params = {}) {
  const qs = new URLSearchParams(params).toString()
  const url = qs ? `${BASE}/unidad?${qs}` : `${BASE}/unidad`

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Error al obtener las unidades económicas')
  }

  return await res.json()
}

export async function getUnidadesMapa(params = {}) {
  const qs = new URLSearchParams(params).toString()
  const url = qs ? `${BASE}/unidad/mapa?${qs}` : `${BASE}/unidad/mapa`

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error('Error al obtener las unidades para el mapa')
  }

  return await res.json()
}

export async function getUnidadById(id) {
  const res = await fetch(`${BASE}/unidad/${id}`)

  if (!res.ok) {
    throw new Error('Error al obtener la unidad económica')
  }

  return await res.json()
}
