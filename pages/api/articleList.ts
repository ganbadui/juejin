import bffService from '@/service/bffFetch'
import { NextApiRequest, NextApiResponse } from 'next'

const getArticleList = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  //分页查询文章列表
  const { page, pageSize, tagId } = req.query
  // 获得作者、标签、发布时间、文章标题、文章描述、文章id
  const result: any = await bffService.get(
    `api/acticles?fields=id,title,description,createdAt&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`
  )

  try {
    const data = result.data
    const meta = result.meta

    //页面总数
    const total = meta.pagination.total

    const list = data.map((item: any) => {
      const id = item.id
      const title = item.title
      const description = item.description
      let cover = item.cover
      const tag = item.acticle_tag.tagName
      const isTagId = item.acticle_tag.id
      const author = item.user_info.user_name
      const publishTime = item.createdAt

      if (cover) {
        cover = 'https://api.skyseek.top' + cover[0].formats.small.url
      }

      return {
        id: id,
        title: title,
        description: description,
        avatar: cover,
        tag: tag,
        isTagId: isTagId,
        author: author,
        publishTime: publishTime
      }
    })

    // 根据标签id筛选list中的数据，并返回

    if (tagId) {
      const tagList = list.filter((item: any) => {
        return item.isTagId === Number(tagId)
      })
      res.status(200).json({
        data: {
          list: tagList,
          total: total,
          code: 200
        }
      })
    } else {
      res.status(200).json({
        data: {
          list: list,
          total: total,
          code: 200
        }
      })
    }

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
