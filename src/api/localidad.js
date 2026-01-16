import { BASE } from '../services/config'

export async function getLocalidadesByMunicipio(cveMun) {
  const res = await fetch(`${BASE}/localidad/municipio/${cveMun}`)
  return res.json()
}

export async function getLocalidadesByAgeb(ageb) {
  const res = await fetch(`${BASE}/localidad/ageb/${ageb}`)
  return res.json()
}

export async function getLocalidadesByManzana(manzana) {
  const res = await fetch(`${BASE}/localidad/manzana/${manzana}`)
  return res.json()
}

export async function filtrarAgebManzana(ageb, manzana) {
  const res = await fetch(`${BASE}/localidad/filtro/${ageb}/${manzana}`)
  return res.json()
}
