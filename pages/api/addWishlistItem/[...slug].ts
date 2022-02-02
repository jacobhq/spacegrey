import { getSession } from '@auth0/nextjs-auth0'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query
    const session = getSession(req, res)
    const userExists = await prisma.user.findMany({
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

    const user = await prisma.user.findMany({
        where: {
            auth0Id: session?.user.sub
        }
    })

    const itemExists = await prisma.wishlistItem.findMany({
        where: {
            userId: user[0].id
        }
    })

    if (itemExists) return res.status(409).send('Item already on wishlist')

    const create = await prisma.wishlistItem.create({
        data: {
            User: { connect: { id: user[0].id } },
            Product: { connect: { id: parseInt(slug[0]) } }
        }
    })

    res.status(201).send('Item created')
}