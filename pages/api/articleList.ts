import bffService from '@/service/bffFetch'
import { NextApiRequest, NextApiResponse } from 'next'

const getArticleList = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  //分页查询文章列表
  const { page, pageSize } = req.query
  // 获得作者、标签、发布时间、文章标题、文章描述、文章id
  const result: any = await bffService.get(
    `api/acticles?fields=id,title,description,createdAt&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`
  )

  try {
    const data = result.data

    const list = data.map((item: any) => {
      const id = item.id
      const title = item.title
      const description = item.description
      let cover = item.cover
      const tag = item.acticle_tag.tagName
      const author = item.user_info.user_name
      const publishTime = item.createdAt

      if (cover) {
        cover = 'https://api.skyseek.top' + cover[0].url
      }

      return {
        id: id,
        title: title,
        description: description,
        avatar: cover,
        tag: tag,
        author: author,
        publishTime: publishTime
      }
    })

    res.status(200).json({
      data: list
    })
    if (result.data.length === 0) {
      //直接返回加载的数据为空
      res.status(200).json({
        msg: '没有更多了'
      })
    }
  } catch (error) {
    res.status(500).json({
      msg: error
    })
  }
}

export default getArticleList
