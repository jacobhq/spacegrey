import { Icon, IconButton, IconButtonProps, LightMode } from '@chakra-ui/react'
import * as React from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

type favouriteButtonProps = IconButtonProps & {
  onList: boolean
}

export function FavouriteButton(props: favouriteButtonProps ) {
  console.log(props.onList)
  return <LightMode>
    <IconButton
      isRound
      bg="white"
      color="gray.900"
      size="sm"
      _hover={{ transform: 'scale(1.1)' }}
      sx={{ ':hover > svg': { transform: 'scale(1.1)' } }}
      transition="all 0.15s ease"
      icon={<Icon as={props.onList ? FaHeart : FaRegHeart} transition="all 0.15s ease" />}
      boxShadow="base"
      {...props}
    />
  </LightMode>
}