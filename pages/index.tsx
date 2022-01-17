import type { NextPage } from 'next'
import Layout from '../components/layout'
import { Box } from '@chakra-ui/react'
import * as React from 'react'
import { ProductCard } from '../components/productCard'
import { products } from '../lib/data'
import { ProductGrid } from '../components/productGrid'

const Home: NextPage = () => {
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
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
          </Box>
        </main>
      </Layout>
    </div>
  )
}

export default Home
