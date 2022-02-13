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
import useSWR from 'swr'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

// Thank you so much to https://www.samanthaming.com/tidbits/81-how-to-check-if-array-includes-a-value/#checking-for-array-of-objects-using-some

interface Props {
  product: Product
  rootProps?: StackProps
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
  const { data: wishlist, error: wishlistErr } = useSWR(`/api/wishlist`, fetcher)

  const onList = wishlist && wishlist.some((code: any) => JSON.stringify(code) === JSON.stringify(product))

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
        <HStack width="100%">
          <Button colorScheme="blue" isFullWidth onClick={buy} isLoading={buying === id} loadingText='Loading'>
            {marketplace ? 'Buy now on'.concat(' ', marketplace) : 'Buy now'}
          </Button>
          <Tooltip label={onList ? "Remove item from wishlist" : "Add item to wishlist"}>
          <IconButton isLoading={!wishlist && !wishlistErr} isDisabled={wishlistErr} aria-label={onList ? "Remove item from wishlist" : "Add item to wishlist"} variant="outline" colorScheme={onList ? "red" : undefined} icon={<Icon as={onList ? FaHeart : FaRegHeart} />} />
          </Tooltip>
        </HStack>
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