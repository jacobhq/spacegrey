import {
  AspectRatio,
  Box,
  Button,
  Center,
  HStack,
  Icon,
  IconButton,
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
import useSWR, { mutate } from 'swr'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import axios from 'axios'
import { GoUnverified, GoVerified } from 'react-icons/go'

// Thank you so much to https://www.samanthaming.com/tidbits/81-how-to-check-if-array-includes-a-value/#checking-for-array-of-objects-using-some

interface Props {
  product: Product
  rootProps?: StackProps
}

export const ProductCard = (props: Props) => {
  const { product, rootProps } = props
  const { name, imageUrl, price, salePrice, rating, buyUrl, marketplace, id, verifiedColorMatch } = product
  const router = useRouter()
  const { user, error, isLoading: authLoading } = useUser()
  const radius = useBreakpointValue({ base: 'md', md: 'xl' })
  const [buying, setBuying] = useState('')
  const [wishlistLoading, setWishlistLoading] = useState('')
  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then(res => res.json())
  const { data: wishlist, error: wishlistErr } = useSWR(`/api/wishlist`, fetcher, { refreshInterval: 1000 })
  const toast = useToast()

  const onList = user && !authLoading ? wishlist.some((code: any) => JSON.stringify(code) === JSON.stringify(product)) : null

  function buy() {
    setBuying(id)
    router.push(buyUrl)
    setTimeout(function () {
      setBuying('')
    }, 3000)
  }

  async function addToList() {
    setWishlistLoading(id)
    await axios.get(`/api/addWishlistItem/${id}`).then(() => {
      toast({
        title: "Added item to wishlist successfully",
        description: `The item ${name} was successfully added`,
        status: 'success',
      })
      mutate(`/api/wishlist`)
      setWishlistLoading('')
    }
    ).catch(() => {
      toast({
        title: "Error adding to wishlist",
        description: "Try again later",
        status: 'error'
      })
      setWishlistLoading('')
    })
  }

  async function removeFromList() {
    setWishlistLoading(id)
    await axios.get(`/api/removeWishlistItem/${id}`).then(() => {
      toast({
        title: "Removed item from wishlist successfully",
        description: `The item ${name} was successfully removed`,
        status: 'success',
      })
      mutate(`/api/wishlist`)
      setWishlistLoading('')
    }
    ).catch(() => {
      toast({
        title: "Error removing from wishlist",
        description: "Try again later",
        status: 'error'
      })
      setWishlistLoading('')
    }
    )
  }

  console.log(product)

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
      </Box>
      <Stack>
        <Stack spacing="1">
          <Text fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}>
            {name}
          </Text>
          <HStack>
            <PriceTag price={price} salePrice={salePrice} currency="GBP" />
          </HStack>
        </Stack>
        <HStack hidden>
          <Rating defaultValue={rating} size="sm" />
          <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
            12 Reviews
          </Text>
        </HStack>
      </Stack>
      <Stack align="center">
        <HStack width="100%">
          <Button colorScheme="blue" isFullWidth onClick={buy} isLoading={buying === id} loadingText='Loading'>
            {marketplace ? 'Buy now on'.concat(' ', marketplace) : 'Buy now'}
          </Button>
          <Tooltip label={user && !authLoading ? onList ? "Remove item from wishlist" : "Add item to wishlist" : "Log in and add item to wishlist"}>
            <IconButton
              isLoading={!wishlist && !wishlistErr || wishlistLoading === id}
              isDisabled={wishlistErr}
              aria-label={onList ? "Remove item from wishlist" : "Add item to wishlist"}
              variant="outline"
              colorScheme={onList ? "red" : undefined}
              icon={<Icon as={onList ? FaHeart : FaRegHeart} />}
              onClick={user && !authLoading ? onList ? removeFromList : addToList : () => router.push(`/api/auth/login?returnTo=/api/addWishlistItem/${id}`)}
            />
          </Tooltip>
        </HStack>
        <Tooltip label="Verified color match means that the color will match with all other products on this site.">
          <HStack>
            <Icon as={verifiedColorMatch ? GoVerified : GoUnverified} />
            <Text>{verifiedColorMatch && verifiedColorMatch ? 'Verified color match' : 'Color match not verified'}</Text>
          </HStack>
        </Tooltip>
      </Stack>
    </Stack>
  )
}