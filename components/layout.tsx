import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Container, Heading, HStack, IconButton, useColorMode, Text, Box, ButtonGroup, MenuButton, Menu, MenuList, MenuItem, Skeleton, Tooltip, MenuDivider, Modal, Button, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, VStack } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { ReactNode, useRef, useState } from 'react'
import { UnlockIcon } from '@chakra-ui/icons'
import { useUser, handleLogin } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router'
import { products } from '../lib/data'

type layoutProps = {
  title?: string,
  children: ReactNode
}

export default function Layout({ children, title }: layoutProps) {
  const { colorMode, toggleColorMode } = useColorMode()
  const { user, error, isLoading: authLoading } = useUser();
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const main = useRef()

  function authClick() {
    console.log('called', user)
    if (user) {
      return console.log('Logged in')
    }

    setLoading(true)
    return router.push('/api/auth/login')
  }

  function logout() {
    setLoading(true)
    return router.push('/api/auth/logout')
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
            <Heading mb={2}>{title ? title : 'Matte black'}</Heading>
            <Text>Really cool matte black accessories that go together so well!</Text>
          </div>
          <ButtonGroup>
            <Menu>
              {authLoading ? <IconButton variant="ghost" icon={<UnlockIcon />} aria-label="Log in" isLoading={isLoading || authLoading} onClick={authClick} /> : user ? <Tooltip isDisabled={isOpen} label="Open menu" aria-label="Open menu">
                <MenuButton as={IconButton} variant="ghost" icon={<HamburgerIcon />} aria-label="Open menu" isLoading={isLoading || authLoading} onClick={authClick} />
              </Tooltip> : <Tooltip label="Log in" aria-label="Log in">
                <IconButton variant="ghost" icon={<UnlockIcon />} aria-label="Log in" isLoading={isLoading || authLoading} onClick={authClick} />
              </Tooltip>}
              <MenuList>
                <MenuItem onClick={onOpen}>View wishlist</MenuItem>
                <Modal isOpen={isOpen} onClose={onClose} finalFocusRef={main}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Wishlist</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      
                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
                <MenuItem onClick={logout}>Logout</MenuItem>
                <MenuDivider />
                <MenuItem>Donate to JacobHQ</MenuItem>
              </MenuList>
            </Menu>
            <Tooltip label={'Set theme to'.concat(' ', colorMode === 'light' ? 'dark' : 'light')} aria-label={'Set theme to'.concat(' ', colorMode === 'light' ? 'dark' : 'light')}>
              <IconButton variant="ghost" onClick={toggleColorMode} icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} aria-label={'Set theme to'.concat(' ', colorMode === 'light' ? 'dark' : 'light')} />
            </Tooltip>
          </ButtonGroup>
        </HStack>
        <Box mt={16} ref={main}>
          {children}
        </Box>
      </Container>
    </div>
  )
}
