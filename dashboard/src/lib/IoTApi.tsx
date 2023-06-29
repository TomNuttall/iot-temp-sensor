export interface TemperatureData {
  time: number
  temp: number
}

export const IoTApiEndpoints = {
  local: 'http://localhost:3000/dev',
  live: 'https://api.iot.tomnuttall.dev',
}

export class IoTApi {
  public static useLocalHost(): boolean {
    const prod =
      process.env.NODE_ENV === 'production' ||
      import.meta.env?.VITE_USE_LOCALHOST === 'false'

    return !prod
  }

  public static async get(
    from: number = 0,
    to: number = new Date().valueOf(),
  ): Promise<TemperatureData[]> {
    const response = await fetch(
      encodeURI(
        `${
          IoTApi.useLocalHost() ? IoTApiEndpoints.local : IoTApiEndpoints.live
        }?from=${from}&to=${to}`,
      ),
    )
    const data = await response.json()
    return data
  }
}
