import { BASE } from '../services/config'

export async function getMunicipiosEdomex() {
  const res = await fetch(`${BASE}/municipiosPorEntidad/15`)
  return res.json()
}