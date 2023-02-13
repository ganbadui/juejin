import type { NextApiRequest, NextApiResponse } from 'next'
import bffService from '@/service/bffFetch'

const getArticleById = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { articleId } = req.query
  const result: any = await bffService.get(
    `api/acticles?filters[id][$eqi]=${articleId}&populate=*`
  )
  const data = result.data
  const meta = result.meta

  const article = {
    id: data[0].id,
    title: data[0].title,
    description: data[0].description,
    content: data[0].content,
    acticleTag: {
      id: data[0].acticle_tag.id,
      tagName: data[0].acticle_tag.tagName
    },
    userInfo: {
      id: data[0].user_info.id,
      introduce: data[0].user_info.introduce,
      userName: data[0].user_info.user_name
    },
    pagination: {
      ...meta.pagination
    }
  }

  res.status(200).json(article)
}

export default getArticleById
