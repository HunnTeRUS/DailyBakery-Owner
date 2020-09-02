import axios from 'axios'

export const API_DEFAULT_PARAMS = {
    part: 'part',
    maxResults: 5,
    key: 'key'
  }
  
const api = axios.create({
    //baseURL: 'http://192.168.0.10:3333'
    baseURL: 'http://192.168.1.28:3333'
})

export default api;
