import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { slug } = req.query
    res.end(`Post: ${slug.join(', ')}`)
}