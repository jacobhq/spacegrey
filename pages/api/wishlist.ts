import { getSession } from "@auth0/nextjs-auth0"
import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = getSession(req, res)
    const user = await prisma.user.findMany({
        where: {
            // @ts-ignore
            auth0Id: session.user.sub
        }
    })

    const wishlist = await prisma.wishlistItem.findMany({
        where: {
            userId: user[0].id
        }
    })

    const result = wishlist.map(({productId})=>(productId))

    const finalProducts = await prisma.product.findMany({
        where: {
            id: {in: result}
        }
    })

    return res.status(200).send(finalProducts)
}


