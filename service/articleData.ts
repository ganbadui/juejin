import axios from 'axios'

/**
 * @description 分页查询文章列表
 * @param page 页码
 * @param pageSize 每页条数
 */
export const getArticleList = (page: number, pageSize: number) => {
  //使用axios请求数据
  return axios.get('/api/articleList', {
    params: {
      page,
      pageSize
    }
  })
}
