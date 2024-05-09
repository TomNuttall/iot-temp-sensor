import axios from 'axios'

export interface TemperatureSeries {
  date: string
  values: TemperatureData[]
}

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

  public static async get(dates?: string[]): Promise<TemperatureSeries[]> {
    if (!IoTApi.endPoint) {
      IoTApi.setEndPoint()
    }

    const uri = `${IoTApi.endPoint}?date=${dates?.join('&date=')}`
    const response = await axios.get(encodeURI(uri))
    return response.data
  }
}
