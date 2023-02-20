import { NextApiRequest, NextApiResponse } from 'next'
import bffService from '@/service/bffFetch'
const getarticleTag = async (req: NextApiRequest, res: NextApiResponse) => {
  const result: any = await bffService.get(
    'https://api.skyseek.top/api/acticle-tags'
  )

  try {
    const data = result.data
    const tag = data.map((item: any) => {
      return {
        id: item.id,
        name: item.tagName,
        url: item.url
      }
    })

    res.status(200).json({
      data: tag
    })
  } catch (error) {
    res.status(500).json({
      msg: error
    })
  }
}

export default getarticleTag
