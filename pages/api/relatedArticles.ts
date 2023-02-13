import type { NextApiRequest, NextApiResponse } from 'next'
import bffService from '@/service/bffFetch'

const getRelatedArticles = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { tagName, pageSize } = req.query
  const result = await bffService.get(
    `api/acticle-tags?filters[tagName][$eqi]=${tagName}&populate=*&pagination[pageSize]=${pageSize}`
  )
  const data = result.data

  const relatedArticles = {
    id: data[0].id,
    tagName: data[0].tagName,
    articles: data[0].acticles
  }

  res.status(200).json(relatedArticles)
}

export default getRelatedArticles
