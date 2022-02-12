import {
  AspectRatio,
  Box,
  Button,
  Center,
  HStack,
  Image,
  Link,
  Skeleton,
  Stack,
  StackProps,
  Text,
  Tooltip,
  useBreakpointValue,
  useColorModeValue,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react'
import { Rating } from './rating'
import { FavouriteButton } from './favouriteButton'
import { PriceTag } from './priceTag'
import { Product } from '../lib/data'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0'
import useSWR from 'swr'

interface Props {
  product: Product
  rootProps?: StackProps
}

function useWishlist() {
  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data, error } = useSWR(`/api/wishlist`, fetcher)

  return {
    wishlist: data,
    isLoading: !error && !data,
    isError: error
  }
}

function FavBtn() {
  const { wishlist, isLoading, isError } = useWishlist()
  const toast = useToast()

  if (isLoading) return null
  if (isError) return toast({
    title: 'Error',
    description: "Please email bugs@jacob.omg.lol",
    status: 'error',
    duration: 9000,
    isClosable: true,
  })
}

export const ProductCard = (props: Props) => {
  const { product, rootProps } = props
  const { name, imageUrl, price, salePrice, rating, buyUrl, marketplace, id } = product
  const router = useRouter()
  const { user, error, isLoading: authLoading } = useUser()
  const radius = useBreakpointValue({ base: 'md', md: 'xl' })
  const [buying, setBuying] = useState('')
  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data: wishlist, error: wishlistErr } = useSWR(`/api/wishlist`, fetcher, { refreshInterval: 1000 })
  const { data: products, error: productsErr } = useSWR(`/api/products`, fetcher, { refreshInterval: 1000 })

  function buy() {
    setBuying(id)
    router.push(buyUrl)
    setTimeout(function () {
      setBuying('')
    }, 3000)
  }

  return (
    <Stack spacing={useBreakpointValue({ base: '4', md: '5' })} {...rootProps}>
      <Box position="relative">
        <AspectRatio ratio={4 / 3}>
          <Image
            src={imageUrl}
            alt={name}
            draggable="false"
            fallback={<Skeleton />}
            borderRadius={radius}
          />
        </AspectRatio>
        {wishlist && <FavouriteButton
            hidden={!user}
            isLoading={authLoading || !wishlist && !wishlistErr}
            position="absolute"
            top="4"
            right="4"
            aria-label={`Add ${name} to your favourites`}
            onClick={wishlist && wishlist[parseInt(id) - 1]?.id ? () => router.push(`/api/removeWishlistItem/${product.id}`) :() => router.push(`/api/addWishlistItem/${product.id}`)}
            color={wishlist && wishlist[parseInt(id) - 1]?.id ? "red" : undefined}
            onList={wishlist && wishlist[parseInt(id) - 1]?.id}
          />}
      </Box>
      <Stack>
        <Stack spacing="1">
          <Text fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}>
            {name}
          </Text>
          <PriceTag price={price} salePrice={salePrice} currency="GBP" />
        </Stack>
        <HStack hidden>
          <Rating defaultValue={rating} size="sm" />
          <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
            12 Reviews
          </Text>
        </HStack>
      </Stack>
      <Stack align="center">
        <Button colorScheme="blue" isFullWidth onClick={buy} isLoading={buying === id} loadingText='Loading'>
          {marketplace ? 'Buy now on'.concat(' ', marketplace) : 'Buy now'}
        </Button>
        <Link
          textDecoration="underline"
          fontWeight="medium"
          color={useColorModeValue('gray.600', 'gray.400')}
        >
          Quick shop
        </Link>
      </Stack>
    </Stack>
  )
}