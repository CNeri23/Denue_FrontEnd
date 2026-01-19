import { BASE } from '../services/config'

export async function getLocalidadesByMunicipio(idMunicipio) {
  const res = await fetch(`${BASE}/localidad/municipio/${idMunicipio}`)

  if (!res.ok) {
    throw new Error('Error al obtener localidades por municipio')
  }

  return await res.json()
}

export async function getLocalidadesByAgeb(ageb) {
  const res = await fetch(`${BASE}/localidad/ageb/${ageb}`)

  if (!res.ok) {
    throw new Error('Error al obtener localidades por AGEB')
  }

  return await res.json()
}

export async function getLocalidadesByManzana(manzana) {
  const res = await fetch(`${BASE}/localidad/manzana/${manzana}`)

  if (!res.ok) {
    throw new Error('Error al obtener localidades por manzana')
  }

  return await res.json()
}

export async function filtrarAgebManzana(ageb, manzana) {
  const res = await fetch(`${BASE}/localidad/filtro/${ageb}/${manzana}`)

  if (!res.ok) {
    throw new Error('Error al filtrar localidades por AGEB y manzana')
  }

  return await res.json()
}

export async function getLocalidades() {
  const res = await fetch(`${BASE}/localidad`)

  if (!res.ok) {
    throw new Error('Error al obtener localidades')
  }

  return await res.json()
}

export async function getLocalidadById(id) {
  const res = await fetch(`${BASE}/localidad/${id}`)

  if (!res.ok) {
    throw new Error('Error al obtener la localidad')
  }

  return await res.json()
}
