import { getSession } from "@auth0/nextjs-auth0"
import { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = getSession(req, res)
    const user = await prisma.user.findMany({
        where: {
            auth0Id: session?.user.sub
        }
    })

    const wishlist = await prisma.wishlistItem.findMany({
        where: {
            // @ts-ignore
            userId: user.id
        },
    })

    return res.status(200).send(wishlist)
}


