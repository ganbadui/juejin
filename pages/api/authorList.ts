import bffService from '@/service/bffFetch'
import { NextApiRequest, NextApiResponse } from 'next'
const authorList = async (req: NextApiRequest, res: NextApiResponse) => {
  const result: any = await bffService.get(
    'https://api.skyseek.top/api/user-names?populate=*'
  )

  try {
    const data = result.data

    const author = data.map((item: any) => {
      //处理头像加上域名
      item.headPicture[0].url = `https://api.skyseek.top${item.headPicture[0].url}`
      return {
        id: item.id,
        name: item.user_name,
        introduce: item.introduce,
        avatar: item.headPicture[0].url
      }
    })

    res.status(200).json({
      data: author
    })
  } catch (error) {
    res.status(500).json({
      msg: 'error'
    })
  }
}

export default authorList
