import service from '@/service/fetch'

/**
 * @description 分页查询文章列表
 * @param page 页码
 * @param pageSize 每页条数
 */
export const getAList = (page: number, pageSize: number) => {
  //使用axios请求数据
  return service.get('/api/articleList', {
    params: {
      page,
      pageSize
    }
  })
}
