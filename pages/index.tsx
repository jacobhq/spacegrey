import type { NextPage } from 'next'
import Layout from '../components/layout'
import { Box } from '@chakra-ui/react'
import * as React from 'react'
import { ProductCard } from '../components/productCard'
import { ProductGrid } from '../components/productGrid'
import { useUser } from '@auth0/nextjs-auth0'
import prisma from '../lib/prisma'

export default function Home ({products}: any): any {
  const { user, error, isLoading: authLoading } = useUser()

  return (
    <div>
      <Layout>
        <main>
          <Box
            maxW="7xl"
            mx="auto"
            px={{ base: '4', md: '8', lg: '12' }}
            py={{ base: '6', md: '8', lg: '12' }}
          >
            <ProductGrid>
              {products.map((product: { id: string; name: string; currency: string; price: number; salePrice: number; flag: string; imageUrl: string; rating: number; ratingCount: number; description: string; images: { id: string; src: string; alt: string }[]; buyUrl: string; marketplace: string } | { id: string; name: string; currency: string; price: number; imageUrl: string; rating: number; ratingCount: number; description: string; images: { id: string; src: string; alt: string }[]; buyUrl: string; marketplace: string; salePrice?: undefined; flag?: undefined }) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
          </Box>
        </main>
      </Layout>
    </div>
  )
}

export const getServerSideProps = async ({}) => {
  const products = await prisma.product.findMany()
  return { props: { products } }
}
