import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { analytics } from '../../../lib/sb'

async function handle(req: NextApiRequest, res: NextApiResponse) {
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
            userId: user[0].id,
            productId: parseInt(slug[0])
        }
    })

    if (itemExists === []) return res.status(409).send('Item not on wishlist')

    const deleteData = await prisma.wishlistItem.deleteMany({
        where: {
            userId: user[0].id,
            productId: parseInt(slug[0])
        }
    })

    analytics.track({
        event: 'Removed wishlist item',
        userId: session?.user.sub,
        data: {
            productId: slug[0]
        }
    })

    res.status(201).redirect('/')
}

export default withApiAuthRequired(handle)