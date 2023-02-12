import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from '@/service/bffFetch'

const getAllTags = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const result = await fetch.get('api/tags')

  const data = result.data.map((tag: any) => {
    return {
      id: tag.id,
      label: tag.tag_name,
      value: '/',
      isActive: tag.isActive
    }
  })

  res.status(200).json(data)
}

export default getAllTags
