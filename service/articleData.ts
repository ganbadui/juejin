import service from '@/service/fetch'

/**
 * @description 分页查询文章列表
 * @param page 页码
 * @param pageSize 每页条数
 */
export const getAList = ({
  page,
  pageSize,
  tagId
}: {
  page: number
  pageSize: number
  tagId?: number
}) => {
  //使用axios请求数据
  return service.get('/api/articleList', {
    params: {
      page,
      pageSize,
      tagId
    }
  })
}

export const getArticleTag = () => {
  return service.get('/api/articleTag')
}

// 获取头像列表
export const getAuthorList = () => {
  return service.get('/api/authorList')
}

//点击标签切换文章
export const getTagArticle = (tagID: number) => {
  return service.get('/api/tagArticle', {
    params: {
      tagID
    }
  })
}
