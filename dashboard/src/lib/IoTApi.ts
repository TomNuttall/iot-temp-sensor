import axios from 'axios'

export interface TemperatureData {
  time: number
  temp: number
}

const IoTApiEndpoints = {
  local: 'http://localhost:3000/dev',
  live: 'https://api.iot.tomnuttall.dev',
}

export class IoTApi {
  private static endPoint: string

  private static setEndPoint() {
    const prod =
      process.env.NODE_ENV === 'production' ||
      import.meta.env?.VITE_USE_LOCALHOST === 'false'

    IoTApi.endPoint = prod ? IoTApiEndpoints.live : IoTApiEndpoints.local
  }

  public static async get(
    from: number = 0,
    to: number = new Date().valueOf(),
  ): Promise<TemperatureData[]> {
    if (!IoTApi.endPoint) {
      IoTApi.setEndPoint()
    }

    const response = await axios.get(
      encodeURI(`${IoTApi.endPoint}?from=${from}&to=${to}`),
    )

    return response.data
  }
}
