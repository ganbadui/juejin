import generateFetch from './generateFetch'
import { LOCALDOMAIN } from './constants'

// next.js 获取当前环境
const env =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://juejin.skyseek.top'

console.log(process.env.NODE_ENV)

console.log('LOCALDOMAIN', env)

export default generateFetch(LOCALDOMAIN)
