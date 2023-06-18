import axios from 'axios'
export const service=axios.create({
    baseURL: 'http://10.23.175.106:8081/', // 设置共同的路径前缀
  })