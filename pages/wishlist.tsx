import type { NextPage } from 'next'
import Layout from '../components/layout'
import { Box, Button, Icon, Menu, MenuButton, MenuDivider, MenuItemOption, MenuList, MenuOptionGroup, Skeleton, Spinner, Text } from '@chakra-ui/react'
import * as React from 'react'
import { ProductCard } from '../components/productCard'
import { ProductGrid } from '../components/productGrid'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'
import { prisma } from '../lib/prisma'
import useSWR from 'swr'
import { FaFilter } from 'react-icons/fa'

function Wishlist() {
    // @ts-ignore
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, error } = useSWR('/api/wishlist', fetcher, { refreshInterval: 1000 })

    return (
        <div>
            <Layout title='Wishlist'>
                <main>
                    <Box
                        maxW="7xl"
                        mx="auto"
                        px={{ base: '4', md: '8', lg: '12' }}
                        py={{ base: '6', md: '8', lg: '12' }}
                    >
                        <ProductGrid>
                            {data && data.map((product: { id: string; name: string; currency: string; price: number; salePrice: number; flag: string; imageUrl: string; rating: number; ratingCount: number; description: string; images: { id: string; src: string; alt: string }[]; buyUrl: string; marketplace: string } | { id: string; name: string; currency: string; price: number; imageUrl: string; rating: number; ratingCount: number; description: string; images: { id: string; src: string; alt: string }[]; buyUrl: string; marketplace: string; salePrice?: undefined; flag?: undefined }) => (
                                // @ts-ignore
                                <ProductCard key={product.id} product={product} />
                            ))}
                            {!data && !error && <Spinner />}
                            {error && !data && <Text>Error while loading, email jacob@omg.lol</Text>}
                        </ProductGrid>
                    </Box>
                </main>
            </Layout>
        </div>
    )
}

export default withPageAuthRequired(Wishlist)
