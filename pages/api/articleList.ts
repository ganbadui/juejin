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

    const articleList = data.map((item: any) => {
      // 有些文章没有封面图，这里做一下判断
      if (item.cover) {
        item.cover = 'https://api.skyseek.top' + item.cover[0].url
      } else {
        item.cover = ''
      }
      return {
        id: item.id,
        title: item.title,
        description: item.description,
        avatar: item.cover,
        tag: item.acticle_tag.tagName,
        author: item.user_info.user_name,
        publishTime: item.createdAt
      }
    })

    res.status(200).json({
      data: articleList
    })
    if (result.data.length === 0) {
      //直接返回加载的数据为空
      res.status(200).json({
        msg: '加载的数据为空'
      })
    }
  } catch (error) {
    res.status(500).json({
      msg: error
    })
  }
}

export default getArticleList
