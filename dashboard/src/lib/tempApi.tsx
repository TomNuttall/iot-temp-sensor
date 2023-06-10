export interface TempData {
  time: number
  temp: number
}

export const TempApiEndpoints = {
  local: 'http://localhost:3000/dev',
  live: 'https://api.iot.tomnuttall.dev',
}

export class TempApi {
  public static isLocalHost(): boolean {
    return process.env.NODE_ENV !== 'production'
  }

  public static async get(
    from: number = 0,
    to: number = new Date().valueOf(),
  ): Promise<TempData[]> {
    const response = await fetch(
      encodeURI(
        `${
          TempApi.isLocalHost() ? TempApiEndpoints.local : TempApiEndpoints.live
        }?from=${from}&to=${to}`,
      ),
    )
    const data = await response.json()
    return data
  }
}
