import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { pid } = req.query

    if (isNaN(parseInt(pid.toString()))) return res.status(400).send('Bad request')

    const data = await prisma.product.findFirst({
        where: {
            // @ts-ignore
            id: await parseInt(pid[0])
        }
    })

    res.json(data)
  }