import { BASE } from '../services/config'

export async function getUnidades(params = {}) {
  const qs = new URLSearchParams(params).toString()
  const res = await fetch(`${BASE}/unidad?${qs}`)
  return res.json()
}
