import { NextApiRequest, NextApiResponse } from 'next'
import bffService from '@/service/bffFetch'

const getTagedArticle = async (req: NextApiRequest, res: NextApiResponse) => {
  const { tagID } = req.query

  const result: any = await bffService.get(
    `api/acticle-tags/${tagID}?populate=deep`
  )

  try {
    const data = result.data

    const list = data.acticles

    const listData = list.map((item: any) => {
      const id = item.id
      const title = item.title
      const description = item.description
      let cover = item.cover
      if (cover) {
        cover = 'https://api.skyseek.top' + cover[0].url
      }
      const tag = item.acticle_tag.tagName
      const author = item.user_info.user_name

      const publishTime = item.createdAt

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
      data: listData
    })
  } catch {
    res.status(500).json({
      msg: 'error'
    })
  }
}

export default getTagedArticle
