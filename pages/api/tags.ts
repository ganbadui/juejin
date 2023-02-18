import type { NextApiRequest, NextApiResponse } from 'next'
import bffService from '@/service/bffFetch'
import { tagToUrlMap } from '@/components/Tab/helper'

const getAllTags = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const result = await bffService.get('api/tags')

  const tags = result.data.map((tag: any) => {
    return {
      id: tag.id,
      label: tag.tag_name,
      value: tagToUrlMap[tag.tag_name],
      isActive: tag.isActive
    }
  })

  res.status(200).json(tags)
}

export default getAllTags
