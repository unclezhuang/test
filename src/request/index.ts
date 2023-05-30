import axios from 'axios'
export const service=axios.create({
    baseURL: 'http://192.168.43.88:8080/', // 设置共同的路径前缀
  })