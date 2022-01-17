import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Container, Heading, HStack, IconButton, useColorMode, Text, Box } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ReactNode } from 'react'

type layoutProps = {
    title?: string,
    children: ReactNode
}

export default function Layout({ children, title }: layoutProps) {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <div>
      <Head>
        <title>{title ? title + ' | Matte black by JacobHQ' : 'Matte black by JacobHQ'}</title>
        <meta name="description" content="Really cool matte black accessories that go together so well!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container mt={16} maxW='container.lg'>
        <HStack justify="space-between">
          <div>
            <Heading mb={2}>Matte black</Heading>
            <Text>Really cool matte black accessories that go together so well!</Text>
          </div>
          <IconButton onClick={toggleColorMode} icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} aria-label={'Set theme to ' + colorMode === 'light' ? 'light' : 'dark'} />
        </HStack>
        <Box mt={16}>
            {children}
        </Box>
      </Container>
    </div>
  )
}
