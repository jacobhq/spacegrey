import { Icon, IconButton, IconButtonProps, LightMode } from '@chakra-ui/react'
import * as React from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

type favouriteButtonProps = IconButtonProps & {
  onList: boolean
}

export function FavouriteButton(props: favouriteButtonProps) {

  return <IconButton
    isRound
    colorScheme={props.onList ? "red" : undefined}
    size="sm"
    _hover={{ transform: 'scale(1.1)' }}
    sx={{ ':hover > svg': { transform: 'scale(1.1)' } }}
    transition="all 0.15s ease"
    icon={<Icon as={props.onList ? FaHeart : FaRegHeart} transition="all 0.15s ease" />}
    boxShadow="base"
    {...props}
  />
}