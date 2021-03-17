import { HttpConfig, IHttp } from '../../../ports/http'
import axios from 'axios'

export class AxiosHttp implements IHttp {
  get = async <T>(url: string, config?: HttpConfig): Promise<T> => {
    const { data } = await axios.get<T>(url, config)
    return data
  }
}
