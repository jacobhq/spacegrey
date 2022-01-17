import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Container, Heading, HStack, IconButton, useColorMode, Text, Box, ButtonGroup, MenuButton, Menu, MenuList, MenuItem, Skeleton, Tooltip } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ReactNode, useState } from 'react'
import { UnlockIcon } from '@chakra-ui/icons'
import { useUser, handleLogin } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router'

type layoutProps = {
  title?: string,
  children: ReactNode
}

export default function Layout({ children, title }: layoutProps) {
  const { colorMode, toggleColorMode } = useColorMode()
  const { user, error, isLoading: authLoading } = useUser();
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()

  function authClick() {
    console.log('called', user)
    if (user) {
      return console.log('Logged in')
    }

    setLoading(true)
    return router.push('/api/auth/login')
  }

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
          <ButtonGroup>
            <Menu>
              {authLoading ? <IconButton variant="ghost" icon={<UnlockIcon />} aria-label="Log in" isLoading={isLoading || authLoading} onClick={authClick} /> : user ? <Tooltip label="Open menu" aria-label="Open menu">
                <MenuButton as={IconButton} variant="ghost" icon={<UnlockIcon />} aria-label="Open menu" isLoading={isLoading || authLoading} onClick={authClick} />
              </Tooltip> : <Tooltip label="Log in" aria-label="Log in">
                <IconButton variant="ghost" icon={<UnlockIcon />} aria-label="Log in" isLoading={isLoading || authLoading} onClick={authClick} />
              </Tooltip>}
              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </Menu>
            <Tooltip label={'Set theme to ' + colorMode === 'light' ? 'light' : 'dark'} aria-label={'Set theme to ' + colorMode === 'light' ? 'light' : 'dark'}>
              <IconButton variant="ghost" onClick={toggleColorMode} icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} aria-label={'Set theme to ' + colorMode === 'light' ? 'light' : 'dark'} />
            </Tooltip>
          </ButtonGroup>
        </HStack>
        <Box mt={16}>
          {children}
        </Box>
      </Container>
    </div>
  )
}
