import prisma from "../../lib/prisma"
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"

async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = getSession(req, res)
  const userExists = await prisma.user.findMany({
    where: {
      auth0Id: session?.user.sub
    }
  })

  if (userExists) return res.status(409).send('User already in database')

  await prisma.user.create({
      data: {
          auth0Id: session?.user.sub
      }
  })

  return res.status(200).send('Created user')
}

export default withApiAuthRequired(handle)