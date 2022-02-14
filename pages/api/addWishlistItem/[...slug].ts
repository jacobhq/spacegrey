import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { analytics } from '../../../lib/sb'

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
        analytics.user.set({
            userId: session?.user.sub,
            userData: {
                email: session?.user.email,
                name: session?.user.name
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

    analytics.track({
        event: 'Added wishlist item',
        userId: session?.user.sub,
        data: {
            productId: create.productId.toString()
        }
    })

    res.status(201).redirect('/')
}

// @ts-ignore
export default withApiAuthRequired(handle)