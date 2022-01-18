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
    useBreakpointValue,
    useColorModeValue,
  } from '@chakra-ui/react'
  import * as React from 'react'
  import { Rating } from './rating'
  import { FavouriteButton } from './favouriteButton'
  import { PriceTag } from './priceTag'
  import { Product } from '../lib/data'
  import { useRouter } from 'next/router'
  import { useUser } from '@auth0/nextjs-auth0'
  
  interface Props {
    product: Product
    rootProps?: StackProps
  }
  
  export const ProductCard = (props: Props) => {
    const { product, rootProps } = props
    const { name, imageUrl, price, salePrice, rating, buyUrl } = product
    const router = useRouter()
    const { user, error, isLoading: authLoading } = useUser()
    const radius = useBreakpointValue({ base: 'md', md: 'xl' })

    function buy () {
      router.push(buyUrl)
    }

    return (
      <Stack spacing={useBreakpointValue({ base: '4', md: '5' })} {...rootProps}>
        <Box position="relative">
          <AspectRatio ratio={4 / 3}>
            {authLoading ? <Skeleton /> : user ? <Image
              src={imageUrl}
              alt={name}
              draggable="false"
              fallback={<Skeleton />}
              borderRadius={radius}
            /> : <Center>
                <Text>You'll need to log in</Text>
              </Center>}
          </AspectRatio>
          <FavouriteButton
            hidden={!user}
            isLoading={authLoading}
            position="absolute"
            top="4"
            right="4"
            aria-label={`Add ${name} to your favourites`}
          />
        </Box>
        <Stack>
          <Stack spacing="1">
            <Text fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}>
              {user ? name : ''}
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
          <Button colorScheme="blue" isFullWidth onClick={buy}>
            Buy now
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