import type { NextPage } from 'next'
import Layout from '../components/layout'
import { Box, Button, Menu, MenuButton, MenuDivider, MenuItem, MenuItemOption, MenuList, MenuOptionGroup } from '@chakra-ui/react'
import * as React from 'react'
import { ProductCard } from '../components/productCard'
import { ProductGrid } from '../components/productGrid'
import { getSession, useUser } from '@auth0/nextjs-auth0'
import { prisma } from '../lib/prisma'
import { FaFilter } from 'react-icons/fa'
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Home({ products, matchedProducts }: any): any {
  const { user, error, isLoading: authLoading } = useUser()
  const router = useRouter()
  let [filter, setFilter] = useState('all')
  let computed = filter === "all" ? products : matchedProducts

  return (
    <div>
      <Layout>
        <main>
          <Menu closeOnSelect={false}>
            <MenuButton as={Button} leftIcon={<FaFilter />}>
              Filter
            </MenuButton>
            <MenuList>
              {/* @ts-ignore */}
              <MenuOptionGroup value={filter} onChange={(e) => setFilter(e)} type='radio'>
                <MenuItemOption value='all'>Show all</MenuItemOption>
                <MenuItemOption value='match'>Color matched only</MenuItemOption>
              </MenuOptionGroup>
              <MenuDivider />
              <MenuItem onClick={() => router.push('/wishlist')} isDisabled={!user}>Wishlist only</MenuItem>
            </MenuList>
          </Menu>
          <Box
            maxW="7xl"
            mx="auto"
            px={{ base: '4', md: '8', lg: '12' }}
            py={{ base: '6', md: '8', lg: '12' }}
          >
            <ProductGrid>
              {computed.map((product: { id: string; name: string; currency: string; price: number; salePrice: number; flag: string; imageUrl: string; rating: number; ratingCount: number; description: string; images: { id: string; src: string; alt: string }[]; buyUrl: string; marketplace: string } | { id: string; name: string; currency: string; price: number; imageUrl: string; rating: number; ratingCount: number; description: string; images: { id: string; src: string; alt: string }[]; buyUrl: string; marketplace: string; salePrice?: undefined; flag?: undefined }) => (
                // @ts-ignore
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
          </Box>
        </main>
      </Layout>
    </div>
  )
}

export const getServerSideProps = async () => {
  const products = await prisma.product.findMany()
  const matchedProducts = await prisma.product.findMany({
    where: {
      verifiedColorMatch: true
    }
  })

  return { props: { products, matchedProducts } }
}
