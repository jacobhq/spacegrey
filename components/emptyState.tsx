import React from 'react'
import { Box, Heading, Stack, Text, Button } from '@chakra-ui/react'

const EmptyState = () => {
  return (
    <Stack justifyItems="center" alignItems="center">
        <Heading size="md">You'll need to log in to see more</Heading>
        <Text>Create an account to view more products, and to support JacobHQ.</Text>
    </Stack>
  )
}

export default EmptyState