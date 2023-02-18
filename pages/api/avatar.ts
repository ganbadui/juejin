import type { NextApiRequest, NextApiResponse } from 'next'
import bffService from '@/service/bffFetch'
import { CMSDOMAIN } from '@/service/constants'

const getAvatarById = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { id } = req.query
  const result: any = await bffService.get(
    `api/user-names?filters[id][$eq]=${id}&populate=*`
  )

  const data = result.data

  const avatarData = {
    id: data[0].headPicture[0].id,
    name: data[0].headPicture[0].name,
    picture: CMSDOMAIN + data[0].headPicture[0].url
  }

  res.status(200).json(avatarData)
}

export default getAvatarById
