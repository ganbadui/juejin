import generateFetch from './generateFetch'
import { APIDOMAIN, LOCALDOMAIN } from './constants'

// next.js 获取当前环境
const env = process.env.NODE_ENV === 'development' ? LOCALDOMAIN : APIDOMAIN

console.log(process.env.NODE_ENV)

console.log('LOCALDOMAIN', env)

export default generateFetch(env)
