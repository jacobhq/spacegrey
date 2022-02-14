import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query
    const session = getSession(req, res)
    const userExists = await prisma.user.findFirst({
        where: {
            auth0Id: session?.user.sub
        }
    })

    if (!userExists) {
        await prisma.user.create({
            data: {
                auth0Id: session?.user.sub
            }
        })
    }

    const user = await prisma.user.findFirst({
        where: {
            auth0Id: session?.user.sub
        }
    })

    const itemExists = await prisma.wishlistItem.findMany({
        where: {
            userId: user?.id,
            productId: parseInt(slug[0])
        }
    })

    if (!itemExists) return res.status(409).redirect('/')

    const create = await prisma.wishlistItem.create({
        data: {
            User: { connect: { id: user?.id } },
            Product: { connect: { id: parseInt(slug[0]) } }
        }
    })

    res.status(201).redirect('/')
}

// @ts-ignore
export default withApiAuthRequired(handle)