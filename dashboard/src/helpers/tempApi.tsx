export interface TempData {
  time: number
  temp: number
}

export const fetchTempData = async (
  from: number = 0,
  to: number = new Date().valueOf(),
): Promise<TempData[]> => {
  const response = await fetch(
    `${
      process.env.NODE_ENV !== 'production'
        ? 'http://localhost:3000/dev/temps'
        : 'https://api.iot.tomnuttall.dev/temps'
    }?from=${from}&to=${to}`,
  )
  const data = await response.json()
  return data
}
